// import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios'
import queryString from 'query-string'
import utils from '../utils'

// Add to env
const baseURL = 'http://146.190.98.185:8080'
const version = '/v1'

const privateClient = axios.create({
   baseURL: baseURL + version
})

privateClient.interceptors.request.use(async config => {
   const token = localStorage.getItem('token')

   console.log('token', token)

   return {
      ...config,
      headers: {
         'Content-Type': 'application/json',
         //  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXJfaWQiOjcsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTY3MzMzODE2MywiaWF0IjoxNjcyNzMzMzYzfQ.MGYDVfshLABZcGXVeybIunwJbdPqICQMt0B4Qm7uUqI`
         Authorization: `Bearer ${token || ''}`
      }
   }
})

privateClient.interceptors.response.use(
   response => {
      if (response && response.data) return response.data

      return response
   },
   err => {
      throw err.response.data
   }
)

export default privateClient
