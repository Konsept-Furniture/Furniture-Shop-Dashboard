import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import {
   Avatar,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Chip,
   Container,
   Divider,
   Grid,
   MenuItem,
   Skeleton,
   Typography
} from '@mui/material'
import { customerApi } from 'api-client'
import axiosClient from 'api-client/axios-client'

import PencilIcon from 'icons/pencil'
import { ResponseData, User } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import useSWR from 'swr'
import { getInitials } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ConfirmDialog } from 'components/product/confirm-dialog'
import ReportProblemIcon from '@mui/icons-material/ReportProblem'
import CustomerBasicInfoCard from 'components/customer/customer-basic-info-card'
import CustomerOrderListCard from 'components/customer/customer-order-list-card'
import userApi from 'api/userApi'
import DashboardLayout from 'components/layouts/dashboard-layout'
// export interface CustomerDetailPageProps {}

// const fetcher = (url: string) => {
//    return axiosClient.get<any, ResponseData<User>>(url).then((res: ResponseData<User>): User => {
//       return res.data
//    })
// }

// const customer = {
//    id: 1,
//    status: 1,
//    created_at: '2022-12-01T12:05:59Z',
//    updated_at: '2023-01-01T05:23:47Z',
//    email: 'binhdinhqt137@gmail.com',
//    last_name: 'Binh',
//    first_name: 'Thai',
//    phone: '',
//    role: 'user',
//    items: null,
//    favourites: null,
//    addresses: null
// }
function CustomerDetailPage(props) {
   const { enqueueSnackbar } = useSnackbar()
   const [openConfirmDialog, setOpenConfirmDialog] = useState(false)
   const router = useRouter()
   const { customerId } = router.query
   const [customer, setCustomer] = useState()

   // const { data: customer } = useSWR(`users/${customerId}`, fetcher, {
   //    revalidateOnFocus: false
   // })

   useEffect(() => {
      if (!customerId) {
         return
      }
      const getUsers = async () => {
         const { response, err } = await userApi.getDetaiUser(customerId)
         if (err) {
            enqueueSnackbar(err.message, {
               variant: 'error'
            })
         }
         setCustomer(response.data)
      }
      getUsers()
   }, [customerId])

   const handleDeleteCustomer = async () => {
      const deleteUser = async () => {
         const { response, err } = await userApi.delete(customerId)
         if (err) {
            enqueueSnackbar(err.message, {
               variant: 'error'
            })
            return
         }
         setCustomer(response.data)
      }
      deleteUser()
      enqueueSnackbar('Delete successfully', {
         variant: 'success'
      })
      router.push('/customers')
   }

   return (
      <>
         <Head>
            <title>Customer Details | FurnitureStore Dashboard</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               pt: 6,
               pb: 12,
               px: 6
            }}
         >
            <Container maxWidth={false}>
               <Box
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap'
                  }}
               >
                  <Link href="/customers" passHref legacyBehavior>
                     <Button variant="text" startIcon={<ArrowBackIcon />}>
                        Customers
                     </Button>
                  </Link>
               </Box>
               <Grid
                  container
                  sx={{
                     mt: 1,
                     alignItems: 'center',
                     justifyContent: 'space-between'
                  }}
               >
                  {customer ? (
                     <Grid item sx={{ m: 1 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                           <Avatar sx={{ width: 56, height: 56 }} src="">
                              {getInitials(customer.first_name + ' ' + customer.last_name)}
                           </Avatar>
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="h4">{customer.email || 'N/A'}</Typography>
                              <Typography
                                 variant="subtitle2"
                                 sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                              >
                                 user_id: <Chip size="small" label={customer.id} />
                              </Typography>
                           </Box>
                        </Box>
                     </Grid>
                  ) : (
                     <Grid item>
                        <Typography sx={{ m: 1 }} variant="h4">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                        <Typography sx={{ m: 1 }} variant="body2" color="textSecondary">
                           <Skeleton variant="text" width="300px" />
                        </Typography>
                     </Grid>
                  )}
                  <Grid item sx={{ display: 'flex', gap: 2 }}>
                     <Link href={`/customers/${customerId}/edit`} passHref legacyBehavior>
                        <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                           Edit
                        </Button>
                     </Link>
                  </Grid>
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <CustomerBasicInfoCard customer={customer} />
               </Box>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <CustomerOrderListCard />
               </Box>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <Card>
                     <CardHeader title="Data management" />
                     <Divider />
                     <CardContent>
                        <Box
                           sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'start',
                              gap: 1
                           }}
                        >
                           <Button
                              variant="outlined"
                              color="error"
                              onClick={() => setOpenConfirmDialog(true)}
                           >
                              Delete Account
                           </Button>
                           <Typography variant="body2" color="textSecondary">
                              Remove this customer’s account if he/she requested that, if not please
                              be aware that what has been deleted can never brought back.
                           </Typography>
                        </Box>
                     </CardContent>
                  </Card>

                  <ConfirmDialog
                     icon={
                        <Avatar
                           sx={{ bgcolor: 'rgba(209, 67, 67, 0.08)', color: 'rgb(209, 67, 67)' }}
                        >
                           <ReportProblemIcon />
                        </Avatar>
                     }
                     isOpen={openConfirmDialog}
                     title="Are you sure?"
                     body="Are you sure to delete this customer?"
                     onSubmit={handleDeleteCustomer}
                     onClose={() => setOpenConfirmDialog(false)}
                  />
               </Box>
            </Container>
         </Box>
      </>
   )
}

CustomerDetailPage.Layout = DashboardLayout
export default CustomerDetailPage
