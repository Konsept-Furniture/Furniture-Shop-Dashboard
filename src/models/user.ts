import { Address, DeliveryInfo } from './order'
export interface User {
   _id: string
   username: string
   email: string
   deliveryInfo: DeliveryInfo
   isAdmin: boolean
   phone: string
   name: string
   deleted: boolean
   deletedAt: string
   createdAt: string
   updatedAt: string
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
export interface CustomerQueryParams extends Partial<Record<keyof User, string>> {
   orderBy?: string
   search?: string
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
