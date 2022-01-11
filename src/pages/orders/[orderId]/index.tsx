import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { Box, Button, Container, Grid, MenuItem, Skeleton, Typography } from '@mui/material'
import axiosClient from 'api-client/axios-client'
import { ButtonDropdownMenu } from 'components/button-dropdown-menu'
import { DashboardLayout } from 'components/layouts'
import { OrderBasicInfoCard } from 'components/order/order-basic-info-card'
import { OrderLineItemsCard } from 'components/order/order-line-items-card'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import { Order, ResponseData } from 'models'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'

export interface OrderDetailPageProps {}

const fetcher = (url: string) => {
   return axiosClient.get<any, ResponseData<Order>>(url).then((res: ResponseData<Order>): Order => {
      console.log(res.data)
      return res.data
   })
}
function OrderDetailPage(props: OrderDetailPageProps) {
   const router = useRouter()
   const { orderId } = router.query

   const { data: order } = useSWR(`orders/${orderId}`, fetcher, {
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
                  <Link href="/orders" passHref>
                     <Button variant="text" startIcon={<ArrowBackIcon />}>
                        Orders
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
                  {order ? (
                     <Grid item sx={{ m: 1 }}>
                        <Typography variant="h4">#{order._id}</Typography>
                        <Typography
                           variant="body2"
                           color="textSecondary"
                           sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}
                        >
                           Placed on
                           <EventAvailableRoundedIcon />
                           {format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm')}
                        </Typography>
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
                     <Link href={`${orderId}/edit`} passHref>
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
                  <OrderBasicInfoCard order={order} />
               </Box>
               <Box sx={{ ml: 1, mt: 4 }}>
                  <OrderLineItemsCard order={order} />
               </Box>
            </Container>
         </Box>
      </>
   )
}

OrderDetailPage.Layout = DashboardLayout
export default OrderDetailPage
