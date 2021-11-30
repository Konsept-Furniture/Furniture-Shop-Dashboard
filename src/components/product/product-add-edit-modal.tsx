import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { Product, ProductPayload } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'

export interface ProductAddEditModalProps {
   isOpen: boolean
   children?: ReactNode
   data: Partial<Product>
   onClose: () => void
   onSubmit: (product: ProductPayload) => Promise<void>
}

const schema = yup.object({
   title: yup.string().max(255).required(),
   desc: yup.string().max(255).required(),
   img: yup.string().max(255).required(),
   // categories: yup.array(yup.string().max(255)),
   // price: yup.number().integer().min(0),
   // quantity: yup.number().integer().min(0),
})

export function ProductAddEditModal({
   isOpen,
   data,
   children,
   onClose,
   onSubmit,
}: ProductAddEditModalProps) {
   const form = useForm<ProductPayload>({
      defaultValues: {
         title: '',
         desc: '',
         img: '',
         // categories: [],
         // price: undefined,
         // quantity: undefined,
      },
      resolver: yupResolver(schema),
   })
   const {
      reset,
      control,
      formState: { errors, isSubmitting },
   } = form

   const handleSaveProduct = async (values: ProductPayload) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      reset({
         title: data?.title || '',
         desc: data?.desc || '',
         img: data?.img || '',
         categories: data?.categories || [],
         // price: data?.price || undefined,
         // quantity: data?.countInStock || undefined,
      })
   }, [data, reset])

   return (
      <Dialog open={isOpen} onClose={onClose} scroll="body">
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
                  options={[
                     {
                        label: 'art',
                        value: 'art',
                     },
                     {
                        label: 'bedroom',
                        value: 'bedroom',
                     },
                  ]}
                  multiple={true}
                  disabled={isSubmitting}
               />
               {/* <CustomTextField form={form} name="price" label="Product Title" />
               <CustomTextField form={form} name="quantity" label="Product Title" /> */}
               {JSON.stringify(errors)}
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
