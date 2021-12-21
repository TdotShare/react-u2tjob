import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, Paper, Select, TextField, Toolbar, Typography, SelectChangeEvent, MenuItem } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from './../../store/reducer/TitleHeader'
import { setBreadCms } from './../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import exportedSwal from '../../utils/swal'
import exportedAPIProfile from '../../utils/api/Profile'
import { RootState } from '../../store/ConfigureStore'
import { useQuery, useQueryClient } from 'react-query'
import { APIProfile_data } from '../../model/Profile'
import LoadingData from '../../components/LoadingData'

function Index() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const history = useHistory()
    const dispatch = useDispatch()

    const queryClient = useQueryClient()
    const user = useSelector((state: RootState) => state.user.data)
    const [title] = useState<string>("โปรไฟล์ผู้ใช้งาน")
    const [titleName, setTitleName] = React.useState('');

    const { data, isLoading } = useQuery<APIProfile_data, Error>('profile-view', async () => exportedAPIProfile.getProfile(user.token))

    const handleChange = (event: SelectChangeEvent) => {
        setTitleName(event.target.value);
    };
    
    const resetPassowrdUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);

        if( !formdata.get('password_new') || !formdata.get('password') ){
            exportedSwal.actionInfo(`กรุณากรอกข้อมูลการเปลี่ยนรหัสผ่านให้ครบ !`)
            return
        }

        
        let passwordData = {
            "password": formdata.get('password'),
            "password_new": formdata.get('password_new'),
        }

        let resData = await exportedAPIProfile.reSetPassowrd(passwordData, user.token)

        if (resData.bypass) {
            exportedSwal.actionSuccess(`แก้ไขรหัสผ่านเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formdata = new FormData(event.currentTarget);

        let profileData = {
            "title": titleName,
            "firstname": formdata.get('firstname'),
            "surname": formdata.get('surname'),
            "birthday": formdata.get('birthday'),
            "email": formdata.get('email'),
            "nationality": formdata.get('nationality'),
            "religion": formdata.get('religion'),
            "tel": formdata.get('tel'),
            "status": formdata.get('status'),
            "address_current": formdata.get('address_current'),
            "address_home": formdata.get('address_home'),
            "job_name": formdata.get('job_name'),
            "address_job": formdata.get('address_job'),
            "work_detail": formdata.get('work_detail'),
        }


        let resData = await exportedAPIProfile.updateProfile(profileData, user.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('profile-view')
            exportedSwal.actionSuccess(`แก้ไขข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }

        exportedSwal.actionSuccess("บันทึกข้อมูล โปรไฟล์ เรียบร้อย !")
    }

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])


    console.log(data?.data)

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
                            <Grid item >
                                <Button onClick={() => history.push(routerPathProtectedUser.Education)} variant="contained" sx={{ mr: 1 }}>ประวัติการศึกษา</Button>
                                <Button onClick={() => history.push(routerPathProtectedUser.Workexperience)} variant="contained" sx={{ mr: 1 }}>ประสบการณ์การทำงาน</Button>
                                <Button onClick={() => history.push(routerPathProtectedUser.Training)} variant="contained" sx={{ mr: 1 }}>การฝึกอบรม</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Box component="form" onSubmit={handleSubmit}
                        noValidate
                        sx={{ p: '1%', mt: 2 }}

                    >
                        {
                            isLoading ?

                                <LoadingData />

                                :
                                <>
                                    <Grid container spacing={2} columns={12} >
                                        <Grid item xs={12} sm={12} md={4} lg={4} >
                                            <FormControl fullWidth>
                                                <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>

                                                {
                                                    data?.data?.title  ?

                                                        <Select
                                                            value={titleName ? titleName : data?.data.title}
                                                            label="คำนำหน้า"
                                                            onChange={handleChange}
                                                        >{
                                                                ["นาย", "นาง", "นางสาว"].map((item, index) => (
                                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>

                                                        :

                                                        <Select
                                                            value={titleName}
                                                            label="คำนำหน้า"
                                                            onChange={handleChange}
                                                        >{
                                                                ["นาย", "นาง", "นางสาว"].map((item, index) => (
                                                                    <MenuItem key={index} value={item}>{item}</MenuItem>
                                                                ))
                                                            }
                                                        </Select>




                                                }

                                            </FormControl>
                                        </Grid>
                                        {
                                            [
                                                { name: "firstname", label: "ชื่อจริง", value: data?.data ? data.data.firstname : "" },
                                                { name: "surname", label: "ชื่อนามสกุล", value: data?.data ? data.data.surname : "" },
                                                { name: "birthday", label: "วันเกิด", ex: "ตัวอย่าง วัน-เดือน-ปี | 01-01-2539", value: data?.data ? data.data.birthday : "" },
                                                { name: "email", label: "email", value: data?.data ? data.data.email : "" },
                                                { name: "nationality", label: "สัญชาติ", value: data?.data ? data.data.nationality : "" },
                                                { name: "religion", label: "ศาสนา", value: data?.data ? data.data.religion : "" },
                                                { name: "tel", label: "เบอร์", value: data?.data ? data.data.tel : "" },
                                                { name: "status", label: "สถานภาพ", value: data?.data ? data.data.status : "" },
                                            ].map(({ name, label, ex, value }, index) => (
                                                <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        name={name}
                                                        label={label}
                                                        placeholder={ex}
                                                        defaultValue={value}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <TextField
                                                multiline
                                                fullWidth
                                                name={"address_current"}
                                                label={"ที่อยู่ปัจจุบัน"}
                                                defaultValue={data?.data ? data.data.address_current : ""}
                                                rows={3}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <TextField
                                                multiline
                                                fullWidth
                                                name={"address_home"}
                                                label={"ที่อยู่ตามทะเบียนบ้าน"}
                                                defaultValue={data?.data ? data.data.address_home : ""}
                                                rows={3}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

                                    <Grid container spacing={2} columns={12} >
                                        {
                                            [
                                                { name: "job_name", label: "ชื่อตำแหน่ง", value: data?.data ? data.data.job_name : "" },
                                                { name: "address_job", label: "ที่ทำงานปัจจุบัน", value: data?.data ? data.data.address_job : "" },
                                            ].map(({ name, label, value }, index) => (
                                                <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                                    <TextField
                                                        fullWidth
                                                        name={name}
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
                                                name={"work_detail"}
                                                label={"รายละเอียดงานที่ทำปัจจุบัน"}
                                                defaultValue={data?.data ? data.data.work_detail : ""}
                                                rows={3}
                                            />
                                        </Grid>
                                    </Grid>

                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                        บันทึกข้อมูล
                                    </Button>
                                </>
                        }
                    </Box>
                </Container>
            </Paper>

            <Paper sx={{ maxWidth: 1200, margin: 'auto', overflow: 'hidden' , mt: 2 }}>
                <AppBar
                    position="static"
                    color="default"
                    elevation={0}
                    sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
                >
                    <Toolbar>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs>
                                <Typography >เปลี่ยนรหัสผ่าน</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    <Box component="form" onSubmit={resetPassowrdUser}
                        noValidate
                        sx={{ p: '1%', mt: 2 }}

                    >
                        <Grid container spacing={2} columns={12} >
                            {
                                [
                                    { name: "password", label: "รหัสผ่านเดิม" },
                                    { name: "password_new", label: "รหัสผ่านใหม่", },
                                ].map(({ name, label }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
                                        />
                                    </Grid>
                                ))
                            }
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" color='secondary' sx={{ mt: 3, mb: 2 }} >
                            เปลี่ยนรหัสผ่าน
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </>
    )
}

export default Index