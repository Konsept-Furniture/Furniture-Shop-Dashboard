import { Product } from 'models'

export interface Order {
   _id: string
   userId: string
   products: ProductOrder[]
   amount: number
   deliveryInfo: DeliveryInfo
   isPaid: boolean
   payment: 'COD' | 'PayPal'
   notes?: string
   status?: 'PENDING' | 'PROCESSING' | 'DELIVERIED' | 'REFUNDED'
   deleted?: boolean
   createdAt: string
   updatedAt: string
}

export interface ProductOrder {
   _id: string
   productId: string
   quantity: number
   amount: number
}
export interface DeliveryInfo {
   address: Address
   name: string
   phone: string
   email: string
}
export interface Address {
   street: string
   ward: string
   district: string
   province: string
}
