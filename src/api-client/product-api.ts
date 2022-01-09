import { ListParams, ResponseListData, Product, ProductPayload, ResponseData } from './../models'
import axiosClient from './axios-client'

export const productApi = {
   getList(payload: ListParams): Promise<ResponseListData<Product>> {
      return axiosClient.get('products', { params: payload })
   },
   getById(id: string): Promise<ResponseData<Product>> {
      return axiosClient.get(`products/${id}`)
   },
   update(productId: string, payload: Partial<ProductPayload>): Promise<ResponseData<Product>> {
      return axiosClient.put(`products/${productId}`, payload)
   },
   add(payload: ProductPayload): Promise<ResponseData<Product>> {
      return axiosClient.post(`products`, payload)
   },
   delete(id: string): Promise<ResponseData<string>> {
      return axiosClient.delete(`products/${id}`)
   }
}
