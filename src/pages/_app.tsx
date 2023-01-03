import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { Button, CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache } from '../utils'
import { theme } from '../theme'
import { SWRConfig } from 'swr'
import axiosClient from '../api-client/axios-client'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layouts'
import { SnackbarProvider } from 'notistack'
import 'react-perfect-scrollbar/dist/css/styles.css'

import Router from 'next/router'
import NProgress from 'nprogress'
import 'assets/styles/nprogress.css'
import { createRef } from 'react'

if (typeof window !== 'undefined') {
   NProgress.configure({ showSpinner: false })

   Router.events.on('routeChangeStart', () => {
      console.log('routeChangeStart')
      NProgress.start()
   })
   Router.events.on('routeChangeError', () => {
      console.log('routeChangeError')
      NProgress.done()
   })
   Router.events.on('routeChangeComplete', () => {
      console.log('routeChangeComplete')
      NProgress.done()
   })
}

const clientSideEmotionCache = createEmotionCache()

const App = (props: AppPropsWithLayout) => {
   // const notistackRef = createRef<HTMLElement>()
   // const onClickDismiss = (key: SnackbarKey) => () => {
   //    notistackRef.current.closeSnackbar(key)
   // }

   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

   const Layout = Component.Layout ?? EmptyLayout

   return (
      <CacheProvider value={emotionCache}>
         <Head>
            <title>FurnitureStore Admin</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
         </Head>

         <ThemeProvider theme={theme}>
            <SnackbarProvider
               maxSnack={1}
               preventDuplicate
               // action={(key: SnackbarKey) => (
               //    <Button varient="text" onClick={onClickDismiss(key)} color="inherit">
               //       Dismiss
               //    </Button>
               // )}
               classes={{
                  variantSuccess: '#4caf50',
                  variantError: '#f44336',
                  variantWarning: '#fdd835'
                  // variantInfo: classes.info,
               }}
            >
               <SWRConfig
                  value={{
                     fetcher: (url: string) => axiosClient.get(url).then(res => res.data),
                     shouldRetryOnError: false
                  }}
               >
                  <CssBaseline />
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </SWRConfig>
            </SnackbarProvider>
         </ThemeProvider>
      </CacheProvider>
   )
}

export default App
