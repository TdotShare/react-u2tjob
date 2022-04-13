import React, { useState, useEffect } from 'react'
import { AppBar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import exportedSwal from '../../../utils/swal'
import DataDatePicker from '../../../components/DataDatePicker'
import exportedAPITopic from '../../../utils/api/Topic'
import { useQuery, useQueryClient } from 'react-query'
import { APITopic_data } from '../../../model/Topic'
import { RootState } from '../../../store/ConfigureStore'
import LoadingData from '../../../components/LoadingData'





function TopicUpdate() {

    const queryClient = useQueryClient()
    const admin = useSelector((state: RootState) => state.admin.data)
    const { id }: any = useParams();

    const { data, isLoading  } = useQuery<APITopic_data, Error>(`admin-topic-view-${id}`, async () => exportedAPITopic.getTopic(id, admin.token))

    const dispatch = useDispatch()
    const [title] = useState<string>(`แก้ไขข้อมูล id - ${id}`)
    const [timeJob, setTimeJob] = useState<Date | null>(new Date())
    const [isSelect, setIsSelect] = useState<string>('')
    const [isShow, setIsShow] = useState<string>('')

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: "เปิดรอบสมัครงาน", link: routerPathProtectedAdmin.Topic, active: false, },
            { value: id, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])


    const setOpenJob = (event: SelectChangeEvent) => {
        setIsSelect(event.target.value);
    };


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get('name') === "" || formData.get('round') === "") {
            exportedSwal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
            return
        }

        let dataPost = {
            "topic_id": id,
            "name": formData.get('name'),
            "round": formData.get('round'),
            "status": isSelect === '' ? null : isSelect,
            'time': `${timeJob?.getFullYear()}-${timeJob!.getMonth() + 1}-${timeJob?.getDate()}`,
            'isshow' : isShow === '' ? null : isShow
        }

        let resData = await exportedAPITopic.updateTopic(dataPost, admin.token)

        if (resData.bypass) {
            queryClient.invalidateQueries(`admin-topic-view-${id}`)
            exportedSwal.actionSuccess(`แก้ไขข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
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
                            isLoading
                                ?
                                <LoadingData />
                                :
                                <>
                                    <Grid container spacing={2} columns={12} >
                                        {
                                            [
                                                { name: "name", label: "ชื่อหัวข้อการเปิดรับสมัคร", ty: "text", value: data?.data.name },
                                                { name: "round", label: "รอบที่", ty: "number", value: data?.data.round },
                                            ].map(({ name, label, ty, value }, index) => (
                                                <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        defaultValue={`${value}`}
                                                        name={name}
                                                        label={label}
                                                        type={ty}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <DataDatePicker setValue={data?.data.time} title={`วันที่ปิดรับสมัคร`} dateData={(data: Date | null) => setTimeJob(data)} />
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <FormControl fullWidth>
                                                <InputLabel >เลือกสถานะการใช้งาน</InputLabel>
                                                <Select
                                                    value={isSelect}
                                                    label="เลือกสถานะการใช้งาน"
                                                    onChange={setOpenJob}
                                                >{
                                                        [{ name: "เปิดการใช้งาน", value: 1 }, { name: "ปิดการใช้งาน", value: 2 }].map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12} >
                                            <FormControl fullWidth>
                                                <InputLabel >เลือกสถานะเผยแพร่</InputLabel>
                                                <Select
                                                    value={isShow}
                                                    label="เลือกสถานะเผยแพร่"
                                                    onChange={(event: SelectChangeEvent) => setIsShow(event.target.value)}
                                                >{
                                                        [{ name: "เผยแพร่", value: 1 }, { name: "ซ่อน", value: 2 }].map((item, index) => (
                                                            <MenuItem key={index} value={item.value}>{item.name}</MenuItem>
                                                        ))
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                        แก้ไขข้อมูล
                                    </Button></>
                        }

                    </Box>
                </Container>
            </Paper>
        </>
    )
}


export default TopicUpdate
