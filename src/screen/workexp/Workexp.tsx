import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch } from 'react-redux'
import { setTitle } from '../../store/reducer/TitleHeader'
import { setBreadCms } from '../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import DataGridList from '../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import exportedSwal from '../../utils/swal'

function Workexp() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {


    const columns: GridColDef[] = [
        { field: 'workplace', headerName: 'สถานที่ทำงาน' },
        { field: 'position', headerName: 'ตำแหน่ง' },
        { field: 'salary', headerName: 'เงินเดือน' },
        { field: 'duration', headerName: 'ระยะเวลา' },
        { field: 'note', headerName: 'เหตุผลที่ออก' },
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
    const [title] = useState<string>("ประสบการณ์ทํางาน")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //const data = new FormData(event.currentTarget);

        exportedSwal.actionSuccess(`เพิ่มข้อมูล ประสบการณ์ทำงาน เรียบร้อย !`)

    }

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedUser.Job, active: false, },
            { value: "โปรไฟล์", link: routerPathProtectedUser.Profile, active: false, },
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
                                <Button onClick={() => history.goBack()} variant="contained" sx={{ mr: 1 }}>ย้อนกลับไปยังโปรไฟล์</Button>
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
                                    { name: "workplace", label: "สถานที่ทำงาน" },
                                    { name: "position", label: "ตำแหน่ง" },
                                    { name: "salary", label: "เงินเดือน" },
                                    { name: "duration", label: "ระยะเวลา", ex: "ตัวอย่าง 10/2563 - 04/2564 " },
                                    { name: "note", label: "เหตุผลที่ออก", },
                                ].map(({ name, label, ex }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={4} lg={4} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
                                            placeholder={ex}
                                        />
                                    </Grid>
                                ))
                            }

                        </Grid>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
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
                                <Typography >รายการประสบการณ์ทำงานของคุณ</Typography>
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

export default Workexp