import React, { useState, useEffect } from 'react'
import { AppBar,  Button,  Container, Grid, Paper, TextField , Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'



function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const columns: GridColDef[] = [
        { field: 'idcard', headerName: 'บัตรประชาชน' },
        { field: 'banned', headerName: 'สถานะการใช้งาน' },
        {
            field: "checked",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => { }}
                        variant="contained"
                    >
                        ระงับการใช้งาน
                    </Button>
                );
            }
        },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => { }}
                        variant="contained"
                    >
                        Delete
                    </Button>
                );
            }
        },
    ];

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("ผู้ใช้งานระบบ")

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
                    <DataGridList columns={columns} model={[]} />
                </Container>
            </Paper>
        </>
    )
}


export default Topic
