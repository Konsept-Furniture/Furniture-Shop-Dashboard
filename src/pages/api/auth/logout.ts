import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'
import { ResponseData, User } from '../../../models'
import Cookies from 'cookies'

export const config = {
   api: {
      bodyParser: false
   }
}
export default function handler(req: NextApiRequest, res: NextApiResponse<ResponseData<string>>) {
   if (req.method !== 'POST') {
      return res.status(404).json({
         data: '',
         errorCode: 0,
         message: 'Method is not supported'
      })
   }

   const cookies = new Cookies(req, res)
   cookies.set('access_token')

   res.status(200).json({
      data: '',
      errorCode: 0,
      message: 'logout successfully'
   })
}
