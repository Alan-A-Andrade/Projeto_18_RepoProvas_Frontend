import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import * as api from '../../Api/api';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';


export default function SignIn() {

  const { auth, logIn } = useAuth()

  const navigate = useNavigate();

  useEffect(() => {
    if (auth) {
      navigate("/repository");
    }
  }, []);

  const [signIn, setSignIn] = useState({
    email: "",
    password: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();


    try {
      const token: any = await api.signIn({
        email: signIn.email,
        password: signIn.password
      })

      logIn(token)
      navigate('/repository')
    } catch (error) {

      console.log(error)

    }
  }

  function handleFormInput(event: any) {
    setSignIn({ ...signIn, [event.target.name]: event.target.value })
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
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h3">
          Entrar
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid item xs={12} sm={6}>
            <Button
              color="secondary"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 0 }}
            >
              <Typography
                component="h1"
                variant="button"
              >
                Entre com GitHub
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
                value={signIn.email}
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
                value={signIn.password}
                onChange={handleFormInput}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} alignContent="center">
            <Grid item xs={12} sm={6}>
              <Typography
                component="div"
                variant="subtitle2"
                sx={{ mt: 4, mb: 2 }}
                color="secondary"
                textAlign="left"
                onClick={() => { navigate('/signUp') }}
              >
                Primeira vez? Clique aqui!
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
              >
                <Typography
                  component="h1"
                  variant="button"
                >
                  Entrar
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container >
  );
}