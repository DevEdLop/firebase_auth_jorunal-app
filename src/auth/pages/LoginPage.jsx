
import { Link as registerLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { Google } from "@mui/icons-material";

import { AuthLayout } from '../layout/AuthLayout';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../../hooks';

import { startGoogleSingnIn, startLoginWithEmailAndPassword } from '../../store';
import { useMemo } from 'react';

const formData = { email: '', password: '' }
export const LoginPage = () => {

    const { status, displayName, errorMessage } = useSelector((state) => state.auth)

    const dispatch = useDispatch()

    const {
        onInputChange,
        email,
        password } = useForm(formData)


    const isAuthenticating = useMemo(() => status === 'checking', [status])




    const onSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password })
        dispatch(startLoginWithEmailAndPassword({ email, password }))
    }


    const onGoogleSignIn = () => {

        console.log('OnGoogleSignIn')
        dispatch(startGoogleSingnIn())

    }

    return (
        <AuthLayout title='Login'>
            <form onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="correo"
                            placeholder="correo@gmail.com"
                            name='email'
                            type="email"
                            onChange={onInputChange}
                            value={email}
                            fullWidth

                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="contraseña"
                            placeholder="contraseña"
                            name='password'
                            type="password"
                            onChange={onInputChange}
                            value={password}
                            fullWidth

                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>

                        {
                            errorMessage &&
                            <Grid item xs={12} >
                                <Alert severity='error'>
                                    {errorMessage}
                                </Alert>
                            </Grid>
                        }
                        {
                            status === 'authenticated' &&
                            <Grid item xs={12} >
                                <Alert severity='success'>
                                    Bienvenido: {displayName}
                                </Alert>
                            </Grid>
                        }
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type='submit'
                                variant="contained"
                                fullWidth>
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                variant="contained"
                                fullWidth
                                onClick={onGoogleSignIn}
                            >
                                <Google />
                                <Typography sx={{ ml: 1 }}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >
                        <Link component={registerLink} color="inherit" to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
