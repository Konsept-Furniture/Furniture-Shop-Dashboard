import Head from 'next/head'
import { CacheProvider } from '@emotion/react'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import { CssBaseline } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { createEmotionCache } from '../utils/create-emotion-cache'
import { theme } from '../theme'
import { SWRConfig } from 'swr'
import axiosClient from '../api-client/axios-client'
import { AppPropsWithLayout } from 'models'
import { EmptyLayout } from 'components/layouts'

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
               <SWRConfig
                  value={{
                     fetcher: (url: string) => axiosClient.get(url),
                     shouldRetryOnError: false,
                  }}
               >
                  <CssBaseline />
                  <Layout>
                     <Component {...pageProps} />
                  </Layout>
               </SWRConfig>
            </ThemeProvider>
         </LocalizationProvider>
      </CacheProvider>
   )
}

export default App
