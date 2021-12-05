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
import { routerPathProtectedUser , routerPathPublic } from '../../router/RouterPath';


const theme = createTheme({
    typography: {
        fontFamily: "'Mitr', sans-serif;",
    }
});

export default function Login() {

    const history = useHistory()

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        history.replace(`${routerPathProtectedUser.Job}`)

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
                    <Typography component="h1" variant="h5">
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
                            sx={{ mt: 3, mb: 2 }}
                        >
                            เข้าสู่ระบบ
                        </Button>
                    </Box>
                    <Button
                        onClick={() => history.push(routerPathPublic.Register)}
                        type="submit"
                        fullWidth
                        variant="contained"
                    >
                        สมัครสมาชิก
                    </Button>
                </Box>
            </Container>
        </ThemeProvider>
    );
}