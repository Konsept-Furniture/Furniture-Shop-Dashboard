import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { Box, Button, InputAdornment, Typography } from '@mui/material'
import { CustomSelectField, CustomTextField } from 'components/form-controls'
import { OrderStatus } from 'constants/enum/order-status'
import { EditOrderFormValues, Order } from 'models'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import DeleteIcon from '@mui/icons-material/Delete'
import { ConfirmDialog } from 'components/product/confirm-dialog'

export interface EditOrderFormProps {
   order?: Order
   onSave: (payload: Partial<Order>) => void
   onDelete: () => void
   onCancel: () => void
}

const schema = yup.object().shape({
   customerName: yup.string().max(255).required(),
   street: yup.string().max(255).required(),
   ward: yup.string().max(255).required(),
   district: yup.string().max(255).required(),
   province: yup.string().max(255).required(),
   notes: yup.string().max(255),
   // TODO: validate phone
   phone: yup.string().max(255).required(),
   email: yup.string().email().max(255).nullable().required(),
   amount: yup.number().integer().required().nullable().typeError('you must specify a number'),
   status: yup.string().max(255).required()
})

export function EditOrderForm({ order, onSave, onCancel, onDelete }: EditOrderFormProps) {
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)

   const defaultValues = {
      customerName: order?.deliveryInfo.name,
      street: order?.deliveryInfo.address.street,
      ward: order?.deliveryInfo.address.ward,
      district: order?.deliveryInfo.address.district,
      province: order?.deliveryInfo.address.province,
      notes: order?.notes,
      phone: order?.deliveryInfo.phone,
      email: order?.deliveryInfo.email,
      amount: order?.amount,
      status: order?.status
   }
   const {
      control,
      formState: { isSubmitting, errors },
      handleSubmit
   } = useForm<EditOrderFormValues>({
      defaultValues,
      resolver: yupResolver(schema)
   })

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

   return (
      <Box>
         <Box
            sx={{
               px: 3,
               py: 2.5,
               mb: 3,
               borderRadius: 1,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-between',
               bgcolor: 'background.default'
            }}
         >
            <Typography variant="h6" sx={{ color: 'gray', fontSize: 13, mr: 2 }}>
               ORDER
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
               <Button variant="contained" onClick={handleSubmit(handleSave)}>
                  Save changes
               </Button>
               <Button variant="outlined" onClick={onCancel}>
                  Cancel
               </Button>
            </Box>
         </Box>
         <Typography variant="h6" gutterBottom>
            Detail
         </Typography>

         <form>
            <CustomTextField
               disabled={isSubmitting}
               control={control}
               name="customerName"
               label="Customer Name"
            />
            <CustomTextField
               disabled={isSubmitting}
               control={control}
               name="street"
               label="Street"
            />
            <CustomTextField disabled={isSubmitting} control={control} name="ward" label="Ward" />
            <CustomTextField
               disabled={isSubmitting}
               control={control}
               name="district"
               label="District"
            />
            <CustomTextField
               disabled={isSubmitting}
               control={control}
               name="province"
               label="Province"
            />
            <CustomTextField disabled={isSubmitting} control={control} name="notes" label="Notes" />
            <CustomTextField disabled={isSubmitting} control={control} name="phone" label="Phone" />
            <CustomTextField disabled={isSubmitting} control={control} name="email" label="Email" />
            <CustomTextField
               disabled={isSubmitting}
               control={control}
               name="amount"
               label="Amount"
               InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>
               }}
            />
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
         </form>

         <Button
            variant="text"
            startIcon={<DeleteIcon />}
            color="error"
            onClick={() => setOpenConfirmDialog(!openConfirmDialog)}
         >
            Delete Order
         </Button>

         <ConfirmDialog
            isOpen={openConfirmDialog}
            title="Are you sure?"
            body="Are you sure to delete this order?"
            onSubmit={onDelete}
            onClose={() => setOpenConfirmDialog(!openConfirmDialog)}
         />
      </Box>
   )
}
