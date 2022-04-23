import { Container } from "@mui/material";


function ContainerFullPage({ children }: any) {


  return (
    <Container
      maxWidth={false}
      sx={{
        height: 'maxContent',
        minHeight: '100vh',
        backgroundColor: (theme) =>
          theme.palette.background.default,
      }}>
      {children}
    </Container>
  )

}

export default ContainerFullPage