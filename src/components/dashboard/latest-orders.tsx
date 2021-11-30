import { format } from 'date-fns'
import { v4 as uuid } from 'uuid'
import PerfectScrollbar from 'react-perfect-scrollbar'
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
   Tooltip,
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { SeverityPill } from '../severity-pill'
import NextLink from 'next/link'
import { ChangeEvent, useState } from 'react'

const orders = [
   {
      id: uuid(),
      ref: 'CDD1049',
      amount: 30.5,
      customer: {
         name: 'Ekaterina Tankova',
      },
      createdAt: 1555016400000,
      status: 'pending',
   },
   {
      id: uuid(),
      ref: 'CDD1048',
      amount: 25.1,
      customer: {
         name: 'Cao Yu',
      },
      createdAt: 1555016400000,
      status: 'delivered',
   },
   {
      id: uuid(),
      ref: 'CDD1047',
      amount: 10.99,
      customer: {
         name: 'Alexa Richardson',
      },
      createdAt: 1554930000000,
      status: 'refunded',
   },
   {
      id: uuid(),
      ref: 'CDD1046',
      amount: 96.43,
      customer: {
         name: 'Anje Keizer',
      },
      createdAt: 1554757200000,
      status: 'pending',
   },
   {
      id: uuid(),
      ref: 'CDD1045',
      amount: 32.54,
      customer: {
         name: 'Clarke Gillebert',
      },
      createdAt: 1554670800000,
      status: 'delivered',
   },
   {
      id: uuid(),
      ref: 'CDD1044',
      amount: 16.76,
      customer: {
         name: 'Adam Denisov',
      },
      createdAt: 1554670800000,
      status: 'delivered',
   },
]

export const LatestOrders = (props: any) => {
   const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])

   const handleSelectAll = (event: ChangeEvent<HTMLInputElement>, checked: boolean) => {
      let newSelectedOrderIds: string[]

      if (event.target.checked) {
         newSelectedOrderIds = orders.map(order => order.id)
      } else {
         newSelectedOrderIds = []
      }

      setSelectedOrderIds(newSelectedOrderIds)
   }

   const handleSelectOne = (event: ChangeEvent<HTMLInputElement>, id: string) => {
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
            selectedOrderIds.slice(selectedIndex + 1),
         )
      }

      setSelectedOrderIds(newSelectedOrderIds)
   }
   return (
      <Card {...props}>
         <CardHeader title="Latest Orders" />
         <PerfectScrollbar>
            <Box sx={{ minWidth: 800 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell padding="checkbox">
                           <Checkbox
                              checked={selectedOrderIds.length === orders.length}
                              color="primary"
                              indeterminate={
                                 selectedOrderIds.length > 0 &&
                                 selectedOrderIds.length < orders.length
                              }
                              onChange={handleSelectAll}
                           />
                        </TableCell>
                        <TableCell>Order Ref</TableCell>
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
                     {orders.map(order => (
                        <TableRow hover key={order.id}>
                           <TableCell padding="checkbox">
                              <Checkbox
                                 checked={selectedOrderIds.indexOf(order.id) !== -1}
                                 onChange={event => handleSelectOne(event, order.id)}
                                 value="true"
                              />
                           </TableCell>
                           <TableCell>{order.ref}</TableCell>
                           <TableCell>{order.customer.name}</TableCell>
                           <TableCell>{format(order.createdAt, 'dd/MM/yyyy')}</TableCell>
                           <TableCell>
                              <SeverityPill
                                 color={
                                    (order.status === 'delivered' && 'success') ||
                                    (order.status === 'refunded' && 'error') ||
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
               p: 2,
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
