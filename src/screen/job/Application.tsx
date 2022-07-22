import { AppBar, Paper, Toolbar, Grid, Typography, Container, Box, Divider, Button, TextField, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { routerPathProtectedUser } from '../../router/RouterPath';
import { setBreadCms } from '../../store/reducer/Breadcrumbs';
import { setTitle } from '../../store/reducer/TitleHeader';
import { Redirect, useParams } from 'react-router-dom'

import exportedAPIJob from '../../utils/api/Job'

import InputUploadFile from '../../components/InputUploadFile';
import TabDataProfiles from '../../components/TabDataProfiles';
import { useQuery, useQueryClient } from 'react-query';
import { RootState } from '../../store/ConfigureStore';
import LoadingData from '../../components/LoadingData';
import { APIJobApp_data } from '../../model/JobApp';
import exportedSwal from '../../utils/swal';
import { systemConfig } from '../../config/System';

function Application() {


    const { id }: any = useParams();

    const queryClient = useQueryClient()
    const dispatch = useDispatch()
    const [title] = useState<string>("ยื่นใบสมัคร")
    const [typeJobSpec] = useState(["บุคคลจากตำบล", "นักศึกษาจบใหม่"])
    const user = useSelector((state: RootState) => state.user.data)

    const { data, isLoading, isError } = useQuery<APIJobApp_data, Error>('job-profiles', async () => exportedAPIJob.getJob(id, user.token))
    const [reloadpage, setReloading] = useState<boolean>(false)

    const [nameTambonOne, setNameTambonOne] = useState<string>('')
    const [nameTambonTwo, setNameTambonTwo] = useState<string>('')
    const [nameTypeJob, setNameTypeJob] = useState<string>('')

    const [evid0, setEvid0] = useState<File>()
    const [evid1, setEvid1] = useState<File>()
    const [evid2, setEvid2] = useState<File>()
    const [evid3, setEvid3] = useState<File>()
    const [evid4, setEvid4] = useState<File>()
    const [evid5, setEvid5] = useState<File>()
    const [evid6, setEvid6] = useState<File>()
    const [evid7, setEvid7] = useState<File>()
    const [evid8, setEvid8] = useState<File>()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        var postData = new FormData();

        let nameTambonOneChecked = nameTambonOne ? nameTambonOne : data!.data.job.work_area_one
        let nameTambonTwoChecked = nameTambonTwo ? nameTambonTwo : data!.data.job.work_area_two
        let typeJobChecked = nameTypeJob ? nameTypeJob : data!.data.job.type_job

        postData.append("apply_id", `${data?.data.job.id}`)
        postData.append("talent", `${formData.get('talent')}`)
        
        if (nameTambonOneChecked) postData.append("work_area_one", nameTambonOneChecked)
        if (nameTambonTwoChecked) postData.append("work_area_two", nameTambonTwoChecked)
        if (typeJobChecked) postData.append("type_job", typeJobChecked)

        if (evid0) postData.append("evid0", evid0!)
        if (evid1) postData.append("evid1", evid1!)
        if (evid2) postData.append("evid2", evid2!)
        if (evid3) postData.append("evid3", evid3!)
        if (evid4) postData.append("evid4", evid4!)
        if (evid5) postData.append("evid5", evid5!)
        if (evid6) postData.append("evid6", evid6!)
        if (evid7) postData.append("evid7", evid7!)
        if (evid8) postData.append("evid8", evid8!)


        let resData = await exportedAPIJob.updateJob(postData, user.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('job-profiles')
            exportedSwal.actionSuccess(`บันทักใบสมัครของคุณเรียบร้อย !`)

            setReloading(true)

            setTimeout(() => {
                setReloading(false)
            }, 500);

        } else {
            exportedSwal.actionInfo(resData.message)
        }

    }

    const actionUrlOpen = (filename: string | undefined) => {
        if (filename) {
            window.open(`${systemConfig.ImagesPath}/${id}/${data?.data.job.code}/${filename}`, '_blank')
        }
    }

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: "ประกาศรับสมัครงาน", link: routerPathProtectedUser.Job, active: false, },
            { value: title, link: "", active: true, }
        ]))

        // eslint-disable-next-line 
    }, [])

    if (isError) {
        return <Redirect to="/notfound" />
    }

    return (

        <>
            {
                isLoading || reloadpage ?

                    <LoadingData />

                    :

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
                                        <Typography >{title} : {data?.data.topic.name}</Typography>
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
                                            defaultValue={data?.data.job.talent ? data?.data.job.talent : ''}
                                            name={"talent"}
                                            label={"ความสำเร็จของท่านที่ทำผ่านมาในช่วง 3 ปีหลัง (ถ้ามี)"}
                                            rows={3}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <FormControl fullWidth>
                                            <InputLabel >เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 1</InputLabel>
                                            {
                                                data?.data.job.work_area_one ?

                                                    <Select
                                                        value={nameTambonOne ? nameTambonOne : data?.data.job.work_area_one}
                                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 1"
                                                        onChange={(event: SelectChangeEvent) => setNameTambonOne(event.target.value)}
                                                    >{
                                                            data?.data.tambon.map((item) => (
                                                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>

                                                    :

                                                    <Select
                                                        value={nameTambonOne}
                                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 1"
                                                        onChange={(event: SelectChangeEvent) => setNameTambonOne(event.target.value)}
                                                    >{
                                                            data?.data.tambon.map((item) => (
                                                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>


                                            }

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <FormControl fullWidth>
                                            <InputLabel >เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 2</InputLabel>
                                            {
                                                data?.data.job.work_area_two ?

                                                    <Select
                                                        value={nameTambonTwo ? nameTambonTwo : data?.data.job.work_area_two}
                                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 2"
                                                        onChange={(event: SelectChangeEvent) => setNameTambonTwo(event.target.value)}
                                                    >{
                                                            data?.data.tambon.map((item) => (
                                                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>

                                                    :

                                                    <Select
                                                        value={nameTambonTwo}
                                                        label="เลือกพื้นที่ปฏิบัติงาน ลำดับที่ 2"
                                                        onChange={(event: SelectChangeEvent) => setNameTambonTwo(event.target.value)}
                                                    >{
                                                            data?.data.tambon.map((item) => (
                                                                <MenuItem key={item.id} value={item.name}>{item.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>


                                            }

                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12} >
                                        <FormControl fullWidth>
                                            <InputLabel >ประเภทการสมัคร</InputLabel>
                                            {
                                                data?.data.job.type_job ?

                                                    <Select
                                                        value={nameTypeJob ? nameTypeJob : data?.data.job.type_job}
                                                        label="ประเภทการสมัคร"
                                                        onChange={(event: SelectChangeEvent) => setNameTypeJob(event.target.value)}
                                                    >{
                                                            typeJobSpec.map((item, index) => (
                                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>

                                                    :
                                                    <Select
                                                        value={nameTypeJob}
                                                        label="ประเภทการสมัคร"
                                                        onChange={(event: SelectChangeEvent) => setNameTypeJob(event.target.value)}
                                                    >{
                                                            typeJobSpec.map((item, index) => (
                                                                <MenuItem key={index} value={item}>{item}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>



                                            }

                                        </FormControl>
                                    </Grid>
                                </Grid>
                                <Divider sx={{ marginTop: 2, marginBottom: 2 }}></Divider>
                                <Typography  >หลักฐานการสมัคร</Typography>
                                <Box sx={{ p: '2%', mt: 2 }}>
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid0)} files={evid0} setphoto={data?.data.job.evid0 ? true : false} shotnamefile='ภาพถ่ายผู้มัคร' title={`ภาพถ่ายผู้มัคร (ถ่ายไว้ไม่เกิน 3 เดือน)`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid0(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid1)} files={evid1} setphoto={data?.data.job.evid1 ? true : false} shotnamefile='หนังสือรับรองคุณวุติ' title={`สำเนาปริญญาบัตร หรือ หนังสือรับรองคุณวุติ`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid1(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid2)} files={evid2} setphoto={data?.data.job.evid2 ? true : false} shotnamefile='Transcript' title={`Transcript`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid2(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid3)} files={evid3} setphoto={data?.data.job.evid3 ? true : false} shotnamefile='สำเนาหลักฐานการเปลี่ยนชื่อสกุล' title={`สำเนาหลักฐานการเปลี่ยนชื่อสกุล (ถ้ามี)`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid3(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid4)} files={evid4} setphoto={data?.data.job.evid4 ? true : false} shotnamefile='สำเนาบัตรประชาชน' title={`สำเนาบัตรประชาชน`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid4(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid5)} files={evid5} setphoto={data?.data.job.evid5 ? true : false} shotnamefile='สำเนาทะเบียนบ้าน' title={`สำเนาทะเบียนบ้าน`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid5(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid6)} files={evid6} setphoto={data?.data.job.evid6 ? true : false} shotnamefile='สำเนาหลักฐานการเกณฑ์ทหาร' title={`สำเนาหลักฐานการเกณฑ์ทหาร`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid6(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid7)} files={evid7} setphoto={data?.data.job.evid7 ? true : false} shotnamefile='ใบรับรองพื้นที่' title={`ใบรับรองพื้นที่`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid7(data) }} />
                                    <InputUploadFile urlData={() => actionUrlOpen(data?.data.job.evid8)} files={evid8} setphoto={data?.data.job.evid8 ? true : false} shotnamefile='เอกสารอื่นๆ' title={`เอกสารอื่นๆ`} fileData={(data: File | undefined) => { if (data !== undefined) setEvid8(data) }} />
                                </Box>
                                <Button type="submit" fullWidth variant="contained" sx={{ mt: 0, mb: 2 }} >
                                    บันทึกข้อมูล
                                </Button>
                            </Box>


                        </Container>
                    </Paper>

            }

        </>
    )
}

export default Application