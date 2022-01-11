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
   InputAdornment,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { OrderStatus } from 'constants/enums/order-status'
import { regexVietnamesePhoneNumber } from 'constants/regexes'
import { District, EditOrderFormValues, Order, Province } from 'models'
import React, { MouseEvent, useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as yup from 'yup'
import Link from 'next/link'
import { ConfirmDialog } from 'components/product/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import axios, { AxiosResponse } from 'axios'
import useSWR from 'swr'

export interface OrderBasicInfoCardEditProps {
   order?: Order
   onSave: Function
   onDelete: Function
}

function fetcher<T>(url: string) {
   return axios.get<any, AxiosResponse<T>>(url).then((res: AxiosResponse<T>): T => {
      return res.data
   })
}

const schema = yup.object().shape({
   deliveryInfo: yup.object().shape({
      name: yup.string().max(255).required(),
      phone: yup
         .string()
         .max(255)
         .required()
         .test('is-vietnamese-phonenumber', 'Incorrect phone number format.', number => {
            if (!number) return true

            return regexVietnamesePhoneNumber.test(number)
         }),
      email: yup.string().email().max(255).nullable().required(),
      address: yup.object().shape({
         street: yup.string().max(255).required(),
         ward: yup.string().max(255).required(),
         district: yup.string().max(255).required(),
         province: yup.string().max(255).required()
      })
   }),
   amount: yup.number().integer().required().nullable().typeError('you must specify a number'),
   status: yup.string().max(255).required(),
   notes: yup.string().max(255)
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

   const watchProvince = useWatch({
      control,
      name: 'deliveryInfo.address.province'
   })
   const watchDistrict = useWatch({
      control,
      name: 'deliveryInfo.address.district'
   })

   const { data: provinceList } = useSWR<Province[]>(
      () => (order ? 'https://provinces.open-api.vn/api/p' : null),
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: selectedProvince } = useSWR<Province>(
      () =>
         order && watchProvince
            ? `https://provinces.open-api.vn/api/p/${watchProvince}?depth=2`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: selectedDistrict } = useSWR<District>(
      () =>
         order && watchDistrict
            ? `https://provinces.open-api.vn/api/d/${watchDistrict}?depth=2`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   useEffect(() => {
      if (order) {
         console.log(order.status)
         reset({
            deliveryInfo: order.deliveryInfo,
            notes: order.notes,
            amount: order.amount,
            status: order.status
         })
      }
   }, [order, reset])

   const handleSave = async (values: EditOrderFormValues) => {
      console.log(values)
      if (onSave) {
         const payload = {
            deliveryInfo: values.deliveryInfo,
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
         <CardHeader title="Edit order" />
         <Divider />
         <CardContent>
            <form onSubmit={handleSubmit(handleSave)}>
               <Grid container spacing={3}>
                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.name"
                        label="Recipient's Name"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.phone"
                        label="Recipient's Phone Number"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.email"
                        label="Recipient's Email"
                     />
                  </Grid>
               </Grid>
               <Typography variant="subtitle2">Address</Typography>
               <Grid container columnSpacing={3}>
                  <Grid item md={12} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.address.street"
                        label="Street"
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomSelectField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.address.province"
                        label="Province"
                        options={
                           provinceList
                              ? provinceList.map(province => ({
                                   label: province.name,
                                   value: province.code.toString()
                                }))
                              : []
                        }
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomSelectField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.address.district"
                        label="District"
                        options={
                           selectedProvince
                              ? selectedProvince.districts.map(district => ({
                                   label: district.name,
                                   value: district.code
                                }))
                              : []
                        }
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomSelectField
                        disabled={isSubmitting}
                        control={control}
                        name="deliveryInfo.address.ward"
                        label="Ward"
                        options={
                           selectedDistrict
                              ? selectedDistrict.wards.map(ward => ({
                                   label: ward.name,
                                   value: ward.code
                                }))
                              : []
                        }
                     />
                  </Grid>
                  <Grid item md={12} xs={12}>
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