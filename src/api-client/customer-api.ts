import { ListParams, Order, ResponseData, ResponseListData, User } from '../models'
import { LoginPayload } from '../models'
import axiosClient from './axios-client'

export const customerApi = {
   getList(payload: ListParams): Promise<ResponseListData<User>> {
      return axiosClient.get('users', { params: payload })
   },
   update(id: string, payload: Partial<Order>): Promise<ResponseData<User>> {
      return axiosClient.put(`/users/${id}`, payload)
   },
   delete(id?: string): Promise<ResponseData<string>> {
      return axiosClient.delete(`/users/${id}`)
   }
}
