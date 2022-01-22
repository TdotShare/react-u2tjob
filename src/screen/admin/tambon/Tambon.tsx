import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import Paperbase from '../../../components/template/Paperbase'
import { useDispatch, useSelector } from 'react-redux'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'

import exportedSwal from '../../../utils/swal'
import { GridColDef } from '@mui/x-data-grid'
import { RootState } from '../../../store/ConfigureStore'
import LoadingData from '../../../components/LoadingData'
import { useQuery, useQueryClient } from 'react-query'
import { APITambon_data } from '../../../model/Tambon'
import exportedAPITambon from '../../../utils/api/Tambon'
import DataGridList from '../../../components/DataGridList'

import { useHistory } from 'react-router-dom'


function Tambon() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const queryClient = useQueryClient()
    const history = useHistory()

    const admin = useSelector((state: RootState) => state.admin.data)

    const { data, isLoading } = useQuery<APITambon_data, Error>('tambon-data', async () => exportedAPITambon.getTambonAll(admin.token))

    const columns: GridColDef[] = [
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            onClick={() => history.push(`${routerPathProtectedAdmin.TambonUpdate}/${params.row.id}`)}
                            variant="contained"
                        >
                            แก้ไขข้อมูล
                        </Button>
                        <div style={{ margin: 5 }}></div>
                        <Button
                            onClick={() => actionDeleteTambon(params.row.id, params.row.name)}
                            variant="contained"
                            color='secondary'
                        >
                            Delete
                        </Button>
                    </>
                );
            }
        },
        { field: 'id', headerName: 'ไอดี', width: 150 },
        { field: 'name', headerName: 'ชื่อตำบล', width: 200 },
        { field: 'create_at', headerName: 'สร้างเมื่อ', width: 200 },
        { field: 'update_at', headerName: 'แก้ไขเมื่อ', width: 200 },

    ];

    const dispatch = useDispatch()
    const [title] = useState<string>("ตำบล")

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.get('name')) {
            exportedSwal.actionInfo(`กรุณากรอกข้อมูลให้ครบ !`)
            return
        }

        let dataPost = {
            name: data.get('name'),
        }

        let resData = await exportedAPITambon.createTambon(dataPost, admin.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('tambon-data')
            exportedSwal.actionSuccess(`เพิ่มข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }
    }


    const actionDeleteTambon = async (id: number, name: string) => {

        let confirmDelete = await exportedSwal.confirmDelete(name)
        if (confirmDelete) {

            let data = await exportedAPITambon.deleteTambon(id, admin.token)

            if (data.bypass) {
                queryClient.invalidateQueries('tambon-data')
                exportedSwal.actionSuccess(`ลบข้อมูลเรียบร้อย !`)
            } else {
                exportedSwal.actionInfo(data.message)
            }

        }


    }

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
                                    { name: "name", label: "ชื่อตำบล" },
                                ].map(({ name, label }, index) => (
                                    <Grid key={index} item xs={12} sm={12} md={12} lg={12} >
                                        <TextField
                                            fullWidth
                                            required
                                            name={name}
                                            label={label}
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
                                <Typography >รายการตำบลทั้งหมด</Typography>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Container >
                    {
                        isLoading ?

                            <LoadingData />

                            :

                            <DataGridList columns={columns} model={data?.data} />
                    }

                </Container>
            </Paper>
        </>
    )
}

export default Tambon