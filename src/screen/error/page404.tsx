import { Box, Grid, Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Paperbase from '../../components/template/Paperbase'
import { routerPathProtectedAdmin , routerPathProtectedUser } from '../../router/RouterPath'
import { setBreadCms } from '../../store/reducer/Breadcrumbs'
import { setTitle } from '../../store/reducer/TitleHeader'
import WarningIcon from '@mui/icons-material/Warning';
import { Link  } from "react-router-dom";
import { RootState } from '../../store/ConfigureStore'

function Page404() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    //const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("404 NOT FOUND")

    const user = useSelector((state: RootState) => state.user.data)
    const redirectHome = user.idcard ? routerPathProtectedUser.Job :  routerPathProtectedAdmin.Dashboard
    
    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: title, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])


    return (
        <>
            <Box sx={{ justifyContent: "center" }} >
                <Grid container >
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="h1" color={`secondary`} >  <WarningIcon sx={{ fontSize: 70}} color={`secondary`} /> 404</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" color={`secondary`} > ไม่พบข้อมูลหรือหน้าเพจ ที่คุณเรียกใช้งาน</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
                        <Typography variant="h6" >กรุณากลับไปยังหน้าเพจที่สามารถเข้าถึงข้อมูลได้ <Link to={redirectHome}>หน้าหลัก</Link> </Typography>
                    </Grid>
                </Grid >
            </Box>
        </>
    )
}


export default Page404
