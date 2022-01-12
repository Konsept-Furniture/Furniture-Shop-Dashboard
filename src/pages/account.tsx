import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import { AccountProfile, AccountProfileDetails } from 'components/account'
import { useAuth } from 'hooks'
import { ChangePasswordFormValues, User } from 'models'
import { authApi } from 'api-client'
import { SettingsPassword } from 'components/settings/settings-password'
import { DashboardLayout } from 'components/layouts'

const Account = () => {
   const { updateProfile } = useAuth()

   const handleUpdateAccount = async (payload: Partial<User>) => {
      try {
         await updateProfile(payload)
      } catch (error) {
         console.log('error to update profile', error)
      }
   }
   const handleChangePassword = async (payload: ChangePasswordFormValues) => {
      try {
         await authApi.changePassword(payload).then(res => {
            console.log(res)
         })
      } catch (error) {
         console.log('error to update profile', error)
      }
   }

   return (
      <>
         <Head>
            <title>Account | FurnitureStore</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth="lg">
               <Typography sx={{ mb: 3 }} variant="h4">
                  Account
               </Typography>
               <Grid container spacing={3}>
                  <Grid item lg={12} md={6} xs={12}>
                     <AccountProfileDetails onSubmit={handleUpdateAccount} />
                  </Grid>
                  <Grid item lg={12} md={6} xs={12}>
                     <SettingsPassword onSubmit={handleChangePassword} />
                     {/* <AccountProfile /> */}
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </>
   )
}

Account.Layout = DashboardLayout

export default Account
