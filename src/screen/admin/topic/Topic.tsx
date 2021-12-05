import React, { useState, useEffect } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import exportedSwal from '../../../utils/swal'
import DataDatePicker from '../../../components/DataDatePicker'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'



function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}

function Pages() {

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("เปิดรอบสมัครงาน")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        exportedSwal.actionSuccess("เพิ่มข้อมูล การอบรม เรียบร้อย !")
        //const data = new FormData(event.currentTarget);

    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'ชื่องาน' },
        { field: 'round', headerName: 'รอบ' },
        { field: 'status', headerName: 'สถานะการใช้งาน' },
        { field: 'time', headerName: 'ปิดรับสมัคร' },
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
                        ตรวจสอบผู้สมัคร
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
                        <Grid container spacing={2} columns={12} >
                            {
                                [
                                    { name: "name", label: "ชื่อหัวข้อการเปิดรับสมัคร", ty: "text" },
                                    { name: "round", label: "รอบที่", ty: "number" },
                                ].map(({ name, label, ty }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
                                            type={ty}
                                        />
                                    </Grid>
                                ))
                            }
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <DataDatePicker  title={`วันที่ปิดรับสมัคร`} dateData={(data : Date | null) => {console.log(data)}} />
                            </Grid>
                        </Grid>
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                            เพิ่มข้อมูล
                        </Button>
                    </Box>
                </Container>
            </Paper>

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
                                <Typography >รายการสมัครงาน</Typography>
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
