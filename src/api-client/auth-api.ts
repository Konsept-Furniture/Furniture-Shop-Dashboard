import { ResponseData, User, LoginPayload } from './../models'
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
   updateProfile(payload: Partial<User>): Promise<ResponseData<User>> {
      const url = 'users/update/infor'
      return axiosClient.put(url, JSON.stringify(payload))
   }
}
