import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../store/reducer/TitleHeader'
import { setBreadCms } from '../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import DataGridList from '../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import exportedSwal from '../../utils/swal'

import exportedAPIWork from '../../utils/api/Work'
import { APIWorkexperience_data } from '../../model/Workexperience'
import { useQuery, useQueryClient } from 'react-query'
import { RootState } from '../../store/ConfigureStore'
import LoadingData from '../../components/LoadingData'




function Workexp() {

    const queryClient = useQueryClient()

    const user = useSelector((state: RootState) => state.user.data)

    const { data, isLoading } = useQuery<APIWorkexperience_data, Error>('workexperience-data', async () => exportedAPIWork.getWork(user.token))

    const columns: GridColDef[] = [
        { field: 'workplace', headerName: 'สถานที่ทำงาน' , width : 200 },
        { field: 'position', headerName: 'ตำแหน่ง', width : 200 },
        { field: 'salary', headerName: 'เงินเดือน' , width : 200},
        { field: 'duration', headerName: 'ระยะเวลา', width : 200 },
        { field: 'note', headerName: 'เหตุผลที่ออก', width : 200 },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => actionDeleteWorkexp(params.row.id)}
                        variant="contained"
                        color='secondary'
                    >
                        Delete
                    </Button>
                );
            }
        },
    ];

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("ประสบการณ์ทํางาน")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(!data.get('workplace') || !data.get('position') || !data.get('salary') || !data.get('duration') || !data.get('note')){
            exportedSwal.actionInfo(`กรุณากรอกข้อมูลให้ครบ !`)
            return
        }

        let dataPost = {
            workplace: data.get('workplace'),
            position: data.get('position'),
            salary: data.get('salary'),
            duration: data.get('duration'),
            note: data.get('note'),
        }

        let resData = await exportedAPIWork.createWork(dataPost, user.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('workexperience-data')
            exportedSwal.actionSuccess(`เพิ่มข้อมูล ประสบการณ์ทำงาน เรียบร้อย !`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }

    }

    const actionDeleteWorkexp = async (id: number) => {

        let data = await exportedAPIWork.deleteWork(id , user.token)

        if (data.bypass) {
            queryClient.invalidateQueries('workexperience-data')
            exportedSwal.actionSuccess(`ลบข้อมูลเรียบร้อย !`)
        } else {
            exportedSwal.actionInfo(`ลบข้อมูลไม่สำเร็จ !`)
        }

    }

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: "โปรไฟล์", link: routerPathProtectedUser.Profile, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])

    return (
        <>
            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Typography >{title}</Typography>
                            </Grid>
                            <Grid item>
                                <Button onClick={() => history.goBack()} variant="contained" sx={{ mr: 1 }}>ย้อนกลับ</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Box component="form" onSubmit={handleSubmit}
                        noValidate
                        sx={{ p: '1%', mt: 2 }}

                    >
                        <Grid container spacing={2} columns={12} >
                            {
                                [
                                    { name: "workplace", label: "สถานที่ทำงาน" },
                                    { name: "position", label: "ตำแหน่ง" },
                                    { name: "salary", label: "เงินเดือน" },
                                    { name: "duration", label: "ระยะเวลา", ex: "ตัวอย่าง 10/2563 - 04/2564 " },
                                    { name: "note", label: "เหตุผลที่ออก", },
                                ].map(({ name, label, ex }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
                                            placeholder={ex}
                                        />
                                    </Grid>
                                ))
                            }

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            เพิ่มข้อมูล
                        </Button>

                    </Box>
                </Container>
            </Paper>

            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden', mt: 2 }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Typography >รายการประสบการณ์ทำงานของคุณ</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    {
                        isLoading ? 

                        <LoadingData />

                        :

                        <DataGridList columns={columns} model={data?.data} />
                    }
                   
                </Container>
            </Paper>
        </>
    )
}

export default Workexp