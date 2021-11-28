import { LoginPayload } from './../models'
import axiosClient from './axios-client'

export const authApi = {
   login(payload: LoginPayload) {
      return axiosClient.post('/auth/login', payload)
   },
   logout() {
      return axiosClient.post('/auth/logout')
   },
   getProfile() {
      return axiosClient.get('users/read/infor')
   },
}
