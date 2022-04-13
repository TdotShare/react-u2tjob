import { AppBar, Paper, Toolbar, Grid, Typography, Container, Button, Box, Alert, AlertTitle } from '@mui/material'
//import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { APITopic_data } from '../../model/Topic';
import { routerPathProtectedUser } from '../../router/RouterPath';
import { setBreadCms } from '../../store/reducer/Breadcrumbs';
import { setTitle } from '../../store/reducer/TitleHeader';

import { useQuery } from 'react-query'
import exportedAPITopic from '../../utils/api/Topic'
import { RootState } from '../../store/ConfigureStore'
import LoadingData from '../../components/LoadingData'
import BookIcon from '@mui/icons-material/Book';
import { systemConfig } from '../../config/System';


function Index() {


    const [dateJob] = useState<Date>(new Date());

    const dispatch = useDispatch()
    const history = useHistory()
    const [title] = useState<string>("ประกาศรับสมัครงาน")

    const user = useSelector((state: RootState) => state.user.data)

    const { data, isLoading } = useQuery<APITopic_data, Error>('job-data', async () => exportedAPITopic.getIsOpenJob(user.token))


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
                                <Typography >{title}</Typography>
                            </Grid>
                            <Grid item >
                                <Button onClick={() => window.open(`${systemConfig.API}/manual` , '_blank') } variant="contained" startIcon={<BookIcon/>} sx={{ mr: 1 }}>คู่มือการใช้งาน</Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    {
                        isLoading

                            ?

                            <LoadingData />

                            :

                            <>
                                {
                                    data?.data ?
                                        <Box sx={{ m: 1 , mt : 3 }}>
                                            <Typography variant="h6" >{data.data.name}</Typography>
                                            <Typography variant="subtitle1" >ปิดรับสมัคร : {data.data.time}</Typography>
                                            <div style={{ paddingBottom: '2%' }}></div>
                                            <Button onClick={() => history.push(`${routerPathProtectedUser.JobApp}/${data.data.id}`)} variant="contained"  >ยื่นใบสมัคร</Button>
                                            <div style={{ paddingBottom: '2%' }}></div>
                                        </Box>
                                        :
                                        <>
                                            <Alert sx={{m : 2}} severity="warning">
                                                <AlertTitle>ไม่พบการประกาศรับสมัครงานในขณะนี้</AlertTitle>
                                                ค้นหาเมื่อ — <strong>{dateJob.getDate()}-{dateJob.getMonth() + 1}-{dateJob.getFullYear()} {dateJob.getHours()}:{dateJob.getMinutes()}:{dateJob.getSeconds()}</strong>
                                            </Alert>
                                        </>
                                }

                            </>
                    }

                </Container>
            </Paper>
        </>
    )
}

export default Index