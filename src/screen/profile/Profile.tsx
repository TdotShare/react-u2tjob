import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Divider, FormControl, Grid, InputLabel, Paper, Select, TextField, Toolbar, Typography ,  SelectChangeEvent, MenuItem   } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch } from 'react-redux'
import { setTitle } from './../../store/reducer/TitleHeader'
import { setBreadCms } from './../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import exportedSwal from '../../utils/swal'

function Index() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("โปรไฟล์ผู้ใช้งาน")
    const [titleName, setTitleName] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTitleName(event.target.value);
      };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let profileData = {
            "title": titleName,
            "firstname": data.get('firstname'),
            "surname": data.get('surname'),
            "birthday": data.get('birthday'),
            "email": data.get('email'),
            "nationality": data.get('nationality'),
            "religion": data.get('religion'),
            "tel": data.get('tel'),
            "status": data.get('status'),
            "address_current": data.get('address_current'),
            "address_home": data.get('address_home'),
            "job_name": data.get('job_name'),
            "address_job": data.get('address_job'),
            "work_detail": data.get('work_detail'),
        }

        console.log(profileData)

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
                        <Grid container spacing={2} columns={12} >
                            <Grid item xs={12} sm={12} md={4} lg={4} >
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">คำนำหน้า</InputLabel>
                                    <Select
                                        value={titleName}
                                        label="คำนำหน้า"
                                        onChange={handleChange}
                                    >{
                                        ["นาย" , "นาง" , "นางสาว"].map((item , index) => (
                                            <MenuItem key={index} value={item}>{item}</MenuItem>
                                        ))
                                    }
                                    </Select>
                                </FormControl>
                            </Grid>
                            {
                                [
                                    { name: "firstname", label: "ชื่อจริง" },
                                    { name: "surname", label: "ชื่อนามสกุล" },
                                    { name: "birthday", label: "วันเกิด", ex: "ตัวอย่าง xx/05/2539" },
                                    { name: "email", label: "email" },
                                    { name: "nationality", label: "สัญชาติ" },
                                    { name: "religion", label: "ศาสนา" },
                                    { name: "tel", label: "เบอร์" },
                                    { name: "status", label: "สถานภาพ" },
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
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <TextField
                                    multiline
                                    fullWidth
                                    name={"address_current"}
                                    label={"ที่อยู่ปัจจุบัน"}
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <TextField
                                    multiline
                                    fullWidth
                                    name={"address_home"}
                                    label={"ที่อยู่ตามทะเบียนบ้าน"}
                                    rows={3}
                                />
                            </Grid>
                        </Grid>

                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>

                        <Grid container spacing={2} columns={12} >
                            {
                                [
                                    { name: "job_name", label: "ชื่อตำแหน่ง" },
                                    { name: "address_job", label: "ที่ทำงานปัจจุบัน" },
                                ].map(({ name, label }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                        <TextField
                                            fullWidth
                                            name={name}
                                            label={label}
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
                                    rows={3}
                                />
                            </Grid>
                        </Grid>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                            บันทึกข้อมูล
                        </Button>
                    </Box>
                </Container>
            </Paper>
        </>
    )
}

export default Index