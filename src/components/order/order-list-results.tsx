import {
   Avatar,
   Box,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel
} from '@mui/material'
import { SeverityPill } from 'components/severity-pill'
import { format, parseISO } from 'date-fns'
import { Order, PaginationParams, ProductOrder } from 'models'
import { useState } from 'react'

type HeadCell = {
   id: string
   align: 'left' | 'center' | 'right' | 'justify' | 'inherit'
   label: string
   sortable: boolean
}
const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Customer',
      sortable: false
   },
   {
      id: 'products',
      align: 'left',
      label: 'Products',
      sortable: false
   },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Ordered date',
      sortable: true
   },
   {
      id: 'amount',
      align: 'center',
      label: 'Price',
      sortable: true
   },
   {
      id: 'payment',
      align: 'center',
      label: 'Payment Method',
      sortable: false
   },
   {
      id: 'status',
      align: 'center',
      label: 'Status',
      sortable: false
   }
]

export const OrderListResults = ({
   orderList,
   pagination,
   onRowClick,
   onSortByColumn,
   ...rest
}: {
   orderList?: Order[]
   pagination: PaginationParams
   onRowClick: (order: Order) => void
   onSortByColumn: Function
}) => {
   const [order, setOrder] = useState<'asc' | 'desc'>('asc')
   const [orderBy, setOrderBy] = useState('')

   const handleSort = (property: string) => async (event: React.MouseEvent) => {
      const isAsc = orderBy === property && order === 'asc'
      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
      onSortByColumn(`${property}-${isAsc ? 'desc' : 'asc'}`)
   }
   return (
      <Table {...rest}>
         <TableHead>
            <TableRow>
               {headCells.map(cell => (
                  <TableCell
                     key={cell.id}
                     align={cell.align}
                     sortDirection={orderBy === cell.id ? order : false}
                  >
                     {cell.sortable ? (
                        <TableSortLabel
                           active={orderBy === cell.id}
                           direction={orderBy === cell.id ? order : 'asc'}
                           onClick={handleSort(cell.id)}
                        >
                           {cell.label}
                        </TableSortLabel>
                     ) : (
                        cell.label
                     )}
                  </TableCell>
               ))}
            </TableRow>
         </TableHead>
         <TableBody>
            {orderList
               ? orderList.map((order: Order) => (
                    <TableRow hover key={order._id} onClick={async () => await onRowClick(order)}>
                       <TableCell align="left" sx={{ minWidth: 200 }}>
                          {order.deliveryInfo.name}
                       </TableCell>
                       <TableCell align="left">
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                             {order.products.map(product => (
                                <Avatar
                                   key={product.productId}
                                   variant="rounded"
                                   src={product.img}
                                ></Avatar>
                             ))}
                          </Box>
                       </TableCell>
                       <TableCell align="center">
                          {format(parseISO(order.createdAt), 'dd/MM/yyyy')}
                       </TableCell>
                       <TableCell align="center">${order.amount.toFixed(2)}</TableCell>
                       <TableCell align="center">{order.payment}</TableCell>
                       <TableCell align="center" sx={{ minWidth: 200 }}>
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
               : Array.from(new Array(pagination.pageSize)).map((item, idx) => (
                    <TableRow hover key={idx}>
                       <TableCell align="left">
                          <Skeleton variant="text" />
                       </TableCell>
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
   )
}
