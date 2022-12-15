import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import {
   Avatar,
   Box,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   TableSortLabel,
   Tooltip,
   Typography
} from '@mui/material'
import { format, parseISO } from 'date-fns'
import PencilIcon from 'icons/pencil'
import { HeadCell, PaginationParams, User } from 'models'
import Link from 'next/link'
import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { getInitials } from '../../utils/get-initials'

const headCells: HeadCell[] = [
   {
      id: 'name',
      align: 'left',
      label: 'Customer',
      sortable: false
   },
   {
      id: 'email',
      align: 'left',
      label: 'Email',
      sortable: false
   },
   {
      id: 'phone',
      align: 'center',
      label: 'Phone Number',
      sortable: false
   },
   {
      id: 'createdAt',
      align: 'center',
      label: 'Registration Date',
      sortable: true
   },
   {
      id: 'orderCount',
      align: 'center',
      label: 'Orders',
      sortable: false
   },
   {
      id: 'amountTotal',
      align: 'center',
      label: 'Spent',
      sortable: false
   },
   {
      id: 'actions',
      align: 'center',
      label: 'Actions',
      sortable: false
   }
]
export const CustomerListResults = ({
   customerList,
   pagination,
   onSortByColumn,
   ...rest
}: {
   customerList?: User[]
   pagination: PaginationParams
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
   function randomColor() {
      let backgroundColor = [
         '#ab000d',
         '#5c007a',
         '#00227b',
         '#00701a',
         '#8c9900',
         '#c68400',
         '#40241a',
         '#29434e'
      ]
      let random = Math.floor(Math.random() * backgroundColor.length)
      return backgroundColor[random]
   }
   let bgColor = [
      '#ab000d',
      '#5c007a',
      '#00227b',
      '#00701a',
      '#8c9900',
      '#c68400',
      '#40241a',
      '#29434e',
      '#ab000d',
      '#5c007a'
   ]
   return (
      <PerfectScrollbar>
         <Box sx={{ minWidth: 1050 }}>
            <Table>
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
                  {customerList
                     ? customerList.map(customer => (
                          <TableRow hover key={customer._id}>
                             <TableCell align="left">
                                <Box
                                   sx={{
                                      alignItems: 'center',
                                      display: 'flex'
                                   }}
                                >
                                   <Avatar
                                      style={{
                                         backgroundColor: bgColor[customerList.indexOf(customer)]
                                      }}
                                      src="/broken-image.jpg"
                                      sx={{ mr: 2 }}
                                   >
                                      {getInitials(customer.name)}
                                   </Avatar>
                                   <Typography
                                      sx={{ fontWeight: 500 }}
                                      color="textPrimary"
                                      variant="body2"
                                   >
                                      {customer.name || 'N/A'}
                                   </Typography>
                                </Box>
                             </TableCell>
                             <TableCell align="left">{customer.email}</TableCell>
                             <TableCell align="center">{customer.phone}</TableCell>
                             <TableCell align="center" sx={{ pr: 5 }}>
                                {format(parseISO(customer.createdAt), 'dd/MM/yyyy')}
                             </TableCell>
                             <TableCell align="center">{customer.orderCount}</TableCell>
                             <TableCell align="center">
                                <Typography color="success.main" variant="body2">
                                   {customer.amountTotal && `$${customer.amountTotal.toFixed(2)}`}
                                </Typography>
                             </TableCell>
                             <TableCell align="center">
                                <Link href={`/customers/${customer._id}/edit`} passHref legacyBehavior>
                                   <Tooltip title="Edit Customer" placement="top">
                                      <IconButton size="small">
                                         <PencilIcon width={20} />
                                      </IconButton>
                                   </Tooltip>
                                </Link>
                                <Link href={`/customers/${customer._id}`} passHref legacyBehavior>
                                   <Tooltip title="View Details" placement="top">
                                      <IconButton size="small">
                                         <ArrowForwardIcon fontSize="small" />
                                      </IconButton>
                                   </Tooltip>
                                </Link>
                             </TableCell>
                          </TableRow>
                       ))
                     : Array.from(new Array(pagination.pageSize)).map((item, idx) => (
                          <TableRow hover key={idx}>
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
   );
}
