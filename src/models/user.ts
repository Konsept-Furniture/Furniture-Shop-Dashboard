export interface User {
   _id: string
   username: string
   email: string
   isAdmin: boolean
   phone: string
   address: string
   name: string
   deleted: boolean
   createdAt: string
   updatedAt: string
}

export type EditProfileFormValues = {
   name: string
   username: string
   phone: string
   email: string
}
