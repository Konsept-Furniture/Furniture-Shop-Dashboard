import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EventAvailableRoundedIcon from '@mui/icons-material/EventAvailableRounded'
import { Box, Button, Container, Grid, MenuItem, Skeleton, Typography } from '@mui/material'
import { orderApi } from 'api-client'
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
import { downloadFile } from 'utils'
import Head from 'next/head'
import { useSnackbar } from 'notistack'

export interface OrderDetailPageProps {}

const fetcher = (url: string) => {
   return axiosClient.get<any, ResponseData<Order>>(url).then((res: ResponseData<Order>): Order => {
      console.log(res.data)
      return res.data
   })
}
function OrderDetailPage(props: OrderDetailPageProps) {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { orderId } = router.query

   const { data: order, mutate } = useSWR(`orders/${orderId}`, fetcher, {
      revalidateOnFocus: false
   })

   const handleUpdateOrder = async (payload: Partial<Order>) => {
      if (typeof orderId === 'string') {
         try {
            await orderApi.update(orderId, payload).then(res => {
               console.log(res)
               mutate(res.data, true)
               enqueueSnackbar(res.message, {
                  variant: 'success'
               })
            })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   const handleApproveOrder = async () => {
      await handleUpdateOrder({ status: 'DELIVERIED' })
   }
   const handleRejectOrder = async () => {
      await handleUpdateOrder({ status: 'CANCELED' })
   }

   const handleExportInvoice = async () => {
      if (typeof orderId === 'string') {
         try {
            await orderApi.exportBill(orderId).then(res => {
               console.log(res.data)
               downloadFile(res.data, `Invoice-${orderId}.pdf`, 'application/pdf')
            })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   return <>
      <Head>
         <title>Order Details | FurnitureStore Dashboard</title>
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
               <Link href="/orders" passHref legacyBehavior>
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
               {order && (
                  <Grid item sx={{ display: 'flex', gap: 2 }}>
                     <Link href={`/orders/${orderId}/edit`} passHref legacyBehavior>
                        <Button variant="outlined" endIcon={<PencilIcon width={20} />}>
                           Edit
                        </Button>
                     </Link>

                     {order.status === 'PROCESSING' && (
                        <ButtonDropdownMenu label="Actions">
                           <MenuItem
                              onClick={handleApproveOrder}
                              sx={{
                                 color: 'primary'
                              }}
                           >
                              Approve
                           </MenuItem>
                           <MenuItem onClick={handleRejectOrder}>Reject</MenuItem>
                           <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                        </ButtonDropdownMenu>
                     )}
                     {order.status === 'DELIVERIED' && (
                        <ButtonDropdownMenu label="Actions">
                           <MenuItem onClick={handleExportInvoice}>Export Invoice</MenuItem>
                        </ButtonDropdownMenu>
                     )}
                  </Grid>
               )}
            </Grid>
            <Box sx={{ ml: 1, mt: 4 }}>
               <OrderBasicInfoCard order={order} />
            </Box>
            <Box sx={{ ml: 1, mt: 4 }}>
               <OrderLineItemsCard order={order} />
            </Box>
         </Container>
      </Box>
   </>;
}

OrderDetailPage.Layout = DashboardLayout
export default OrderDetailPage
