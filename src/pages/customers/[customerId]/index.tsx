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
import axiosClient from 'api-client/axios-client'
import { ButtonDropdownMenu } from 'components/button-dropdown-menu'
import { CustomerBasicInfoCard } from 'components/customer'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import PencilIcon from 'icons/pencil'
import { ResponseData, User } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import { getInitials } from 'utils'

export interface CustomerDetailPageProps {}

const fetcher = (url: string) => {
   return axiosClient.get<any, ResponseData<User>>(url).then((res: ResponseData<User>): User => {
      return res.data
   })
}
function CustomerDetailPage(props: CustomerDetailPageProps) {
   const router = useRouter()
   const { customerId } = router.query

   const { data: customer } = useSWR(`users/${customerId}`, fetcher, {
      revalidateOnFocus: false
   })

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
                  <Grid item sx={{ display: 'flex', gap: 2 }}>
                     <Link href={`${customerId}/edit`} passHref>
                        <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                           Edit
                        </Button>
                     </Link>

                     <ButtonDropdownMenu label="Action">
                        <MenuItem>Approve</MenuItem>
                        <MenuItem>Reject</MenuItem>
                        <MenuItem>Export bill</MenuItem>
                     </ButtonDropdownMenu>
                  </Grid>
               </Grid>

               <Box sx={{ ml: 1, mt: 4 }}>
                  <CustomerBasicInfoCard customer={customer} />
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
                           <Button variant="outlined" color="error">
                              Delete Account
                           </Button>
                           <Typography variant="body2" color="textSecondary">
                              Remove this customer’s chart if he/she requested that, if not please
                              be aware that what has been deleted can never brought back
                           </Typography>
                        </Box>
                     </CardContent>
                  </Card>
               </Box>
            </Container>
         </Box>
      </>
   )
}

CustomerDetailPage.Layout = DashboardLayout
export default CustomerDetailPage
