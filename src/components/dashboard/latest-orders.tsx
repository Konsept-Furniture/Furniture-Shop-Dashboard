import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import {
   Box,
   Button,
   Card,
   CardHeader,
   Checkbox,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip
} from '@mui/material'
import { format, parseISO } from 'date-fns'
import { Order } from 'models/order'
import NextLink from 'next/link'
import { ChangeEvent, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR from 'swr'
import { v4 as uuid } from 'uuid'
import { SeverityPill } from '../severity-pill'

const NUMBER_ORDERS: number = 6

export const LatestOrders = (props: any) => {
   const { data: orders = [] } = useSWR(
      `orders?page=1&pageSize=${NUMBER_ORDERS}&orderBy=updatedAt-desc`,
      {
         revalidateOnFocus: true
      }
   )
   console.log('🚀 ~ file: latest-orders.tsx ~ line 94 ~ LatestOrders ~ orders', orders)

   const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])

   const handleSelectAll = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      let newSelectedOrderIds: string[]

      if (event.target.checked) {
         newSelectedOrderIds = orders.map((order: Order) => order._id)
      } else {
         newSelectedOrderIds = []
      }

      setSelectedOrderIds(newSelectedOrderIds)
   }

   const handleSelectOne = (id: string) => {
      const selectedIndex = selectedOrderIds.indexOf(id)
      let newSelectedOrderIds: string[] = []

      if (selectedIndex === -1) {
         newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds, id)
      } else if (selectedIndex === 0) {
         newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(1))
      } else if (selectedIndex === selectedOrderIds.length - 1) {
         newSelectedOrderIds = newSelectedOrderIds.concat(selectedOrderIds.slice(0, -1))
      } else if (selectedIndex > 0) {
         newSelectedOrderIds = newSelectedOrderIds.concat(
            selectedOrderIds.slice(0, selectedIndex),
            selectedOrderIds.slice(selectedIndex + 1)
         )
      }

      setSelectedOrderIds(newSelectedOrderIds)
   }
   return (
      // TODO: đổi field userId trong
      <Card {...props}>
         <CardHeader title="Latest Orders" />
         <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell padding="checkbox">
                           <Checkbox
                              checked={selectedOrderIds.length === orders?.length}
                              color="primary"
                              indeterminate={
                                 selectedOrderIds.length > 0 &&
                                 selectedOrderIds.length < orders.length
                              }
                              onChange={handleSelectAll}
                           />
                        </TableCell>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell sortDirection="desc">
                           <Tooltip enterDelay={300} title="Sort">
                              <TableSortLabel active direction="desc">
                                 Date
                              </TableSortLabel>
                           </Tooltip>
                        </TableCell>
                        <TableCell>Status</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {orders &&
                        orders.map((order: Order) => (
                           <TableRow
                              hover
                              key={order._id}
                              onClick={event => handleSelectOne(order._id)}
                           >
                              <TableCell padding="checkbox">
                                 <Checkbox
                                    checked={selectedOrderIds.indexOf(order._id) !== -1}
                                    onChange={event => handleSelectOne(order._id)}
                                    value="true"
                                 />
                              </TableCell>
                              <TableCell>{order._id}</TableCell>
                              <TableCell>{order.deliveryInfo.name}</TableCell>
                              <TableCell>
                                 {format(parseISO(order.createdAt), 'dd/MM/yyyy')}
                              </TableCell>
                              <TableCell>
                                 <SeverityPill
                                    color={
                                       (order.status === 'DELIVERIED' && 'success') ||
                                       (order.status === 'REFUNDED' && 'error') ||
                                       'warning'
                                    }
                                 >
                                    {order.status}
                                 </SeverityPill>
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
