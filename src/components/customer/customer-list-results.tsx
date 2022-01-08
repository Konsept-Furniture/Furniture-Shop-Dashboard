import { useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { format, parseISO } from 'date-fns'
import {
   Avatar,
   Box,
   Button,
   Card,
   IconButton,
   Skeleton,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TablePagination,
   TableRow,
   Typography
} from '@mui/material'
import { getInitials } from '../../utils/get-initials'
import { PaginationParams, User } from 'models'
import PencilIcon from 'icons/pencil'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
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
   return (
      <Card {...rest}>
         <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
               <Table>
                  <TableHead>
                     <TableRow>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Registration date</TableCell>
                        <TableCell align="center">Actions</TableCell>
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
                                      <Avatar src="/broken-image.jpg" sx={{ mr: 2 }}>
                                         {getInitials(customer.name)}
                                      </Avatar>
                                      <Typography color="textPrimary" variant="body1">
                                         {customer.name || 'N/A'}
                                      </Typography>
                                   </Box>
                                </TableCell>
                                <TableCell align="left">{customer.email}</TableCell>
                                <TableCell align="center">{customer.phone}</TableCell>
                                <TableCell align="center">
                                   {format(parseISO(customer.createdAt), 'dd/MM/yyyy')}
                                </TableCell>
                                <TableCell align="center">
                                   <IconButton size="small">
                                      <PencilIcon width={20} />
                                   </IconButton>
                                   <IconButton size="small">
                                      <ArrowForwardIcon fontSize="small" />
                                   </IconButton>
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
                             </TableRow>
                          ))}
                  </TableBody>
               </Table>
            </Box>
         </PerfectScrollbar>
      </Card>
   )
}
