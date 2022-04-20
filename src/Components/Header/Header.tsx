import { Container } from "@mui/material"
import logo from "../../assets/logo.svg"


//position: 'fixed', top: 0, left: 0, right: 0

function Header() {
  return (
    <Container sx={{ padding: "18px", }}>
      <img src={logo} alt="" />
    </Container>
  )
}

export default Header
