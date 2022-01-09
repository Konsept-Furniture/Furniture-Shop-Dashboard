import { User } from 'models'

export interface Order {
   _id: string
   user: User
   products: ProductOrder[]
   amount: number
   deliveryInfo: DeliveryInfo
   isPaid: boolean
   payment: 'COD' | 'PayPal'
   notes?: string
   status?: 'PENDING' | 'PROCESSING' | 'DELIVERIED' | 'REFUNDED' | 'CANCELED'
   deleted?: boolean
   createdAt: string
   updatedAt: string
}

export interface ProductOrder {
   productId: string
   title: string
   img: string
   price: number
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
export type EditOrderFormValues = {
   deliveryInfo: DeliveryInfo
   notes: string
   status: 'PENDING' | 'PROCESSING' | 'DELIVERIED' | 'REFUNDED' | 'CANCELED'
   amount: number
}
