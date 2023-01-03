import { Box, Container, Grid } from '@mui/material'
import { DashboardCards, LatestOrders, LatestProducts, Sales } from 'components/dashboard'
import DashboardLayout from 'components/layouts/dashboard-layout'
import Head from 'next/head'

const Dashboard = () => (
   <>
      <Head>
         <title>Dashboard | FurnitureStore</title>
      </Head>
      <Box
         component="main"
         sx={{
            flexGrow: 1,
            py: 8
         }}
      >
         <Container maxWidth={false}>
            <Grid container spacing={3}>
               <DashboardCards />
               <Grid item lg={12} md={12} xl={9} xs={12}>
                  <Sales />
               </Grid>
               {/* <Grid item lg={4} md={6} xl={3} xs={12}>
                  <LatestProducts sx={{ height: '100%' }} />
               </Grid>
               <Grid item lg={8} md={12} xl={12} xs={12}>
                  <LatestOrders />
               </Grid> */}
            </Grid>
         </Container>
      </Box>
   </>
)

Dashboard.Layout = DashboardLayout

export default Dashboard
