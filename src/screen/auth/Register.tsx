import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { systemConfig } from '../../config/System';
import { useHistory } from 'react-router-dom';
//import { routerPathProtectedUser, routerPathProtectedAdmin, routerPathPublic } from '../../router/RouterPath';


import axios from 'axios';
import { APIAuth_data } from '../../model/User';


export default function Register() {

    const history = useHistory()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const target = e.target as typeof e.target & {
            idcard: { value: number };
            password: { value: string };
        };

        if (!target.idcard.value || !target.password.value) {
            console.log("กรุณากรอกข้อมูลให้ครบ")
            return
        }

        axios.post<APIAuth_data>(`${systemConfig.API}`).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })

    }

    return (
        <ThemeProvider theme={createTheme({
            typography: {
                fontFamily: "'Mitr', sans-serif;",
            }
        })}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {systemConfig.NameFull}
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            type="number"
                            fullWidth
                            label="กรอกบัตรประชาชน"
                            name="idcard"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="password"
                            label="รหัสผ่าน"
                            type="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            สมัครสมาชิก
                        </Button>
                    </Box>
                    <Button
                        onClick={() => history.goBack()}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        กลับ
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}