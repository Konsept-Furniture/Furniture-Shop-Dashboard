import {
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogTitle,
   Divider,
   IconButton,
   InputAdornment,
   Stack,
   Typography
} from '@mui/material'
import React, { ReactNode, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { Category, Product, ProductPayload } from 'models'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { LoadingButton } from '@mui/lab'
import useSWR from 'swr'
import FileUpload from 'components/file-upload/file-upload'
import CloseIcon from 'icons/close'

export interface ProductAddEditModalProps {
   isOpen: boolean
   isEdit: boolean
   data?: Product
   onClose: () => void
   onSubmit: (product: ProductPayload) => Promise<void>
}

const DEFAULT_SIZES = [
   {
      size: 36,
      qty: undefined
   },
   {
      size: 37,
      qty: undefined
   },
   {
      size: 38,
      qty: undefined
   },
   {
      size: 39,
      qty: undefined
   },
   {
      size: 40,
      qty: undefined
   },
   {
      size: 41,
      qty: undefined
   },
   {
      size: 42,
      qty: undefined
   },
   {
      size: 43,
      qty: undefined
   },
   {
      size: 44,
      qty: undefined
   },
]

const schema = yup.object({
   title: yup.string().max(255).required(),
   desc: yup.string().max(2555).required(),
   // img: yup.string().max(255).required(),
   photo: yup.mixed(),
   categories: yup.array(yup.string().max(255)),
   price: yup.number().integer().min(0).typeError('Price must be a number'),
   variants: yup.array().of(yup.object().shape({
      size: yup.number().min(0).nullable().label('Size').typeError('Size must be a number'),
      qty: yup.number().min(0).nullable().label('Quantity').typeError('Quantity must be a number'),
   })),
   // quantity: yup.number().integer().min(0)
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
         photo: {},
         categories: [],
         price: undefined,
         variants: [{ size: undefined, qty: undefined }]
         // quantity: undefined
      },
      resolver: yupResolver(schema)
   })
   const {
      reset,
      control,
      setValue,
      formState: { isSubmitting, errors }
   } = form

   const { fields, append, remove } = useFieldArray({
      control,
      name: "variants"
   });


   const handleSaveProduct = async (values: ProductPayload) => {
      if (onSubmit) await onSubmit(values)
   }

   useEffect(() => {
      console.log(data)
      if (isEdit) {
         reset({
            title: data?.title || '',
            desc: data?.desc || '',
            photo: data?.photo || {},
            categories: data?.categories?.filter(cate => options.map(_ => _.name).includes(cate)) || [],
            price: data?.price,
            variants: data?.variants || DEFAULT_SIZES,
            // quantity: data?.quantity
         })
      } else {
         reset({
            title: '',
            desc: '',
            // img: '',
            photo: {},
            categories: [],
            variants: DEFAULT_SIZES,
            price: undefined,
            // quantity: undefined
         })
      }
   }, [data, reset, isEdit])

   const handleClose = () => {
      onClose()
      reset()
   }
   const onChangePhoto = (file: File) => {
      setValue('photo', file)
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
                  disabled={isSubmitting}
                  InputProps={{
                     startAdornment: <InputAdornment position="start">$</InputAdornment>
                  }}
               />

               <FileUpload name="photo" control={control} label="Photo" updateFilesCb={onChangePhoto} />
               <Divider sx={{ my: 2 }} />
               <Typography variant='h6'>Variants</Typography>
               {fields.map((field, index) => (
                  <Stack key={field.id} direction={'row'} spacing={3} alignItems="center" justifyContent={'space-between'} >
                     <Stack direction={'row'} spacing={3} alignItems="center" >
                        <Box >
                           <CustomTextField
                              disabled={isSubmitting}
                              control={control}
                              name={`variants.${index}.size`}
                              label="Size"
                              type="number"
                           />
                        </Box>
                        <Box>
                           <CustomTextField
                              disabled={isSubmitting}
                              control={control}
                              name={`variants.${index}.qty`}
                              label="Quantity"
                              type="number"
                           />
                        </Box>
                     </Stack>
                     <Box sx={{ ml: 'auto' }}>
                        <IconButton disabled={isSubmitting} onClick={() => remove(index)}><CloseIcon width={24} /></IconButton>
                     </Box>
                  </Stack>
               ))}

               {/* <Stack>
               </Stack> */}
               <Button onClick={() => append({ size: undefined, qty: undefined })}>Append</Button>
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
