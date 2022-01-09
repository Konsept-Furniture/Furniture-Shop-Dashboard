import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
   Box,
   Button,
   Card,
   CardHeader,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow
} from '@mui/material'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Order } from 'models/order'
import NextLink from 'next/link'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR from 'swr'
import { SeverityPill } from '../severity-pill'

const NUMBER_ORDERS: number = 6

export const LatestOrders = (props: any) => {
   const { data: orders } = useSWR(
      `orders?page=1&pageSize=${NUMBER_ORDERS}&orderBy=createdAt-desc`,
      {
         revalidateOnFocus: true
      }
   )

   return (
      <Card {...props}>
         <CardHeader title="Latest Orders" />
         <PerfectScrollbar>
            <Box>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Customer</TableCell>
                        <TableCell align="center">Time Flies</TableCell>
                        <TableCell align="center">Payment</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Status</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders
                        ? orders.map((order: Order) => (
                             <TableRow hover key={order._id}>
                                <TableCell align="left">{order.deliveryInfo.name}</TableCell>
                                <TableCell align="center">
                                   {formatDistanceToNow(parseISO(order.createdAt), {
                                      addSuffix: true
                                   })}
                                </TableCell>
                                <TableCell align="center">{order.payment}</TableCell>
                                <TableCell align="center">${order.amount.toFixed(2)}</TableCell>
                                <TableCell align="center">
                                   <SeverityPill
                                      color={
                                         {
                                            PENDING: 'info',
                                            DELIVERIED: 'secondary',
                                            REFUNDED: 'error',
                                            PROCESSING: 'primary',
                                            CANCELED: 'warning'
                                         }[order.status || 'PENDING']
                                      }
                                   >
                                      {order.status}
                                   </SeverityPill>
                                </TableCell>
                             </TableRow>
                          ))
                        : Array.from(new Array(NUMBER_ORDERS)).map((item, idx) => (
                             <TableRow hover key={idx}>
                                <TableCell align="left">
                                   <Skeleton variant="text" />
                                </TableCell>
                                <TableCell align="center">
                                   <Skeleton variant="text" />
                                </TableCell>
                                <TableCell align="center">
                                   <Skeleton variant="text" />
                                </TableCell>
                                <TableCell align="center">
                                   <Skeleton variant="text" />
                                </TableCell>
                                <TableCell align="center">
                                   <Skeleton variant="text" />
                                </TableCell>
                             </TableRow>
                          ))}
                  </TableBody>
               </Table>
            </Box>
         </PerfectScrollbar>
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <NextLink href={'/orders'} passHref>
               <Button
                  color="primary"
                  endIcon={<ArrowRightIcon fontSize="small" />}
                  size="small"
                  variant="text"
               >
                  View all
               </Button>
            </NextLink>
         </Box>
      </Card>
   )
}
