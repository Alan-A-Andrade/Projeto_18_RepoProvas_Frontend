import { Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';

import useAuth from '../../Hooks/useAuth';
import * as services from "../../Services/Services"
import { useLocation } from 'react-router-dom';
import * as api from '../../Api/api';
import { useNavigate } from 'react-router-dom';



export default function Redirect() {


  const { auth, logIn } = useAuth()
  const navigate = useNavigate()
  const search = useLocation().search;
  const code = new URLSearchParams(search).get('code') as string;

  async function fetchData() {
    try {

      const data = await api.signUpGitHub(code)
      logIn(data.data)
      navigate('/repository')
    }
    catch {
      console.log(console.error)
    }
  }


  useEffect(() => {
    fetchData()
  }, []);


  return (
    <Container component="main" maxWidth="xl">
      <Box sx={{
        height: '60vh',
        marginTop: 0,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Typography component="h1" variant="h3">Redirecting</Typography>
      </Box>
    </Container>
  );
}