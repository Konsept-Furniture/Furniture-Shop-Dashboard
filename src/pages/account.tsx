import Head from 'next/head'
import { Box, Container, Grid, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { AccountProfile, AccountProfileDetails } from 'components/account'
import { useAuth } from 'hooks'
import { User } from 'models'

const Account = () => {
   const { updateProfile } = useAuth()

   const handleUpdateAccount = async (payload: Partial<User>) => {
      try {
         await updateProfile(payload)
      } catch (error) {}
   }
   return (
      <>
         <Head>
            <title>Account | FlowerShop</title>
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
                  <Grid item lg={4} md={6} xs={12}>
                     <AccountProfile />
                  </Grid>
                  <Grid item lg={8} md={6} xs={12}>
                     <AccountProfileDetails onSubmit={handleUpdateAccount} />
                  </Grid>
               </Grid>
            </Container>
         </Box>
      </>
   )
}

Account.Layout = DashboardLayout

export default Account
