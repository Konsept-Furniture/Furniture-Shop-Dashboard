import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import {
   Avatar,
   Button,
   Card,
   CardActions,
   CardContent,
   CardHeader,
   Divider,
   Grid,
   InputAdornment
} from '@mui/material'
import { Box } from '@mui/system'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { OrderStatus } from 'constants/enums/order-status'
import { regexVietnamesePhoneNumber } from 'constants/regexes'
import { EditOrderFormValues, Order } from 'models'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import Link from 'next/link'
import { ConfirmDialog } from 'components/product/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'

export interface OrderBasicInfoCardEditProps {
   order?: Order
   onSave: Function
   onDelete: Function
}
const schema = yup.object().shape({
   customerName: yup.string().max(255).required(),
   street: yup.string().max(255).required(),
   ward: yup.string().max(255).required(),
   district: yup.string().max(255).required(),
   province: yup.string().max(255).required(),
   notes: yup.string().max(255),
   // TODO: validate phone
   phone: yup
      .string()
      .max(255)
      .required()
      .test('is-vietnamese-phonenumber', 'Incorrect phone number format.', number => {
         if (!number) return true

         return regexVietnamesePhoneNumber.test(number)
      }),
   email: yup.string().email().max(255).nullable().required(),
   amount: yup.number().integer().required().nullable().typeError('you must specify a number'),
   status: yup.string().max(255).required()
})
export function OrderBasicInfoCardEdit({ order, onSave, onDelete }: OrderBasicInfoCardEditProps) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const {
      control,
      formState: { isSubmitting },
      handleSubmit,
      reset
   } = useForm<EditOrderFormValues>({
      resolver: yupResolver(schema)
   })

   useEffect(() => {
      if (order) {
         console.log(order.status)
         reset({
            customerName: order.deliveryInfo.name,
            street: order.deliveryInfo.address.street,
            ward: order.deliveryInfo.address.ward,
            district: order.deliveryInfo.address.district,
            province: order.deliveryInfo.address.province,
            notes: order.notes,
            phone: order.deliveryInfo.phone,
            email: order.deliveryInfo.email,
            amount: order.amount,
            status: order.status
         })
      }
   }, [order, reset])

   const handleSave = async (values: EditOrderFormValues) => {
      console.log(values)
      if (onSave) {
         const payload = {
            deliveryInfo: {
               address: {
                  street: values.street,
                  ward: values.ward,
                  district: values.district,
                  province: values.province
               },
               name: values.customerName,
               phone: values.phone,
               email: values.email
            },
            notes: values.notes,
            amount: values.amount,
            status: values.status
         }
         await onSave(payload)
      }
   }

   const handleDeleteClick = async (event: MouseEvent) => {
      if (onDelete) onDelete()
   }

   return (
      <Card>
         <CardHeader title="Basic info" />
         <Divider />
         <CardContent>
            <form onSubmit={handleSubmit(handleSave)}>
               <Grid container spacing={3}>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="customerName"
                        label="Customer Name"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="street"
                        label="Street"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="ward"
                        label="Ward"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="district"
                        label="District"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="province"
                        label="Province"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="notes"
                        label="Notes"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="phone"
                        label="Phone"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="email"
                        label="Email"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="amount"
                        label="Amount"
                        InputProps={{
                           startAdornment: <InputAdornment position="start">$</InputAdornment>
                        }}
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomSelectField
                        control={control}
                        name="status"
                        label="Status"
                        disabled={isSubmitting}
                        options={OrderStatus.map(item => ({
                           label: item,
                           value: item
                        }))}
                     />
                  </Grid>
               </Grid>
            </form>
         </CardContent>
         <CardActions sx={{ m: 2, justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
               <Link href={`/orders/${order?._id}`} passHref>
                  <Button variant="outlined">Cancel</Button>
               </Link>
               <Button variant="contained" onClick={handleSubmit(handleSave)}>
                  Update
               </Button>
            </Box>
            <Button variant="text" color="error" onClick={() => setOpenConfirmDialog(true)}>
               Delete order
            </Button>
         </CardActions>

         <ConfirmDialog
            icon={
               <Avatar sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}>
                  <ReportProblemIcon />
               </Avatar>
            }
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this order?"
            onSubmit={onDelete}
            onClose={() => setOpenConfirmDialog(false)}
         />
      </Card>
   )
}
