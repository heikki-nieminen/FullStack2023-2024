import { createTheme } from '@mui/material'

export const theme = createTheme({
  spacing: 4,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          marginTop: 8,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          marginTop: 4,
        },
      },
    },
  },
})
