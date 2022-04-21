import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let lightTheme = createTheme({
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#3F61D7',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: 'secondary'
      }
    }
  },
  typography: {
    h1: {
      color: '#111111',
    },
    h2: {
      color: '#111111',
    },
    h3: {
      color: '#111111',
    },
  }
})

lightTheme = responsiveFontSizes(lightTheme)


let darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#111111',
    },
    secondary: {
      main: '#3F61D7',
    },
  },
  typography: {
    h1: {
      color: '#ffffff',
    },
    h2: {
      color: '#ffffff',
    },
    h3: {
      color: '#ffffff',
    },
  }
})

darkTheme = responsiveFontSizes(darkTheme)


export { darkTheme, lightTheme }