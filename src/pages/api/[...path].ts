import Cookies from 'cookies'
import httpProxy from 'http-proxy'
import type { NextApiRequest, NextApiResponse } from 'next'

const proxy = httpProxy.createProxyServer()

export const config = {
   api: {
      bodyParser: false
   }
}
export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
   return new Promise(resolve => {
      // convert cookies to header Authorization
      const cookies = new Cookies(req, res)
      const accessToken = cookies.get('access_token')
      // console.log(accessToken)
      if (accessToken) {
         req.headers.Authorization = `Bearer ${accessToken}`
      }

      //don't send cookies to API Server
      req.headers.cookie = ''

      proxy.web(req, res, {
         target: process.env.API_URL,
         changeOrigin: true,
         selfHandleResponse: false
      })

      proxy.once('proxyRes', () => {
         resolve(true)
      })
   })
}
