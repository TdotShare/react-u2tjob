import { Button, Grid, Stack, styled } from '@mui/material'
import React, { useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import PhotoIcon from '@mui/icons-material/Photo';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const Input = styled('input')({
    display: 'none',
});


type AppPros = {
    title : string
    fileData :  (data :File ) => void,
} 


function InputUploadFile( props : AppPros) {

    const [files, setfile] = useState<File>()
    const [photo] = useState(false)
    const [namefile, setNameFile] = useState('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        if (file === undefined) {
            setfile(undefined)
            setNameFile('')

        } else {
            setfile(file)
            setNameFile(file.name.length > 20 ? `${"ไฟล์ภาพถ่ายผู้สมัคร | "}${file.type}` : file.name)

        }
    
        props.fileData(file)


    }

    return (
        <>
        <Grid container spacing={2} sx={{ pb: 2 ,  border: '1px dashed grey' }} >
            <Grid item xs={12} sm={12} md={12} lg={12}  >
                {props.title}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12}  >
                <Stack spacing={1} direction="row">
                    <label htmlFor="contained-button-file">
                        <Input onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e)} accept="image/*" id="contained-button-file" type="file" />
                        <Button startIcon={<UploadIcon />} variant="contained" component="span">
                            {files ?

                                namefile

                                :


                                'Upload'
                            }
                        </Button>
                    </label>
                    <label htmlFor="contained-button-file">
                        <Input accept="image/*" id="contained-button-file" type="file" />
                        <Button startIcon={photo ? <PhotoIcon /> : <ImageNotSupportedIcon />} variant="contained" color="secondary" component="span">
                            {
                                photo ? "ดูไฟล์ต้นฉบับ" : "ไม่พบไฟล์"

                            }
                        </Button>
                    </label>
                </Stack>
            </Grid>
        </Grid>
        <br/>
        </>
    )
}

export default InputUploadFile
