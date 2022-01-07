import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { CssBaseline } from '@mui/material'
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

if (typeof window !== 'undefined') {
   NProgress.configure({ showSpinner: false })
   NProgress.start()
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
   const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

   const Layout = Component.Layout ?? EmptyLayout

   return (
      <CacheProvider value={emotionCache}>
         <Head>
            <title>FlowerShop Admin</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
         </Head>

         <LocalizationProvider dateAdapter={AdapterDateFns}>
            <ThemeProvider theme={theme}>
               <SnackbarProvider maxSnack={1} preventDuplicate>
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
         </LocalizationProvider>
      </CacheProvider>
   )
}

export default App
