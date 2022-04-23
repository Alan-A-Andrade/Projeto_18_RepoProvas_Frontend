import { Container } from "@mui/material"
import logo from "../../Assets/logo.svg"
import logoDark from "../../Assets/logodark.svg"
import { SwitchThemeMode } from "../Switch/SwitchThemeMode"
import Grid from '@mui/material/Grid';
import useAuth from '../../Hooks/useAuth';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";

function Header(Props: any) {

  const { logOff, auth } = useAuth()
  const navigate = useNavigate();

  function handleLogOff() {
    logOff()
    navigate("/")


  }

  return (
    <Container maxWidth={false} sx={{
      padding: 2,
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: (theme) =>
        theme.palette.background.default,
    }}>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignContent="center"
      >
        <Grid item xs={12}>
          {Props.state
            ? <img src={logoDark} alt="" />
            : <img src={logo} alt="" />
          }
        </Grid>
        <Grid item xs={3}>
          <SwitchThemeMode state={Props.state} setState={Props.setState} />
        </Grid>
        {auth &&
          <Grid item xs={3}>
            <Avatar sx={{ m: 0.5, bgcolor: 'secondary.main' }}>
              <LogoutOutlinedIcon onClick={handleLogOff} />
            </Avatar>
          </Grid>
        }
      </Grid>
      {
        auth &&
        <Divider sx={{ m: 1 }}></Divider>
      }
    </Container >
  )
}

export default Header
