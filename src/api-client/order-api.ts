import axios from 'axios'
import { IncomePeriod, Order, ResponseData } from './../models'
import axiosClient from './axios-client'

export const orderApi = {
   update(id: string, payload: Partial<Order>): Promise<ResponseData<Order>> {
      return axiosClient.put(`/orders/${id}`, payload)
   },
   delete(id?: string): Promise<ResponseData<string>> {
      return axiosClient.delete(`/orders/${id}`)
   },
   getStat(period: 'week' | 'month' | 'year'): Promise<ResponseData<IncomePeriod>> {
      return axiosClient.get(`orders/stats/income?type=${period}`)
   },
   exportBill(id: string) {
      return axios.get(`/api/orders/fetch-pdf/${id}`, {
         responseType: 'blob'
      })
   }
}
