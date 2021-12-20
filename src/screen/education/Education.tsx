import React, { useEffect, useState } from 'react'
import { AppBar, Box, Button, Container, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, TextField, Toolbar, Typography } from '@mui/material'
import Paperbase from '../../components/template/Paperbase'
import { useDispatch, useSelector } from 'react-redux'
import { setTitle } from '../../store/reducer/TitleHeader'
import { setBreadCms } from '../../store/reducer/Breadcrumbs'
import { routerPathProtectedUser } from '../../router/RouterPath'
import { useHistory } from 'react-router-dom'
import DataGridList from '../../components/DataGridList'
import { GridColDef } from '@mui/x-data-grid'
import exportedSwal from '../../utils/swal'

import { useQuery, useQueryClient } from 'react-query'
import exportedAPIEducation from '../../utils/api/Education'
import { RootState } from '../../store/ConfigureStore'
import { APIEducation_data } from '../../model/Education'
import LoadingData from '../../components/LoadingData'

function Education() {
    return (
        <Paperbase children={Pages()} />
    )
}


function Pages() {

    const queryClient = useQueryClient()


    const [degree] = useState([
        "ประถมศึกษา",
        "มัธยมศึกษาตอนต้น",
        "มัธยมศึกษาตอนปลาย",
        "ประกาศนียบัตรวิชาชีพ",
        "ประกาศนียบัตรวิชาชีพชั้นสูง",
        "อนุปริญญา",
        "ปริญญาตรี",
        "ปริญญาโท",
        "ปริญญาเอก"
    ])

    const [degreeName, setDegreeName] = useState<number>(0)

    const handleChange = (event: SelectChangeEvent) => {
        setDegreeName(parseInt(event.target.value));
    };

    const user = useSelector((state: RootState) => state.user.data)

    const { data, isLoading } = useQuery<APIEducation_data, Error>('education-data', async () => exportedAPIEducation.getEducation(user.token))

    const columns: GridColDef[] = [
        {
            field: 'degree_id', 
            headerName: 'ระดับวุฒิ',
            width : 200 , 
            renderCell: (params) => {
                return (
                    <Typography>
                        {degree[params.row.degree_id]}
                    </Typography>
                );
            }
        },
        { field: 'major', headerName: 'สาขาวิชา' , width : 200  },
        { field: 'gpa', headerName: 'gpa' },
        { field: 'university', headerName: 'จบจาก' , width : 200  },
        { field: 'timeend', headerName: 'ระยะเวลา' },
        {
            field: "delete",
            headerName: "",
            sortable: false,
            width: 130,
            renderCell: (params) => {
                return (
                    <Button
                        onClick={() => actionDeleteEducation(params.row.id)}
                        variant="contained"
                        color='secondary'
                    >
                        Delete
                    </Button>
                );
            }
        },
    ];

    const history = useHistory()
    const dispatch = useDispatch()
    const [title] = useState<string>("ประวัติการศึกษา")

    const actionDeleteEducation = async (id: number) => {

        let data = await exportedAPIEducation.deleteEducation(id, user.token)

        if (data.bypass) {
            queryClient.invalidateQueries('education-data')
            exportedSwal.actionSuccess(`ลบข้อมูลเรียบร้อย !`)
        } else {
            exportedSwal.actionInfo(`ลบข้อมูลไม่สำเร็จ !`)
        }

    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        if(!data.get('major') || !data.get('gpa') || !data.get('university') || !data.get('timeend')  ){
            exportedSwal.actionInfo(`กรุณากรอกข้อมูลให้ครบ !`)
            return
        }

        let dataPost = {
            degree_id: degreeName,
            major: data.get('major'),
            gpa: data.get('gpa'),
            university: data.get('university'),
            timeend: data.get('timeend'),
        }

        let resData = await exportedAPIEducation.createEducation(dataPost, user.token)

        if (resData.bypass) {
            queryClient.invalidateQueries('education-data')
            exportedSwal.actionSuccess(`เพิ่มข้อมูลเรียบร้อย`)
        } else {
            exportedSwal.actionInfo(resData.message)
        }

        exportedSwal.actionSuccess("เพิ่มข้อมูล ประวัติการศึกษา เรียบร้อย !")

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
                                <Button onClick={() => history.goBack()} variant="contained" sx={{ mr: 1 }}>ย้อนกลับ</Button>
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
                            <Grid item xs={12} sm={12} md={4} lg={4} >
                                <TextField
                                    fullWidth
                                    required
                                    name="major"
                                    label="สาขาวิชา"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} >
                                <TextField
                                    fullWidth
                                    required
                                    name="gpa"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    label="GPA"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4} >
                                <TextField
                                    fullWidth
                                    required
                                    name="university"
                                    label="จบจาก โรงเรียน/มหาวิทยาลัย"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <TextField
                                    fullWidth
                                    required
                                    placeholder='2552 - 2558'
                                    name="timeend"
                                    label="ระยะเวลา"
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12} >
                                <FormControl fullWidth >
                                    <InputLabel id="demo-simple-select-label">เลือกระดับการศึกษา</InputLabel>
                                    <Select
                                        onChange={handleChange}
                                        labelId="demo-simple-select-label"
                                        name={`gs_university_id`}
                                        value={degreeName.toString()}
                                        label="เลือกระดับการศึกษา"
                                    >
                                        {degree.map((item, index) => (
                                            <MenuItem key={index} value={index}>{item}</MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
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
                                <Typography >รายการประวัติการศึกษาของคุณ</Typography>
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

export default Education