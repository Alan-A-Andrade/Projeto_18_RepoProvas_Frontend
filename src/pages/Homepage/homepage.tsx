import { Container } from "@mui/material"
import { Grid } from "@mui/material"
import { Typography } from "@mui/material"
import { Button } from "@mui/material"
import { ThemeContext } from "@emotion/react"

function Homepage() {

  return (
    <Container sx={{ width: 1 }}>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={3}>
          <Container sx={{ width: 1 }}>
            <Typography component="div" variant="h2">
              Login
            </Typography>
            <Button variant="contained">
              <Typography component="h1" variant="h6">
                Entrar com GitHub
              </Typography>
            </Button>
          </Container>
        </Grid>
      </Grid>

    </Container >
  )

}

export default Homepage