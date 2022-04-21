import { Container } from "@mui/material";


function ContainerFullPage({ children }: any) {


  return (
    <Container
      maxWidth={false}
      sx={{
        backgroundColor: (theme) =>
          theme.palette.background.default,
      }}>
      {children}
    </Container>
  )

}

export default ContainerFullPage