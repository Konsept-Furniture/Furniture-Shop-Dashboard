import {
   Avatar,
   Card,
   CardContent,
   CardHeader,
   Divider,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import { Order, ProductOrder } from 'models'
import React from 'react'

export interface OrderLineItemsCardProps {
   order?: Order
}

export function OrderLineItemsCard({ order }: OrderLineItemsCardProps) {
   return (
      <Card>
         <CardHeader title="Line items" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            <Table>
               <TableHead>
                  <TableRow>
                     <TableCell>PRODUCT</TableCell>
                     <TableCell align="center">QUANTITY</TableCell>
                     <TableCell align="center">AMOUNT</TableCell>
                  </TableRow>
               </TableHead>
               <TableBody>
                  {order
                     ? order.products.map(item => (
                          <TableRow hover key={item.productId}>
                             <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                   <Avatar variant="rounded" src={item.img}></Avatar>
                                   <Typography variant="body2">{item.title}</Typography>
                                </Box>
                             </TableCell>
                             <TableCell align="center">{item.quantity}</TableCell>
                             <TableCell align="center">${item.amount.toFixed(2)}</TableCell>
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
                          </TableRow>
                       ))}
               </TableBody>
            </Table>
         </CardContent>
      </Card>
   )
}
