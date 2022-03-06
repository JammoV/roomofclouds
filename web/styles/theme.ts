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
    },
})
