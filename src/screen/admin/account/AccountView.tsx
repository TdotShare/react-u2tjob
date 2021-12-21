import React, { useState, useEffect } from 'react'
import { AppBar, Box, Container, Divider, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect, useParams } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery } from 'react-query'
import { RootState } from '../../../store/ConfigureStore'
import exportedAPIAccount from '../../../utils/api/Account'
import { APIProfileView_data } from '../../../model/Profile'
import LoadingData from '../../../components/LoadingData'



function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const { id }: any = useParams();

    const [degree] = useState([
        "ประถมศึกษา",
        "มัธยมศึกษาตอนต้น",
        "มัธยมศึกษาตอนปลาย",
        "ประกาศนียบัตรวิชาชีพ",
        "ประกาศนียบัตรวิชาชีพชั้นสูง",
        "อนุปริญญา",
        "ปริญญาตรี",
        "ปริญญาโท",
        "ปริญญาเอก"
    ])

    const workexpData: GridColDef[] = [
        { field: 'workplace', headerName: 'สถานที่ทำงาน', width: 250 },
        { field: 'position', headerName: 'ตำแหน่ง', width: 200 },
        { field: 'salary', headerName: 'เงินเดือน', width: 200 },
        { field: 'duration', headerName: 'ระยะเวลา', width: 200 },
        { field: 'note', headerName: 'เหตุผลที่ออก', width: 200 },
    ];

    const trainData: GridColDef[] = [
        { field: 'name', headerName: 'ชื่อหัวข้อการอบรม', width: 350 },
        { field: 'time', headerName: 'ระยะเวลาการอบรม', width: 250 },
    ];

    const educationData: GridColDef[] = [
        {
            field: 'degree_id',
            headerName: 'ระดับวุฒิ',
            width: 200,
            renderCell: (params) => {
                return (
                    <Typography>
                        {degree[params.row.degree_id]}
                    </Typography>
                );
            }
        },
        { field: 'major', headerName: 'สาขาวิชา' },
        { field: 'gpa', headerName: 'gpa' },
        { field: 'university', headerName: 'จบจาก' },
        { field: 'timeend', headerName: 'ระยะเวลา' },
    ];



    const admin = useSelector((state: RootState) => state.admin.data)
    const { data, isLoading, isError } = useQuery<APIProfileView_data, Error>(`account-view-${id}`, async () => exportedAPIAccount.getAccount(id, admin.token))

    const dispatch = useDispatch()
    const [title] = useState<string>(`ดูข้อมูลผู้ใช้งาน - ${id}`)

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: "ผู้ใช้งานระบบ", link: routerPathProtectedAdmin.Account, active: false, },
            { value: `${id}`, link: '', active: true, },
        ]))
        // eslint-disable-next-line 
    }, [])

    if (isError) {
        return <Redirect to="/notfound" />
    }

    return (

        <>
            {

                isLoading ?

                    <LoadingData />
                    :
                    <>
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
                                            <Typography >ข้อมูลส่วนตัว</Typography>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                            <Container >
                                <>
                                    <Box component="form" noValidate sx={{ p: '1%', mt: 2 }} >
                                        <Grid container spacing={2} columns={12} >
                                            {
                                                [
                                                    { name: "titlename", label: "คำนำหน้า", value: data?.data.profile?.title ? data?.data.profile?.title : "" },
                                                    { name: "firstname", label: "ชื่อจริง", value: data?.data.profile?.firstname ? data?.data.profile?.firstname : "" },
                                                    { name: "surname", label: "ชื่อนามสกุล", value: data?.data.profile?.surname ? data?.data.profile?.surname : "" },
                                                    { name: "birthday", label: "วันเกิด", value: data?.data.profile?.birthday ? data?.data.profile?.birthday : "" },
                                                    { name: "email", label: "email", value: data?.data.profile?.email ? data?.data.profile?.email : "" },
                                                    { name: "nationality", label: "สัญชาติ", value: data?.data.profile?.nationality ? data?.data.profile?.nationality : "" },
                                                    { name: "religion", label: "ศาสนา", value: data?.data.profile?.religion ? data.data.profile?.religion : "" },
                                                    { name: "tel", label: "เบอร์", value: data?.data.profile?.tel ? data.data.profile?.tel : "" },
                                                    { name: "status", label: "สถานภาพ", value: data?.data.profile?.status ? data.data.profile?.status : "" },
                                                ].map(({ name, label, value }, index) => (
                                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                                        <TextField
                                                            fullWidth
                                                            required
                                                            variant="filled"
                                                            name={name}
                                                            label={label}
                                                            defaultValue={value}
                                                            disabled
                                                        />
                                                    </Grid>
                                                ))
                                            }

                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <TextField
                                                    disabled
                                                    multiline
                                                    variant="filled"
                                                    fullWidth
                                                    name={"address_current"}
                                                    label={"ที่อยู่ปัจจุบัน"}
                                                    defaultValue={data?.data.profile?.address_current ? data.data.profile?.address_current : ""}
                                                    rows={3}
                                                />
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <TextField
                                                    disabled
                                                    multiline
                                                    fullWidth
                                                    variant="filled"
                                                    name={"address_home"}
                                                    label={"ที่อยู่ตามทะเบียนบ้าน"}
                                                    defaultValue={data?.data.profile?.address_home ? data.data.profile?.address_home : ""}
                                                    rows={3}
                                                />
                                            </Grid>
                                        </Grid>

                                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

                                        <Grid container spacing={2} columns={12} >
                                            {
                                                [
                                                    { name: "job_name", label: "ชื่อตำแหน่ง", value: data?.data.profile?.job_name ? data.data.profile?.job_name : "" },
                                                    { name: "address_job", label: "ที่ทำงานปัจจุบัน", value: data?.data.profile?.address_job ? data.data.profile?.address_job : "" },
                                                ].map(({ name, label, value }, index) => (
                                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                                        <TextField
                                                            fullWidth
                                                            name={name}
                                                            disabled
                                                            variant="filled"
                                                            label={label}
                                                            defaultValue={value}
                                                        />
                                                    </Grid>
                                                ))
                                            }
                                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                                <TextField
                                                    multiline
                                                    fullWidth
                                                    disabled
                                                    variant="filled"
                                                    name={"work_detail"}
                                                    label={"รายละเอียดงานที่ทำปัจจุบัน"}
                                                    defaultValue={data?.data.profile?.address_current ? data.data.profile?.address_current : ""}
                                                    rows={3}
                                                />
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </>
                            </Container>
                        </Paper>

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

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
                                            <Typography >ประวัติการศึกษา</Typography>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                            <Container >
                                <DataGridList columns={educationData} model={data?.data.education} />
                            </Container>
                        </Paper>

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

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
                                            <Typography >ประสบการณ์การทำงาน</Typography>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                            <Container >
                                <DataGridList columns={workexpData} model={data?.data.workexperience} />
                            </Container>
                        </Paper>

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

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
                                            <Typography >ประวัติการฝึกอบรม</Typography>
                                        </Grid>
                                    </Grid>
                                </Toolbar>
                            </AppBar>
                            <Container >
                                <DataGridList columns={trainData} model={data?.data.training} />
                            </Container>
                        </Paper>
                    </>
            }



        </>
    )
}


export default Topic
