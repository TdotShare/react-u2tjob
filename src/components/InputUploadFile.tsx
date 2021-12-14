import { Button, Grid, Stack } from '@mui/material'
import React, { useState } from 'react'
import UploadIcon from '@mui/icons-material/Upload';
import PhotoIcon from '@mui/icons-material/Photo';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';



type AppPros = {
    title : string,
    shotnamefile : string,
    fileData :  ( data :File ) => void,
    setphoto : boolean,
    files? : File
    urlData : () => void,
} 


function InputUploadFile(props: AppPros) {

    //const [files, setfile] = useState<File>()
    const [photo] = useState(props.setphoto)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const target = e.target as HTMLInputElement;
        const file: File = (target.files as FileList)[0];

        props.fileData(file)


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
                            {props.files ?

                                props.files.name.length > 20 ? `${props.shotnamefile}" | "${props.files.type}` : props.files.name

                                :

                                'Upload'
                            }
                            <input
                                accept="image/*"
                                onChange={handleChange}
                                type="file"
                                hidden
                            />
                        </Button>
                        <label htmlFor="contained-button-file">
                            <Button  onClick={props.urlData} startIcon={photo ? <PhotoIcon /> : <ImageNotSupportedIcon />} variant="contained" color={photo ? `primary` : `secondary` } component="span">
                                {
                                    photo ? "ดูไฟล์ต้นฉบับ" : "ไม่พบไฟล์"

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
