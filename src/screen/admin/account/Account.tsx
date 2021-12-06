import React, { useState, useEffect } from 'react'
import { AppBar, Button, Container, Grid, Paper, TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery, useMutation , useQueryClient} from 'react-query'
import axios from 'axios'
import { systemConfig } from '../../../config/System'
import { RootState } from '../../../store/ConfigureStore'
import { Account, APIAccount_data } from '../../../model/Account'
import { APIResponse_data } from '../../../model/Response'
import exportedSwal from '../../../utils/swal'



function Topic() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const queryClient = useQueryClient()

    const admin = useSelector((state: RootState) => state.admin.data)

    const getAccountAll = async () => {
        const res = await axios.get(`${systemConfig.API}/admin/account/user`, {
            headers: {
                'Authorization': `Bearer ${admin.token}`
            },
        });
        return res.data
    }

    const { data, isLoading, error } = useQuery<APIAccount_data, Error>('admin-account', getAccountAll)


    const actionBanned = (id: number) => {


        axios.get<APIResponse_data>(`${systemConfig.API}/admin/account/bannedUser/${id}`, {
            headers: {
                'Authorization': `Bearer ${admin.token}`
            },
        }).then((res) => {
            if (res.data.bypass) {
                queryClient.invalidateQueries('admin-account')
                exportedSwal.actionSuccess(`เปลี่ยนสถานะ user เรียบร้อย`)
            } else {
                exportedSwal.actionInfo(`เปลี่ยนสถานะ user ไม่สำเร็จ`)
            }
        }).catch((error) => {
            console.log(error)
        });

        //mutate({ id: Date.now(), title, description });
    }

    const columns: GridColDef[] = [
        { field: 'idcard', headerName: 'บัตรประชาชน', width: 150 },
        {
            field: 'banned',
            headerName: 'สถานะการใช้งาน',
            width: 150,
            renderCell: (params) => {
                return (
                    <Typography>
                        {params.row.banned === 0 ? "ปกติ" : "ระงับการใช้งาน"}
                    </Typography>
                );
            }
        },
        {
            field: "view",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => { }}
                        variant="contained"
                    >
                        ดูข้อมูลผู้ใช้งาน
                    </Button>
                );
            }
        },
        {
            field: "checked",
            headerName: "",
            sortable: false,
            width: 160,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => actionBanned(params.row.id)}
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
            width: 200,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => { }}
                        variant="contained"
                        color={`secondary`}
                    >
                        reset password
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
        console.log("test !")
    }, [data?.data])


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
                    <DataGridList columns={columns} model={data?.data} />
                </Container>
            </Paper>
        </>
    )
}


export default Topic
