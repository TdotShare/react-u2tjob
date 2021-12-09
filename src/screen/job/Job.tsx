import { AppBar, Paper, Toolbar, Grid, Typography, Container, Button, Box } from '@mui/material'
//import { GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import Paperbase from '../../components/template/Paperbase'
import { Topic } from '../../model/Topic';
import { routerPathProtectedUser } from '../../router/RouterPath';
import { setBreadCms } from '../../store/reducer/Breadcrumbs';
import { setTitle } from '../../store/reducer/TitleHeader';

function Index() {

    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()
    const history = useHistory()
    const [title] = useState<string>("ประกาศรับสมัครงาน")
    
    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])

    const [model] = useState<Topic>({ id: 1, name: "test01", time: new Date() , round : 1})

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
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    {
                        model ?
                            <Box sx={{ m : 1 }}>
                                <Typography variant="h6" >รับสมัครบุคคลเข้าทำงานตามโครงการยกระดับเศรษฐกิจและสังคมรายตำบลแบบบูรณาการ รอบที่ 8</Typography>
                                <Typography variant="subtitle1" >ปิดรับสมัคร : 12 / 2 / 2564</Typography>
                                <div style={{paddingBottom : '2%'}}></div>
                                <Button onClick={() => history.push(routerPathProtectedUser.JobApp)} variant="contained"  >ยื่นใบสมัคร</Button>
                                <div style={{paddingBottom : '2%'}}></div>
                            </Box>
                            :
                            <></>
                    }
                </Container>
            </Paper>
        </>
    )
}

export default Index