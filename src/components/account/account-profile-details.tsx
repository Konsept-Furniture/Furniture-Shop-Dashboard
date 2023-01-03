import { useState } from 'react'
import { Box, Button, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material'
import { CustomTextField } from 'components/form-controls'
import { regexVietnamesePhoneNumber } from 'constants/regexes'
import * as yup from 'yup'
import { EditProfileFormValues } from 'models'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuth } from 'hooks'

export interface AccountProfileDetailsProps {
   onSubmit?: Function
}

const schema = yup.object().shape({
   name: yup.string().max(255).label('Name'),
   //  username: yup.string(),
   phone: yup
      .string()
      .label('Phone number')
      .test('is-vietnamese-phonenumber', 'Incorrect phone number format.', number => {
         if (!number) return true

         return regexVietnamesePhoneNumber.test(number)
      })
      .nullable(true),
   email: yup.string().email().max(255).label('Email address')
})

export const AccountProfileDetails = ({ onSubmit, ...restProps }: AccountProfileDetailsProps) => {
   const { profile, firstLoading } = useAuth()

   const form = useForm<EditProfileFormValues>({
      defaultValues: {
         name: profile.name,
         phone: profile.phone,
         email: profile.email,
         username: profile.username
      },
      resolver: yupResolver(schema)
   })
   const {
      control,
      handleSubmit,
      formState: { isSubmitting }
   } = form

   const handleSave = async (values: EditProfileFormValues) => {
      if (onSubmit) await onSubmit(values)
   }
   return (
      <form autoComplete="off" onSubmit={handleSubmit(handleSave)} {...restProps}>
         <Card>
            <CardHeader subheader="The information can be edited" title="Profile" />
            <Divider />
            <CardContent>
               <Grid container columnSpacing={3}>
                  <Grid item md={8} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || firstLoading}
                        control={control}
                        name="name"
                        label="Full name"
                     />
                  </Grid>
                  <Grid item md={4} xs={12}>
                     <CustomTextField
                        disabled={true}
                        control={control}
                        name="username"
                        label="Username"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || firstLoading}
                        control={control}
                        name="email"
                        label="Email"
                     />
                  </Grid>
                  <Grid item md={6} xs={12}>
                     <CustomTextField
                        disabled={isSubmitting || firstLoading}
                        control={control}
                        name="phone"
                        label="Phone number"
                     />
                  </Grid>
               </Grid>
            </CardContent>
            <Divider />
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  p: 2
               }}
            >
               <Button type="submit" color="primary" variant="contained" disabled={isSubmitting}>
                  Save details
               </Button>
            </Box>
         </Card>
      </form>
   )
}
