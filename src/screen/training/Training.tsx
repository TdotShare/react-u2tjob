import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../store/reducer/TitleHeader'
import { setBreadCms } from '../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import DataGridList from '../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import exportedSwal from '../../utils/swal'


import { APITraining_data } from '../../model/Training'
import exportedAPITraining from '../../utils/api/Training'
import { RootState } from '../../store/ConfigureStore'
import { useQuery, useQueryClient } from 'react-query'
import LoadingData from '../../components/LoadingData'

function Training() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const queryClient = useQueryClient()

    const user = useSelector((state: RootState) => state.user.data)

    const { data, isLoading } = useQuery<APITraining_data, Error>('training-data', async () => exportedAPITraining.getTraining(user.token))

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'ชื่อหัวข้อการอบรม' , width : 350 },
        { field: 'time', headerName: 'ระยะเวลาการอบรม' , width : 250 },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => actionDeleteTraining(params.row.id)}
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
    const [title] = useState<string>("ประวัติการฝึกอบรม")



    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: "โปรไฟล์", link: routerPathProtectedUser.Profile, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])

    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if(!data.get('name') || !data.get('time') ){
            exportedSwal.actionInfo(`กรุณากรอกข้อมูลให้ครบ !`)
            return
        }

        let dataPost = {
            name: data.get('name'),
            time: data.get('time'),
        }

        let resData = await exportedAPITraining.createTraining(dataPost, user.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('training-data')
            exportedSwal.actionSuccess(`เพิ่มข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }

    }

    const actionDeleteTraining = async (id: number) => {

        let data = await exportedAPITraining.deleteTraining(id , user.token)

        if (data.bypass) {
            queryClient.invalidateQueries('training-data')
            exportedSwal.actionSuccess(`ลบข้อมูลเรียบร้อย !`)
        } else {
            exportedSwal.actionInfo(`ลบข้อมูลไม่สำเร็จ !`)
        }

    }


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
                                <Button onClick={() => history.goBack()} variant="contained" sx={{ mr: 1 }}>ย้อนกลับไปยังโปรไฟล์</Button>
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
                                    { name: "name", label: "ชื่อหัวข้อการอบรม" },
                                    { name: "time", label: "ระยะเวลาการอบรม", ex: "ตัวอย่าง xx/10/2563 - xx/04/2564 " },
                                ].map(({ name, label, ex }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
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
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
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

export default Training