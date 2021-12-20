import { ChangeEvent, MouseEvent, useState } from 'react'
import IconCOD from '../../assets/IconCOD'
import IconPaypal from '../../assets/IconPaypal'
import PerfectScrollbar from 'react-perfect-scrollbar'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import {
   Avatar,
   Box,
   Card,
   Checkbox,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TablePagination,
   TableRow,
   Typography
} from '@mui/material'
import { getInitials } from '../../utils/get-initials'
import { Order, PaginationParams } from 'models'
import { SeverityPill } from 'components/severity-pill'
import useSWR from 'swr'

export const OrderListResults = ({ pagination, ...rest }: { pagination: PaginationParams }) => {
   const { data: { data: orders } = { data: [] } } = useSWR(
      `orders?page=${pagination.currentPage}&pageSize=${pagination.pageSize}&orderBy=updatedAt-desc`,
      {
         revalidateOnFocus: true
      }
   )
   // const { data: orders = [], pagination } = { data }

   const [selectedOrderIds, setSelectedOrderIds] = useState<string[]>([])
   // const [pagination, setPagination] = useState<PaginationParams>({
   //    totalItems: 10,
   //    totalPages: 1,
   //    currentPage: 1,
   //    pageSize: 10
   // })
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(0)

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

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLimit(Number.parseInt(event.target.value))
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPage(newPage)
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
               <TableCell>Order ID</TableCell>
               {/* <TableCell align="center">Name</TableCell> */}
               {/* <TableCell align="center">Email</TableCell> */}
               <TableCell align="center">Ordered date</TableCell>
               <TableCell align="center">Location</TableCell>
               <TableCell align="center">Price</TableCell>
               <TableCell align="center">Payment Method</TableCell>
               <TableCell align="center">Status</TableCell>
               {/* <TableCell align="center">Action</TableCell> */}
            </TableRow>
         </TableHead>
         <TableBody>
            {orders.slice(0, limit).map((order: Order) => (
               <TableRow
                  hover
                  key={order._id}
                  selected={selectedOrderIds.indexOf(order._id) !== -1}
               >
                  <TableCell padding="checkbox">
                     <Checkbox
                        checked={selectedOrderIds.indexOf(order._id) !== -1}
                        onChange={event => handleSelectOne(order._id)}
                        value="true"
                     />
                  </TableCell>
                  <TableCell>{order._id}</TableCell>
                  {/* FIXME: name */}
                  {/* <TableCell align="left">
                              <Box
                                 sx={{
                                    alignItems: 'center',
                                    display: 'flex'
                                 }}
                              >
                                 <Avatar src={order.avatarUrl} sx={{ mr: 2 }}>
                                    {getInitials(order.name)}
                                 </Avatar>
                                 <Typography color="textPrimary" variant="body1">
                                    {order.deliveryInfo.name}
                                 </Typography>
                              </Box>
                           </TableCell> */}
                  {/* <TableCell align="left">{order.deliveryInfo.email}</TableCell> */}
                  <TableCell align="center">
                     {format(parseISO(order.createdAt), 'dd/MM/yyyy')}
                  </TableCell>
                  <TableCell align="left">
                     {`${order.deliveryInfo.address.street}, ${order.deliveryInfo.address.ward}, ${order.deliveryInfo.address.district}, ${order.deliveryInfo.address.province}`}
                  </TableCell>
                  {/* <TableCell align="left">
                     {order.products.map(product => product)}
                  </TableCell> */}

                  <TableCell align="center">${order.amount.toFixed(2)}</TableCell>
                  <TableCell align="center">
                     {order.payment === 'COD' ? ( <IconCOD width="48" height="48"/>) : (<IconPaypal width="48" height="48"/>)}
                     </TableCell>
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
                  {/* <TableCell align="center">{order.payment}</TableCell> */}
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

OrderListResults.propTypes = {
   // orders: PropTypes.array.isRequired,
   pagination: PropTypes.object.isRequired
}
