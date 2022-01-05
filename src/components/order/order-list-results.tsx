import { Checkbox, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { SeverityPill } from 'components/severity-pill'
import { format, parseISO } from 'date-fns'
import { Order, PaginationParams } from 'models'
import { ChangeEvent, useState } from 'react'

export const OrderListResults = ({
   orders,
   pagination,
   onRowClick,
   ...rest
}: {
   orders: Order[]
   pagination: PaginationParams
   onRowClick: (order: Order) => void
}) => {
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
      <Table>
         <TableHead>
            <TableRow>
               <TableCell padding="checkbox">
                  <Checkbox
                     checked={selectedOrderIds.length === orders.length}
                     color="primary"
                     indeterminate={
                        selectedOrderIds.length > 0 && selectedOrderIds.length < orders.length
                     }
                     onChange={handleSelectAll}
                  />
               </TableCell>
               {/* <TableCell>Order ID</TableCell> */}
               {/* <TableCell align="center">Name</TableCell> */}
               {/* <TableCell align="center">Email</TableCell> */}
               <TableCell align="center">Ordered date</TableCell>
               {/* <TableCell align="center">Location</TableCell> */}
               <TableCell align="center">Price</TableCell>
               <TableCell align="center">Payment Method</TableCell>
               <TableCell align="center">Status</TableCell>
               {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
         </TableHead>
         <TableBody>
            {orders &&
               orders.map((order: Order) => (
                  <TableRow
                     hover
                     key={order._id}
                     selected={selectedOrderIds.indexOf(order._id) !== -1}
                     onClick={async () => await onRowClick(order)}
                  >
                     <TableCell padding="checkbox">
                        <Checkbox
                           checked={selectedOrderIds.indexOf(order._id) !== -1}
                           onChange={event => handleSelectOne(order._id)}
                           value="true"
                        />
                     </TableCell>
                     <TableCell align="center">
                        {format(parseISO(order.createdAt), 'dd/MM/yyyy')}
                     </TableCell>
                     <TableCell align="center">${order.amount.toFixed(2)}</TableCell>
                     <TableCell align="center">{order.payment}</TableCell>
                     <TableCell align="center">
                        <SeverityPill
                           color={
                              (order.status === 'DELIVERIED' && 'success') ||
                              (order.status === 'REFUNDED' && 'error') ||
                              (order.status === 'PROCESSING' && 'primary') ||
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
   )
}
