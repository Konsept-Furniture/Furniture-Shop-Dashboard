import { Category, ResponseData } from 'models'
import axiosClient from './axios-client'

export const categoryApi = {
   getList(): Promise<ResponseData<Category>> {
      return axiosClient.get('categories')
   },
}
