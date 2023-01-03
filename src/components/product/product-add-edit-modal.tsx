import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   InputAdornment
} from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Category, Product, ProductPayload } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import useSWR from 'swr'

export interface ProductAddEditModalProps {
   isOpen: boolean
   isEdit: boolean
   data?: Product
   onClose: () => void
   onSubmit: (product: ProductPayload) => Promise<void>
}

const schema = yup.object({
   title: yup.string().max(255).required(),
   desc: yup.string().max(255).required(),
   img: yup.string().max(255).required(),
   categories: yup.array(yup.string().max(255)),
   price: yup.number().integer().min(0),
   quantity: yup.number().integer().min(0)
})

export function ProductAddEditModal({
   isOpen,
   isEdit,
   data,
   onClose,
   onSubmit
}: ProductAddEditModalProps) {
   const { data: options = [] } = useSWR('categories', {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      revalidateOnFocus: false,
      revalidateOnMount: true
   })

   const form = useForm<ProductPayload>({
      defaultValues: {
         title: '',
         desc: '',
         img: '',
         categories: [],
         price: undefined,
         quantity: undefined
      },
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      formState: { isSubmitting }
   } = form

   const handleSaveProduct = async (values: ProductPayload) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (isEdit) {
         reset({
            title: data?.title || '',
            desc: data?.desc || '',
            img: data?.img || '',
            categories: data?.categories || [],
            price: data?.price,
            quantity: data?.quantity
         })
      } else {
         reset({
            title: '',
            desc: '',
            img: '',
            categories: [],
            price: undefined,
            quantity: undefined
         })
      }
   }, [data, reset, isEdit])

   const handleClose = () => {
      onClose()
      reset()
   }

   return (
      <Dialog open={isOpen} onClose={handleClose} scroll="body">
         <DialogTitle>Product</DialogTitle>
         <DialogContent>
            <form>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="title"
                  label="Product Title"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="desc"
                  label="Description"
                  multiline={true}
                  rows={4}
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="img"
                  label="Image Link"
               />
               <CustomSelectField
                  control={control}
                  name="categories"
                  label="Categories"
                  multiple={true}
                  disabled={isSubmitting}
                  options={
                     options
                        ? options.map((item: Category) => ({
                             value: item.name,
                             label: item.name
                          }))
                        : []
                  }
               />
               <CustomTextField
                  control={control}
                  name="price"
                  label="Price"
                  InputProps={{
                     startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
               />
               <CustomTextField control={control} name="quantity" label="Quantity" />
            </form>
         </DialogContent>
         <DialogActions>
            <Button disabled={isSubmitting} onClick={onClose}>
               Cancel
            </Button>
            <LoadingButton
               loading={isSubmitting}
               type="submit"
               variant="contained"
               onClick={form.handleSubmit(handleSaveProduct)}
            >
               Save
            </LoadingButton>
         </DialogActions>
      </Dialog>
   )
}
