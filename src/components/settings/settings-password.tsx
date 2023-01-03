import { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, TextField } from '@mui/material'
import * as yup from 'yup'
import { authApi } from 'api-client'
import { CustomTextField } from 'components/form-controls'
import { useForm } from 'react-hook-form'
import { ChangePasswordFormValues } from 'models'
import { yupResolver } from '@hookform/resolvers/yup'

const schema = yup.object().shape({
   oldPassword: yup
      .string()
      .max(255)
      .label('Old password')
      .required()
      .test('check-old-password-is-correct', 'Old password is not correct', async value => {
         try {
            await authApi.changePassword({ oldPassword: value })
            return true
         } catch (error) {
            return false
         }
      }),
   newPassword: yup.string().min(4).max(255).label('New password').required(),
   confirmPassword: yup
      .string()
      .min(4)
      .max(255)
      .label('Confirm new password')
      .oneOf([yup.ref('newPassword'), null], 'Confirm new password does not match new password')
      .required()
})

export const SettingsPassword = ({ onSubmit, ...restProps }: { onSubmit: Function }) => {
   const form = useForm<ChangePasswordFormValues>({
      resolver: yupResolver(schema)
   })
   const {
      control,
      handleSubmit,
      formState: { isSubmitting }
   } = form

   const handleSave = async (values: ChangePasswordFormValues) => {
      if (onSubmit) await onSubmit(values)
   }

   return (
      <form autoComplete="off" onSubmit={handleSubmit(handleSave)} {...restProps}>
         <Card>
            <CardHeader subheader="Update password" title="Password" />
            <Divider />
            <CardContent>
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="oldPassword"
                  label="Old password"
                  type="password"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="newPassword"
                  label="New password"
                  type="password"
               />
               <CustomTextField
                  disabled={isSubmitting}
                  control={control}
                  name="confirmPassword"
                  label="Confirm new password"
                  type="password"
               />
            </CardContent>
            <Divider />
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
               }}
            >
               <Button color="primary" variant="contained" type="submit" disabled={isSubmitting}>
                  Update
               </Button>
            </Box>
         </Card>
      </form>
   )
}
