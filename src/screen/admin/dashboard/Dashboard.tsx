import React, { useState, useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
//import { useHistory } from 'react-router-dom'

import { alpha, styled } from '@mui/material/styles';
import { Card, Container, Grid, Typography } from '@mui/material';

import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin, routerPathPublic } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'

import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';

import exportedAPIDash from '../../../utils/api/Dashboard'
import LoadingData from '../../../components/LoadingData';
import { RootState } from '../../../store/ConfigureStore';
import { useQuery } from 'react-query'
import { APIDashboard_data } from '../../../model/Dashboard';
import { Redirect } from 'react-router-dom';


function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}

const RootStyle = styled(Card)(({ theme }) => ({
    boxShadow: '2',
    textAlign: 'center',
    padding: theme.spacing(5, 0),
    color: theme.palette.secondary.main,
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
    margin: 'auto',
    display: 'flex',
    borderRadius: '50%',
    alignItems: 'center',
    width: theme.spacing(8),
    height: theme.spacing(8),
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
    color: theme.palette.secondary.light,
    backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.secondary.dark, 0)} 0%, ${alpha(
        theme.palette.secondary.dark,
        0.24
    )} 100%)`
}));


function Pages() {



    const admin = useSelector((state: RootState) => state.admin.data)
    const dispatch = useDispatch()
    const [title] = useState<string>("ภาพรวมระบบ")

    const { data, isLoading } = useQuery<APIDashboard_data, Error>('admin-dash', async () => exportedAPIDash.getDashboard(admin.token))

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])

    // ----------------------------------------------------------------------


    return (
        <>
        {
            isLoading ?

            <LoadingData />
            
            :

            <Container maxWidth="xl">
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6} md={3}>
                        <RootStyle>
                            <IconWrapperStyle>
                                <PersonIcon width={24} />
                            </IconWrapperStyle>
                            <Typography variant="h3">{data!.data.countuser}</Typography>
                            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                จำนวนผู้สมัครใช้งานระบบ
                            </Typography>
                        </RootStyle>
                    </Grid>
                    <Grid item xs={12} sm={6} md={3}>
                        <RootStyle>
                            <IconWrapperStyle>
                                <WorkIcon width={24} />
                            </IconWrapperStyle>
                            <Typography variant="h3">{data!.data.countjob}</Typography>
                            <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                                จำนวนงานที่เปิดมาแล้ว
                            </Typography>
                        </RootStyle>
                    </Grid>
                </Grid>
            </Container>


        }
            
        </>
    )
}


export default Topic
