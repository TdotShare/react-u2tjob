import React, { useEffect, useState } from 'react'
import { AppBar, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch } from 'react-redux'
import { setTitle } from './../../store/reducer/TitleHeader'
import { setBreadCms } from './../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'

function Index() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const dispatch = useDispatch()
    const [title] = useState<string>("โปรไฟล์ผู้ใช้งาน")



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
                            <Grid item>

                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    test
                </Container>
            </Paper>
        </>
    )
}

export default Index