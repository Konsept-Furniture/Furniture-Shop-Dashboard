import { Box, Card, CardContent, CardHeader, Divider } from '@mui/material'
import { OrderListResults } from 'components/order/order-list-results'
import React from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

export interface CustomerOrderListCardProps {}

export function CustomerOrderListCard(props: CustomerOrderListCardProps) {
   return (
      <Card>
         <CardHeader title="Recent orders" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            <PerfectScrollbar>
               <Box sx={{ width: '100%' }}>{/* <OrderListResults orderList={orderList}/> */}</Box>
            </PerfectScrollbar>
         </CardContent>
      </Card>
   )
}
