import React, { useState, useEffect } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import exportedSwal from '../../../utils/swal'
import DataDatePicker from '../../../components/DataDatePicker'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import exportedAPITopic from '../../../utils/api/Topic'
import { useQuery, useQueryClient } from 'react-query'
import { APITopic_data } from '../../../model/Topic'
import { RootState } from '../../../store/ConfigureStore'
import LoadingData from '../../../components/LoadingData'


function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}

function Pages() {

    const queryClient = useQueryClient()
    const admin = useSelector((state: RootState) => state.admin.data)

    const { data, isLoading } = useQuery<APITopic_data, Error>('admin-topic', async () => exportedAPITopic.getTopicAll(admin.token))

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("เปิดรอบสมัครงาน")
    const [timeJob, setTimeJob] = useState<Date | null>(new Date())

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get('name') === "" || formData.get('round') === "") {
            exportedSwal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
            return
        }
        
        let dataPost = {
            "name": formData.get('name'),
            "round": formData.get('round'),
            'time': `${timeJob?.getFullYear()}-${timeJob!.getMonth() + 1}-${timeJob?.getDate()}`,
        }

        let resData = await exportedAPITopic.createTopic(dataPost, admin.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('admin-topic')
            exportedSwal.actionSuccess(`เพิ่มข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(`เพิ่มข้อมูลไม่สำเร็จ`)
        }

    }

    const actionDelete = async (id: number) => {

        let resData = await exportedAPITopic.deleteTopic(id, admin.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('admin-topic')
            exportedSwal.actionSuccess(`ลบข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(`${resData.message}`)
        }

    }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'IDTopic', width: 100 },
        { field: 'name', headerName: 'ชื่องาน', width: 400 },
        { field: 'round', headerName: 'รอบ' },
        { field: 'countuser', headerName: 'ผู้สมัครทั้งหมด', width: 250 },
        { field: 'status', headerName: 'สถานะการใช้งาน', renderCell: (params) => { return (<Typography>{params.row.status === 1 ? "เปิดการใช้งาน" : "ซ่อน"}</Typography>) } , width : 150 },
        { field: 'isshow', headerName: 'สถานะการเผยแพร่', renderCell: (params) => { return (<Typography>{params.row.isshow === 1 ? "เผยแพร่" : "ซ่อน"}</Typography>) } , width : 150 },
        { field: 'time', headerName: 'ปิดรับสมัคร', width: 200 },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 350,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => history.push(`${routerPathProtectedAdmin.TopicUpdate}/${params.row.id}`) }
                            variant="contained"
                        >
                            แก้ไขข้อมูล
                        </Button>
                        <div style={{ margin: 5 }}></div>
                        <Button
                            onClick={() => history.push(`${routerPathProtectedAdmin.TopicChecked}/${params.row.id}`)  }
                            variant="contained"
                        >
                            ตรวจสอบผู้สมัคร
                        </Button>
                        <div style={{ margin: 5 }}></div>
                        <Button
                            onClick={() => actionDelete(params.row.id)}
                            color="secondary"
                            variant="contained"
                        >
                            ลบข้อมูล
                        </Button>
                    </>
                );
            }
        },

    ];

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
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
                                    { name: "name", label: "ชื่อหัวข้อการเปิดรับสมัคร", ty: "text" },
                                    { name: "round", label: "รอบที่", ty: "number" },
                                ].map(({ name, label, ty }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
                                            type={ty}
                                        />
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <DataDatePicker title={`วันที่ปิดรับสมัคร`} dateData={(data: Date | null) => setTimeJob(data)} />
                            </Grid>
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
                                <Typography >รายการสมัครงาน</Typography>
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


export default Topic
