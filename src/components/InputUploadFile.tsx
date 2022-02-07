import { Button, Grid, Stack } from '@mui/material'
import React from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import PhotoIcon from '@mui/icons-material/Photo';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import exportedSwal from '../utils/swal';



type AppPros = {
    title : string,
    shotnamefile : string,
    fileData :  ( data :File | undefined ) => void,
    setphoto : boolean,
    files? : File
    urlData : () => void,
} 


function InputUploadFile(props: AppPros) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];


        if(file.type === "image/png" || file.type === "image/jpeg"){
            props.fileData(file)
        }else{
            exportedSwal.actionInfo("กรุณาแนบไฟล์รูปภาพ เฉพาะนามสกุล png , jpage  ")
            props.fileData(undefined)
        }
    }

    return (
        <>
            <Grid container spacing={2} sx={{ pb: 2, border: '1px dashed grey' }} >
                <Grid item xs={12} sm={12} md={12} lg={12}  >
                    {props.title}
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12}  >
                    <Stack spacing={1} direction="row">
                        <Button variant="contained" component="label" startIcon={<UploadIcon />} >
                            {props.files ?  `${props.shotnamefile} | ${props.files.type}` : 'Upload' }
                            <input
                                accept="image/png,image/jpeg"
                                onChange={handleChange}
                                type="file"
                                hidden
                            />
                        </Button>
                        <label htmlFor="contained-button-file">
                            <Button  onClick={props.urlData} startIcon={props.setphoto ? <PhotoIcon /> : <ImageNotSupportedIcon />} variant="contained" color={props.setphoto ? `primary` : `secondary` } component="span">
                                {
                                    props.setphoto ? "ดูไฟล์ต้นฉบับ" : "ไม่พบไฟล์"
                                }
                            </Button>
                        </label>
                    </Stack>
                </Grid>
            </Grid>
            <br />
        </>
    )
}

export default InputUploadFile
