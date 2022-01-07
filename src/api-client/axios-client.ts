import axios, { AxiosResponse } from 'axios'
import { ResponseData, ResponseListData } from 'models'
import queryString from 'query-string'
// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request- config` for the full list of configs

const axiosClient = axios.create({
   baseURL: '/api',
   headers: {
      'Content-Type': 'application/json'
   },
   paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(
   async config => {
      return config
   },
   function (error) {
      // Do something with request error
      return Promise.reject(error)
   }
)

axiosClient.interceptors.response.use((response): ResponseListData<any> | ResponseData<any> => {
   if (response && response.data.errorCode === 0) {
      return response.data
   }
   throw response.data
})

export default axiosClient
