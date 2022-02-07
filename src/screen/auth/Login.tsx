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
import { routerPathProtectedAdmin, routerPathProtectedUser, routerPathPublic } from '../../router/RouterPath';
import axios from 'axios';
import { APIAuth_data } from '../../model/User';
import exportedSwal from '../../utils/swal';
import { addUser, setLoginSuccess } from '../../store/reducer/User';
import { useDispatch } from 'react-redux';
import { addAdmin } from '../../store/reducer/Admin';

import BookIcon from '@mui/icons-material/Book';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import { exportedColor } from '../../utils/color';

const theme = createTheme({
    palette: exportedColor,
    typography: {
        fontFamily: "'Mitr', sans-serif;",
    }
});

export default function Login() {

    const history = useHistory()
    const dispatch = useDispatch()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = event.target as typeof event.target & {
            username: { value: string };
            password: { value: string };
        };

        let url = ""

        if (Number.isFinite(parseInt(data.username.value))) {
            url = `${systemConfig.API}/auth/login`
        } else {
            url = `${systemConfig.API}/auth/login_ird`
        }

        axios.post<APIAuth_data>(url, {
            "username": data.username.value,
            "password": data.password.value
        }).then(res => {
            if (res.data.bypass) {

                if (res.data.data.admin) {

                    dispatch(addAdmin({
                        email: res.data.data.email,
                        username: res.data.data.username,
                        fullname: `${res.data.data.firstname} ${res.data.data.surname}`,
                        token: `${res.data.data.token}`
                    }))
                    dispatch(setLoginSuccess())

                    history.push(routerPathProtectedAdmin.Dashboard)

                } else {

                    dispatch(addUser({
                        user_id: res.data.data.id,
                        idcard: res.data.data.idcard,
                        token: `${res.data.data.token}`
                    }))

                    dispatch(setLoginSuccess())

                    history.push(routerPathProtectedUser.Job)
                }

            } else {
                exportedSwal.actionInfo(`${res.data.message}`)
            }

        }).catch(err => {
            console.error(err);
        })

    };


    return (
        <ThemeProvider theme={theme}>
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
                    <Typography sx={{ 'textAlign': 'center' }} component="h1" variant="h5">
                        {systemConfig.NameFull}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="กรอกบัตรประชาชน"
                            name="username"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="รหัสผ่าน"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            startIcon={<LoginIcon />}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            เข้าสู่ระบบ
                        </Button>
                    </Box>
                    <Button
                        onClick={() => history.push(routerPathPublic.Register)}
                        type="submit"
                        fullWidth
                        startIcon={<AppRegistrationIcon />}
                        variant="contained"
                    >
                        สมัครสมาชิก
                    </Button>
                    <Button
                        sx={{ mt: 2 }}
                        onClick={() => window.open(`${systemConfig.API}/manual`, '_blank')}
                        type="submit"
                        color='secondary'
                        fullWidth
                        variant="contained"
                        startIcon={<BookIcon />}
                    >
                        คู่มือการใช้งาน
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}