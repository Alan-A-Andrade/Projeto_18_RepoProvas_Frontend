import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import PersonPinRoundedIcon from '@mui/icons-material/PersonPinRounded';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import * as api from '../../Api/api';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@emotion/react";
import { errServer } from '../../modals/errModal';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignUp() {

  const theme = useTheme()
  const [error, setError] = useState({})
  const navigate = useNavigate();
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (signUpForm.password !== signUpForm.confirmPassword) {
      const inputProps: any = {}
      inputProps.error = true;
      inputProps.helperText = 'Senhas precisam coincidir';
      setError(inputProps)
      return
    }

    try {
      setLoading(true)
      await api.signUp({
        email: signUpForm.email,
        password: signUpForm.password
      })
      setLoading(false)
      navigate('/')
    } catch (error) {
      errServer(theme, "Something went wrong, try again later!")
      setLoading(false)

    }
  }

  function handleFormInput(event: any) {
    setSignUpForm({ ...signUpForm, [event.target.name]: event.target.value })
    setError({})
  }

  async function handleSignInGitHub() {

    window.location.replace(api.urlOAuthGitHub)

  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      ><Box
        sx={{
          marginTop: 0,
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <PersonPinRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h3">
            Cadastro
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              onClick={handleSignInGitHub}
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 0 }}
            >
              <GitHubIcon sx={{ mr: 1, bgcolor: 'secondary.main' }} />
              <Typography
                sx={{ mt: 0.2 }}
                component="h1"
                variant="button"
              >
                Entrar com GitHub
              </Typography>
            </Button>
          </Grid>
          <Grid item sx={{ mt: 4, mb: 4 }}>
            <Divider>ou</Divider>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                id="email"
                label="Seu email"
                name="email"
                autoComplete="email"
                InputLabelProps={{
                  color: "secondary"
                }}
                value={signUpForm.email}
                onChange={handleFormInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                InputLabelProps={{
                  color: "secondary"
                }}
                value={signUpForm.password}
                onChange={handleFormInput}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...error}
                variant="filled"
                required
                fullWidth
                name="confirmPassword"
                label="Confirme sua senha"
                type="password"
                id="confirmPassword"
                autoComplete="confirmPassword"
                InputLabelProps={{
                  color: "secondary"
                }}
                value={signUpForm.confirmPassword}
                onChange={handleFormInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignContent="center">
            <Grid item xs={12} sm={6}>
              <Typography
                component="div"
                variant="subtitle2"
                sx={{ mt: 2, mb: 2 }}
                color="secondary"
                textAlign="left"
                onClick={() => { navigate('/') }}
              >
                Já tem cadastro? Clique aqui!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 2, mb: 2 }}
              >
                <Typography
                  component="h1"
                  variant="button"
                >
                  {loading
                    ? "Carregando"
                    : "Cadastrar"
                  }
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}