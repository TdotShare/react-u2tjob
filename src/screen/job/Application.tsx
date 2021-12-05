import { AppBar, Paper, Toolbar, Grid, Typography, Container, Box, Divider, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Paperbase from '../../components/template/Paperbase'
import { Topic } from '../../model/Topic';
import { routerPathProtectedUser } from '../../router/RouterPath';
import { setBreadCms } from '../../store/reducer/Breadcrumbs';
import { setTitle } from '../../store/reducer/TitleHeader';

import InputUploadFile from '../../components/InputUploadFile';
import TabDataProfiles from '../../components/TabDataProfiles';

function Application() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()
    const [title] = useState<string>("ยื่นใบสมัคร")
    const [model] = useState<Topic>({ "id": 1, "name": "โครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ รอบที่ 8", time: "10:11:2564" })
    const [tambonWork] = useState(["พลกรัง", "โคกกรวด", "หมื่นไวย", "จันทึก", "พญาเย็น", "ดงใหญ่", "กระเบื้องใหญ่", "สีสุก", "บึงสำโรง", "ตูม", "มะเกลือใหม่", "หินดาด", "ทองหลาง"])


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();


        console.log(`handleSubmit !`)
    }


    const [nameTambonOne, setNameTambonOne] = useState<string>('')
    const [nameTambonTwo, setNameTambonTwo] = useState<string>('')
    const setTabomWorkOne = (event: SelectChangeEvent) => {
        setNameTambonOne(event.target.value);
    };

    const setTabomWorkTwo = (event: SelectChangeEvent) => {
        setNameTambonTwo(event.target.value);
    };

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: "ประกาศรับสมัครงาน", link: routerPathProtectedUser.Job, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])

    return (
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
                                <Typography >{title} : {model.name}</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    <TabDataProfiles />
                    <Divider sx={{ marginTop: 0, marginBottom: 2 }}></Divider>
                    <Box component="form" onSubmit={handleSubmit} noValidate >
                        <Grid container spacing={2} columns={12} >
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <TextField
                                    multiline
                                    fullWidth
                                    name={"talent"}
                                    label={"ความสำเร็จของท่านที่ทำผ่านมาในช่วง 3 ปีหลัง (ถ้ามี)"}
                                    rows={3}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <FormControl fullWidth>
                                    <InputLabel >โปรดเลือกพื้นที่ปฏิบัติงาน ลำดับที่ 1</InputLabel>
                                    <Select
                                        value={nameTambonOne}
                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 1"
                                        onChange={setTabomWorkOne}
                                    >{
                                            tambonWork.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <FormControl fullWidth>
                                    <InputLabel >โปรดเลือกพื้นที่ปฏิบัติงาน ลำดับที่ 2</InputLabel>
                                    <Select
                                        value={nameTambonTwo}
                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 2"
                                        onChange={setTabomWorkTwo}
                                    >{
                                            tambonWork.map((item, index) => (
                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                            ))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>
                        <Typography  >หลักฐานการสมัคร</Typography>
                        <Box sx={{ p: '2%', mt: 2 }}>
                            <InputUploadFile title={`ภาพถ่ายผู้มัคร (ถ่ายไว้ไม่เกิน 3 เดือน)`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`สำเนาปริญญาบัตร หรือ หนังสือรับรองคุณวุติ`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`Transcript`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`สำเนาหลักฐานการเปลี่ยนชื่อสกุล (ถ้ามี)`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`สำเนาบัตรประชาชน`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`สำเนาทะเบียนบ้าน`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`สำเนาหลักฐานการเกณฑ์ทหาร`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`ใบรับรองพื้นที่`} fileData={(data: File) => { console.log(data) }} />
                            <InputUploadFile title={`เอกสารอื่นๆ`} fileData={(data: File) => { console.log(data) }} />
                        </Box>

                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }} >
                            บันทึกข้อมูล
                        </Button>
                    </Box>

                </Container>
            </Paper>
        </>
    )
}

export default Application