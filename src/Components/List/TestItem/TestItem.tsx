import { useState } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';
import Divider from '@mui/material/Divider';
import useAuth from '../../../Hooks/useAuth';
import * as api from '../../../Api/api';


export function TestItem({ name, url, teacher, id, views }: any) {

  const { auth } = useAuth()

  const handleClick = async () => {
    window.open(url, "_blank");
    await handleAddViewCount()
  };


  async function handleAddViewCount() {

    try {
      await api.addViewCount(auth, id)

    } catch (error) {

    }
  }

  return (
    <>
      <ListItemButton sx={{ pl: 8 }} onClick={handleClick}>
        <ListItemText primary={
          <Typography component="h1" variant="body1" >
            {name}
          </Typography>
        } secondary={
          <Typography sx={{ opacity: 0.5 }} component="h1" variant="body2" >
            {`${teacher.name}`}
          </Typography>
        } />
        <Typography sx={{ opacity: 0.5 }} component="h1" variant="body2" >
          {`Visualizações: ${views}`}
        </Typography>
      </ListItemButton>
      <Divider></Divider>
    </>
  )
}