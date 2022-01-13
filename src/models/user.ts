import { Address, DeliveryInfo } from './order'

export interface User {
   _id: string
   username: string
   email: string
   isAdmin: boolean
   phone: string
   deliveryInfo: DeliveryInfo
   name: string
   deleted: boolean
   createdAt: string
   updatedAt: string
   amountTotal?: number
   orderCount?: number
}

export type EditProfileFormValues = {
   name: string
   username: string
   phone: string
   email: string
}

export type ChangePasswordFormValues = {
   oldPassword?: string
   newPassword?: string
   confirmPassword?: string
}
export interface EditCustomerFormValues {
   username: string
   name: string
   phone: string
   email: string
   deliveryInfo: {
      name: string
      phone: string
      email: string
      address: Address
   }
}
export interface CustomerQueryParams extends Partial<Record<keyof User, string>> {
   orderBy?: string
   search?: string
   isOrder?: string
}
