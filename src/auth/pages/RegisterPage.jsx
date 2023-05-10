import { Link as LoginLink } from 'react-router-dom'
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material";
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreateAccount } from '../../store/auth/thunks';



const formData = {
    email: '',
    password: '',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe de tener un @*'],
    password: [(value) => value.length >= 6, 'El password debe de tener mas de 6 letras*'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio*'],
}
export const RegisterPage = () => {

    const dispatch = useDispatch()

    const [formSubmitted, setFormSubmitted] = useState(false)

    const { onInputChange, displayName, email, password, formState,
        emailValid, passwordValid, displayNameValid, isFormValid } = useForm(formData, formValidations)


    const { status, errorMessage } = useSelector(state => state.auth)

    const isCheckingAutenticated = useMemo(() => status === 'checking', [status])
    // console.log(emailValid, passwordValid, displayNameValid)

    const onSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true)

        if (!isFormValid) return;
        dispatch(startCreateAccount(formState))



    }

    return (
        <AuthLayout title='Crear cuenta'>
            <h1>Form Valid: {isFormValid ? 'valido' : 'incorrecto'}</h1>
            <form onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <Grid container>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Nombre Completo"
                            type="text"
                            placeholder="Edwin Lopez"
                            name='displayName'
                            onChange={onInputChange}
                            value={displayName}
                            fullWidth
                            error={!!displayNameValid && formSubmitted}
                            helperText={displayNameValid}

                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="Correo"
                            type="text"
                            placeholder="correo@gmail.com"
                            name='email'
                            onChange={onInputChange}
                            value={email}
                            fullWidth
                            error={!!emailValid && formSubmitted}
                            helperText={emailValid}

                        />
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2 }}>
                        <TextField
                            label="contraseña"
                            type="password"
                            placeholder="contraseña"
                            name='password'
                            onChange={onInputChange}
                            value={password}
                            fullWidth
                            error={!!passwordValid && formSubmitted}
                            helperText={passwordValid}

                        />
                    </Grid>
                    <Grid container spacing={2} sx={{ mb: 2, mt: 1 }}>
                        {
                            errorMessage &&
                            <Grid item xs={12}>
                                <Alert severity='error'>
                                    {errorMessage}
                                </Alert>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAutenticated}
                                type='submit'
                                variant="contained"
                                fullWidth>
                                Crear cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid
                        container
                        direction="row"
                        justifyContent="end"
                    >
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link component={LoginLink} color="inherit" to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>

    )
}
