import React, { useState, useEffect } from 'react'
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import DataGridList from '../../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import { useQuery, useQueryClient } from 'react-query'
import { RootState } from '../../../store/ConfigureStore'
import { APIAccount_data } from '../../../model/Account'
import exportedSwal from '../../../utils/swal'
import exportedAPIAccount from '../../../utils/api/Account'




function Account() {

    const queryClient = useQueryClient()
    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("ผู้ใช้งานระบบ")

    const admin = useSelector((state: RootState) => state.admin.data)


    const { data } = useQuery<APIAccount_data, Error>('admin-account', async () => exportedAPIAccount.getAccountAll(admin.token))


    const actionBanned = async (id: number) => {

        let data = await exportedAPIAccount.bannedUser(id, admin.token)

        if (data.bypass) {
            queryClient.invalidateQueries('admin-account')
            exportedSwal.actionSuccess(`เปลี่ยนสถานะ user เรียบร้อย`)
        } else {
            exportedSwal.actionInfo(`เปลี่ยนสถานะ user ไม่สำเร็จ`)
        }

    }

    const actionResetPassword = async (id: number) => {

        let data = await exportedAPIAccount.resetPassword(id, admin.token)

        if (data.bypass) {
            queryClient.invalidateQueries('admin-account')
            exportedSwal.actionSuccess(`เปลี่ยนรหัสผ่านใหม่ user (123456) เรียบร้อย `)
        } else {
            exportedSwal.actionInfo(`เปลี่ยนรหัสผ่านใหม่ user ไม่สำเร็จ`)
        }

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
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 400,
            renderCell: (params) => {
                return (
                    <>
                    <Button
                        onClick={() => history.push(`${routerPathProtectedAdmin.Account}/${params.row.id}`) }
                        variant="contained"
                    >
                        ดูข้อมูลผู้ใช้งาน
                    </Button>
                    <div style={{ margin: 5 }}></div>
                    <Button
                        onClick={() => actionBanned(params.row.id)}
                        variant="contained"
                    >
                        {params.row.banned === 0 ? "ระงับการใช้งาน" : "ปลดการระงับใช้งาน"}
                    </Button>
                    <div style={{ margin: 5 }}></div>
                    <Button
                        onClick={() => actionResetPassword(params.row.id)}
                        variant="contained"
                        color={`secondary`}
                    >
                        reset password
                    </Button>
                    </>
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


export default Account
