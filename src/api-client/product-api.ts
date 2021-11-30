import { ListParams, ListResponse, Product, ProductPayload, ResponseData } from './../models'
import axiosClient from './axios-client'

export const productApi = {
   getList(payload: ListParams): Promise<ListResponse<Product>> {
      return axiosClient.get('products', { params: payload })
   },
   edit(productId: string, payload: ProductPayload): Promise<ResponseData<string>> {
      return axiosClient.put(`products/${productId}`, payload)
   },
   add(payload: ProductPayload): Promise<ResponseData<Product>> {
      return axiosClient.post(`products`, payload)
   },
}
