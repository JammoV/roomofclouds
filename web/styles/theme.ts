import { createTheme } from '@mui/material/styles'

export default createTheme({
    spacing: 8,
    typography: {
        h2: {
            fontSize: '2.5rem',
            fontFamily: ['Yuji Syuku', 'serif'].join(','),
        },
        h3: {
            fontSize: '2.1rem',
            fontFamily: ['Roboto', 'serif'].join(','),
        },
    },
})
