import { createTheme } from '@mui/material/styles'

export default createTheme({
    spacing: 8,
    typography: {
        h1: {
            wordBreak: 'break-word',
        },
        h2: {
            fontSize: '2.5rem',
            fontFamily: ['Yuji Syuku', 'serif'].join(','),
            wordBreak: 'break-word',
        },
        h3: {
            fontSize: '2.1rem',
            fontFamily: ['Roboto', 'serif'].join(','),
            wordBreak: 'break-word',
        },
        h4: {
            fontSize: '1.8rem',
            fontFamily: ['Roboto', 'serif'].join(','),
            wordBreak: 'break-word',
        },
    },
    palette: {
        primary: {
            main: '#539EA5',
        },
        secondary: {
            main: '#EEF6F6',
        },
    },
})
