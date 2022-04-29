import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import useAuth from '../../../../Hooks/useAuth';
import * as api from '../../../../Api/api';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Box from '@mui/material/Box';

export function TestItemTeacher({ name, url, discipline, id, views }: any) {

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
            {`${discipline}`}
          </Typography>
        } />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography sx={{ opacity: 0.1 }} component="h1" variant="body2" >
            <VisibilityIcon />
          </Typography>
          <Typography sx={{ opacity: 0.5 }} component="h1" variant="body2" >
            {`${views}`}
          </Typography>
        </Box>
      </ListItemButton>
      <Divider></Divider>
    </>
  )
}