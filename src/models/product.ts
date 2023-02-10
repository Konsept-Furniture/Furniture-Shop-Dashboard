export interface Product {
   _id: string
   title?: string
   desc?: string
   img: string
   photo: {
      public_id: string
      url: string
      name: string
   }
   categories?: string[]
   size?: any
   color?: any
   price?: number
   quantity?: number
   countRating?: number
   rating?: number
   popular?: number
   inStock?: boolean
   deleted?: boolean
   createdAt: string
   updatedAt: string
   variants: ProductVariant[]
}
export interface ProductPayload {
   _id: string
   title?: string
   desc?: string
   img?: string
   photo: {
      public_id: string
      url: string
      name: string
   } | File
   categories?: string[]
   price?: number
   quantity?: number
   variants: ProductVariant[]
}

export interface ProductVariant {
   size: number
   qty: number
}

export interface ProductQueryParams extends Record<keyof Product, string> {
   orderBy?: string
   search?: string
}
