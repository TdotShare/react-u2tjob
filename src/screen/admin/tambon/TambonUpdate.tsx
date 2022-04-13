import React, { useState, useEffect } from 'react'
import { AppBar, Box, Button, Container, Grid,  Paper,  TextField, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import exportedSwal from '../../../utils/swal'
import exportedAPITambon from '../../../utils/api/Tambon'

import { useQuery, useQueryClient } from 'react-query'
import { APITopic_data } from '../../../model/Topic'
import { RootState } from '../../../store/ConfigureStore'
import LoadingData from '../../../components/LoadingData'




function TambonUpdate() {

    const queryClient = useQueryClient()
    const admin = useSelector((state: RootState) => state.admin.data)
    const { id }: any = useParams();

    const { data, isLoading  } = useQuery<APITopic_data, Error>(`admin-tambon-view-${id}`, async () => exportedAPITambon.getTambon(id, admin.token))

    const dispatch = useDispatch()
    const [title] = useState<string>(`แก้ไขข้อมูล id - ${id}`)

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: "ตำบล", link: routerPathProtectedAdmin.Tambon, active: false, },
            { value: id, link: "", active: true, }
        ]))
        // eslint-disable-next-line 
    }, [])



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (formData.get('name') === "") {
            exportedSwal.actionInfo("กรุณากรอกข้อมูลให้ครบ !")
            return
        }

        let dataPost = {
            "tambon_id": id,
            "name" : formData.get('name')
        }

        let resData = await exportedAPITambon.updateTambon(dataPost, admin.token)

        if (resData.bypass) {
            queryClient.invalidateQueries(`admin-tambon-view-${id}`)
            exportedSwal.actionSuccess(`แก้ไขข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }

    }


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
                        {
                            isLoading
                                ?
                                <LoadingData />
                                :
                                <>
                                    <Grid container spacing={2} columns={12} >
                                        {
                                            [
                                                { name: "name", label: "ชื่อตำบล", ty: "text", value: data?.data.name },
                                            ].map(({ name, label, ty, value }, index) => (
                                                <Grid key={index} item xs={12} sm={12} md={6} lg={6} >
                                                    <TextField
                                                        fullWidth
                                                        required
                                                        defaultValue={`${value}`}
                                                        name={name}
                                                        label={label}
                                                        type={ty}
                                                    />
                                                </Grid>
                                            ))
                                        }
                                    </Grid>
                                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} >
                                        แก้ไขข้อมูล
                                    </Button></>
                        }

                    </Box>
                </Container>
            </Paper>
        </>
    )
}


export default TambonUpdate
