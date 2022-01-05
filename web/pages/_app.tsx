// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';


function MyApp({ Component, pageProps }: AppProps) {
  return (<Container maxWidth='md'>
      <CssBaseline />
      <h1>Room of Clouds</h1>
      <Component {...pageProps} />
      </Container>)
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp