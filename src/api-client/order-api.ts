import { Order, ResponseData } from './../models'
import { LoginPayload } from './../models'
import axiosClient from './axios-client'

export const orderApi = {
   update(id: string, payload: Partial<Order>): Promise<ResponseData<Order>> {
      return axiosClient.put(`/orders/${id}`, payload)
   },
   delete(id?: string): Promise<ResponseData<string>> {
      return axiosClient.delete(`/orders/${id}`)
   }
}
