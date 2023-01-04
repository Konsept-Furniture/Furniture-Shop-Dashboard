import {
   Avatar,
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Tooltip,
   Typography
} from '@mui/material'
import { OrderListResults } from 'components/order/order-list-results'
import { SeverityPill } from 'components/severity-pill'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import Link from 'next/link'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useEffect, useState } from 'react'
import userApi from 'api/userApi'
// export interface CustomerOrderListCardProps {}

const CustomerOrderListCard = props => {
   const router = useRouter()
   const { customerId } = router.query
   const [orders, setOrders] = useState([])

   useEffect(() => {
      const listUserOrder = async () => {
         const { response, err } = await userApi.listOrderByUserId(7)

         if (err) {
            enqueueSnackbar(err.message, {
               variant: 'error'
            })
            return
         }

         console.log(response.data)
         setOrders(response.data)
      }
      listUserOrder()
   }, [customerId])

   return (
      <Card>
         <CardHeader title="Recent orders" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            <PerfectScrollbar>
               <Box sx={{ width: '100%' }}>
                  <Table>
                     <TableHead>
                        <TableRow>
                           <TableCell align="center">Order Date</TableCell>
                           <TableCell>Products</TableCell>
                           <TableCell align="center">Amount</TableCell>
                           <TableCell align="center">Payment</TableCell>
                           <TableCell align="center">Status</TableCell>
                           <TableCell align="center">Actions</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {orders
                           ? orders.map(order => (
                                <TableRow hover key={order.id}>
                                   <TableCell align="center">
                                      {format(parseISO(order.created_at), 'dd/MM/yyyy')}
                                   </TableCell>
                                   <TableCell align="left">
                                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                         {order.items.slice(0, 3).map(product => (
                                            <Tooltip
                                               key={product.id}
                                               title={product.food_origin?.name}
                                               placement="top"
                                            >
                                               <Avatar
                                                  variant="rounded"
                                                  src={product.food_origin?.images.url}
                                               />
                                            </Tooltip>
                                         ))}
                                         {order.items.length > 3 && (
                                            <Tooltip title="and more..." placement="top">
                                               <Box sx={{ height: '100%' }}>
                                                  <Typography>...</Typography>
                                               </Box>
                                            </Tooltip>
                                         )}
                                      </Box>
                                   </TableCell>
                                   <TableCell align="center">
                                      ${order.total_price.toFixed(2)}
                                   </TableCell>
                                   <TableCell align="center">{order.payment || 'COD'}</TableCell>
                                   <TableCell align="center" sx={{ minWidth: 200 }}>
                                      <SeverityPill
                                         color={
                                            {
                                               pending: 'info',
                                               delivered: 'secondary',
                                               cancel: 'error',
                                               preparing: 'primary',
                                               on_the_way: 'warning'
                                               //   }[order.tracking_state]
                                            }[order.tracking_state]
                                         }
                                      >
                                         {
                                            {
                                               pending: 'PENDING',
                                               delivered: 'DELIVERED',
                                               cancel: 'CANCEL',
                                               preparing: 'PREPARING',
                                               on_the_way: 'SHIPPING'
                                               //   }[order.tracking_state]
                                            }['on_the_way']
                                         }
                                      </SeverityPill>
                                   </TableCell>
                                   <TableCell align="center">
                                      <Link
                                         href={`/orders/${order._id}/edit`}
                                         passHref
                                         legacyBehavior
                                      >
                                         <Tooltip title="Edit Order" placement="top">
                                            <IconButton size="small">
                                               <PencilIcon width={20} />
                                            </IconButton>
                                         </Tooltip>
                                      </Link>
                                      <Link href={`/orders/${order._id}`} passHref legacyBehavior>
                                         <Tooltip title="View Details" placement="top">
                                            <IconButton size="small">
                                               <ArrowForwardIcon fontSize="small" />
                                            </IconButton>
                                         </Tooltip>
                                      </Link>
                                   </TableCell>
                                </TableRow>
                             ))
                           : Array.from(new Array(3)).map((i, idx) => (
                                <TableRow key={idx}>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                   <TableCell>
                                      <Skeleton variant="text" />
                                   </TableCell>
                                </TableRow>
                             ))}
                     </TableBody>
                  </Table>
               </Box>
            </PerfectScrollbar>
         </CardContent>
      </Card>
   )
}

export default CustomerOrderListCard
