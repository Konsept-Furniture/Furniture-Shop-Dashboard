import Head from 'next/head'
import { Box, Container } from '@mui/material'
import { CustomerListResults } from '../components/customer/customer-list-results'
import { CustomerListToolbar } from '../components/customer/customer-list-toolbar'
import { customers } from '../__mocks__/customers'
import { DashboardLayout } from 'components/layouts/dashboard-layout'

const Customers = () => {
   return (
      <>
         <Head>
            <title>Customers | FlowerShop</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <CustomerListToolbar />
               <Box sx={{ mt: 3 }}>
                  <CustomerListResults customers={customers} />
               </Box>
            </Container>
         </Box>
      </>
   )
}
Customers.Layout = DashboardLayout

export default Customers
