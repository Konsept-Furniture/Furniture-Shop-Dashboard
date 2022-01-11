import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Avatar, Box, Button, Chip, Container, Grid, Skeleton, Typography } from '@mui/material'
import { customerApi } from 'api-client'
import axiosClient from 'api-client/axios-client'
import { CustomerBasicInfoCardEdit } from 'components/customer'
import { DashboardLayout } from 'components/layouts'
import { ResponseData, User } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { getInitials } from 'utils'

export interface EditCustomerPageProps {}

const fetcher = (url: string) => {
   return axiosClient.get<any, ResponseData<User>>(url).then((res: ResponseData<User>): User => {
      return res.data
   })
}
const EditCustomerPage = (props: EditCustomerPageProps) => {
   const router = useRouter()
   const { customerId } = router.query

   const { data: customer, mutate } = useSWR(`users/${customerId}`, fetcher, {
      revalidateOnFocus: false
   })

   const handleUpdateBasicInfo = async (payload: Partial<User>) => {
      if (typeof customerId === 'string') {
         try {
            await customerApi.update(customerId, payload).then(res => {
               console.log(res)
               mutate(res.data, true)
               router.push(`/customers/${customerId}`)
            })
         } catch (error) {
            console.log('error to update customer', error)
         }
      }
   }
   const handleDeleteCustomer = async () => {
      if (typeof customerId === 'string') {
         try {
            await customerApi.delete(customerId).then(res => {
               console.log(res)
               router.push('/customers')
            })
         } catch (error) {
            console.log('error to delete customer', error)
         }
      }
   }

   return (
      <>
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
                  <Link href="/customers" passHref>
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
                              {getInitials(customer.name)}
                           </Avatar>
                           <Box sx={{ flex: 1 }}>
                              <Typography variant="h4">{customer.email}</Typography>
                              <Typography
                                 variant="subtitle2"
                                 sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
                              >
                                 user_id: <Chip size="small" label={customer._id} />
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
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <CustomerBasicInfoCardEdit
                     customer={customer}
                     onSave={handleUpdateBasicInfo}
                     onDelete={handleDeleteCustomer}
                  />
               </Box>
            </Container>
         </Box>
      </>
   )
}

EditCustomerPage.Layout = DashboardLayout

export default EditCustomerPage
