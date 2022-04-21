import Container from '@mui/material/Container';
import TopMenu from '../../Components/TopMenu/TopMenu';
import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { useTheme } from '@emotion/react';




export default function Homepage() {

  const [open, setOpen] = React.useState(false);
  const [color, setColor] = React.useState({})

  const theme: any = useTheme()

  console.log(theme)

  const handleClick = () => {
    setOpen(!open);
    setColor(!open
      ? { color: '#3F61D7', }
      : {})
  };

  return (
    <Container component="main" maxWidth="xl">
      <TopMenu />
      <Container component="main" maxWidth="xl" sx={{
        marginTop: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>

        <List
          sx={{ width: '100%', maxWidth: "none", bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Repositório
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemText primary={<Typography component="h1" variant="body1" >
              Item 1
            </Typography>
            } />
          </ListItemButton>
          <Divider></Divider>
          <ListItemButton>
            <ListItemText primary={<Typography component="h1" variant="body1" >
              Item 2
            </Typography>
            } />
          </ListItemButton>
          <Divider></Divider>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary={<Typography sx={color} component="h1" variant="body1" >
              Item 3
            </Typography>
            } />
            {open ? <ExpandLess color="secondary" /> : <ExpandMore sx={{ color: theme.palette.mode === 'dark' ? '#ffffff' : '#111111', }} />}
          </ListItemButton>
          <Divider></Divider>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItemButton sx={{ pl: 4 }}>
                <ListItemText primary="Nested Item" />
              </ListItemButton>
            </List>
          </Collapse>
          <ListItemButton>
            <ListItemText primary={<Typography component="h1" variant="body1" >
              Item 4
            </Typography>
            } />
          </ListItemButton>
        </List>
      </Container >
    </Container>
  );
}