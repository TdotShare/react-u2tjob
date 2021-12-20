import React, { useState, useEffect } from 'react'
import { AppBar, Button, Container, Grid, Paper, Toolbar, Typography } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import Paperbase from '../../../components/template/Paperbase'
import { routerPathProtectedAdmin } from '../../../router/RouterPath'
import { setBreadCms } from '../../../store/reducer/Breadcrumbs'
import { setTitle } from '../../../store/reducer/TitleHeader'
import exportedAPITopic from '../../../utils/api/Topic'
import { useQuery } from 'react-query'
import { RootState } from '../../../store/ConfigureStore'
import LoadingData from '../../../components/LoadingData'
import { APIChkecedJob_data } from '../../../model/Checked'
import { GridColDef } from '@mui/x-data-grid'
import DataGridList from '../../../components/DataGridList'
import { systemConfig } from '../../../config/System'

import VisibilityIcon from '@mui/icons-material/Visibility';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

function TopicUpdate() {
    return (
        <Paperbase children={Pages()} />
    )
}

function Pages() {


    const history = useHistory()
    const admin = useSelector((state: RootState) => state.admin.data)
    const { id }: any = useParams();

    const dispatch = useDispatch()
    const [title] = useState<string>(`ตรวจสอบผูัสมัคร id - ${id}`)


    const { data, isLoading } = useQuery<APIChkecedJob_data, Error>('checked-data', async () => exportedAPITopic.getApplyUserAll(id, admin.token))

    useEffect(() => {
        dispatch(setTitle(title))
        dispatch(setBreadCms([
            { value: "หน้าหลัก", link: routerPathProtectedAdmin.Dashboard, active: false, },
            { value: "เปิดรอบสมัครงาน", link: routerPathProtectedAdmin.Topic, active: false, },
            { value: `ตรวจสอบผู้สมัคร - ${id}`, link: "", active: true },
        ]))
        // eslint-disable-next-line 
    }, [])

    const actionUrlOpen = (code: string, filename: string | undefined) => {
        if (filename) {
            window.open(`${systemConfig.ImagesPath}/${id}/${code}/${filename}`, '_blank')
        }
    }

    const actionAllDownload = () =>{
        data?.data.forEach(el => {
            window.open(`${systemConfig.API}/pdf_download_qgadwh/${el.id}`, '_blank')
        });
    }
    const columns: GridColDef[] = [
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            width: 250,
            renderCell: (params) => {
                return (
                    <>
                        <Button
                            startIcon={<VisibilityIcon />}
                            onClick={() => history.push(`${routerPathProtectedAdmin.Account}/${params.row.user_id}`)}
                            variant="contained"
                        >
                            ดูข้อมูลผูัสมัคร
                        </Button>
                        <div style={{ margin: 5 }}></div>
                        <Button
                            startIcon={<PictureAsPdfIcon />}
                            onClick={() => { window.open(`${systemConfig.API}/pdf_qazxsw/${params.row.id}`, '_blank') }}
                            variant="contained"
                        >
                            PDF
                        </Button>

                    </>
                );
            }
        },
        { field: 'idcard', headerName: 'บัตรประชาชน', width: 150 },
        { field: 'fullname', headerName: 'ชื่อผูัสมัคร', width: 200 },
        {
            field: 'evid0', headerName: 'e0', renderCell: (params) => {
                return (<>{
                    params.row.evid0 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid0)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid1', headerName: 'e1', renderCell: (params) => {
                return (<>{
                    params.row.evid1 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid1)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid2', headerName: 'e2', renderCell: (params) => {
                return (<>{
                    params.row.evid2 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid2)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid3', headerName: 'e3', renderCell: (params) => {
                return (<>{
                    params.row.evid3 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid3)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid4', headerName: 'e4', renderCell: (params) => {
                return (<>{
                    params.row.evid4 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid4)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid5', headerName: 'e5', renderCell: (params) => {
                return (<>{
                    params.row.evid5 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid5)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid6', headerName: 'e6', renderCell: (params) => {
                return (<>{
                    params.row.evid6 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid6)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid7', headerName: 'e7', renderCell: (params) => {
                return (<>{
                    params.row.evid7 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid7)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        {
            field: 'evid8', headerName: 'e8', renderCell: (params) => {
                return (<>{
                    params.row.evid8 ? <Button
                        onClick={() => actionUrlOpen(params.row.code, params.row.evid8)}
                        variant="contained"
                    >
                        ดูเอกสารแนบ
                    </Button> : ""
                }</>)
            }, width: 150
        },
        { field: 'create_at', headerName: 'สมัครเมื่อ', width: 200 },
        { field: 'work_area_one', headerName: 'พื้นที่ปฏิบัติงาน ลำดับที่ 1', width: 200 },
        { field: 'work_area_two', headerName: 'พื้นที่ปฏิบัติงาน ลำดับที่ 2', width: 200 },
        { field: 'type_job', headerName: 'ประเภทการสมัคร', width: 250 },
    ];

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
                    <div style={{ marginLeft: 20, marginTop: 15 }}>
                        {
                            [
                                "e0 : ภาพถ่ายผู้สมัคร",
                                "e1 : สำเนาปริญญาบัตร หรือ หนังสือรับรองคุณวุติ",
                                "e2 : สำเนาใบรายงานผลการศึกษา (Transcript)",
                                "e3 : สำเนาหลักฐานการเปลี่ยนชื่อสกุล (ถ้ามี)",
                                "e4 : สำเนาบัตรประจำตัวประชาชน",
                                "e5 : สำเนาทะเบียนบ้าน",
                                "e6 : สำเนาหลักฐานการเกณฑ์ทหาร (ถ้ามี)",
                                "e7 : ใบรับรองพื้นที่",
                                "e8 : เอกสารอื่นๆ",
                            ].map((el, index) => (
                                <div key={index} >{el}<br /></div>
                            ))
                        }
                    </div>
                    {
                        isLoading ?


                            <LoadingData />

                            :
                            <>
                                <br />
                                <Button
                                    style={{ marginLeft: 20 }}
                                    startIcon={<PictureAsPdfIcon />}
                                    onClick={() => actionAllDownload()}
                                    variant="contained"
                                >
                                    Export PDF All (โหลดแบบแยกไฟล์)
                                </Button>
                                <DataGridList excel={true} columns={columns} model={data?.data} />
                            </>


                    }
                </Container>
            </Paper>
        </>
    )
}


export default TopicUpdate
