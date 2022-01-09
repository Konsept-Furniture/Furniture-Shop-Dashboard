import EditIcon from '@mui/icons-material/Edit'
import {
   Avatar,
   Button,
   Divider,
   List,
   ListItem,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import IconReport from 'assets/IconReport'
import CustomizedModal from 'components/customized-modal/customized-modal'
import { OrderStatus } from 'constants/enums/order-status'
import { format, parseISO } from 'date-fns'
import { Order, ProductOrder } from 'models'
import React, { useState } from 'react'
import { EditOrderForm } from './edit-order-form'

export interface OrderDetailModalProps {
   order?: Order
   open: boolean
   onUpdate: (id: string) => (order: Partial<Order>) => Promise<void>
   onDelete: (id: string) => Promise<void>
   onClose: () => void
}

export function OrderDetailModal({
   order,
   open,
   onUpdate,
   onDelete,
   onClose
}: OrderDetailModalProps) {
   const [mode, setMode] = useState<'edit' | 'view'>('view')

   const handleApprove = async () => {
      if (order?._id) {
         await onUpdate(order._id)({ status: 'DELIVERIED' })
      }
   }
   const handleReject = async () => {
      if (order?._id) {
         await onUpdate(order._id)({ status: 'CANCELED' })
      }
   }

   return (
      <CustomizedModal
         open={open}
         title="Order Details"
         onClose={() => {
            onClose()
            setMode('view')
         }}
      >
         {mode === 'edit' ? (
            <EditOrderForm
               order={order}
               onSave={async payload => {
                  if (order?._id) {
                     await onUpdate(order._id)(payload).then(() => setMode('view'))
                  }
               }}
               onCancel={() => setMode('view')}
               onDelete={async () => {
                  if (order?._id) {
                     await onDelete(order._id).then(() => setMode('view'))
                  }
               }}
            />
         ) : (
            <Box>
               <Box
                  sx={{
                     px: 3,
                     py: 2.5,
                     mb: 3,
                     borderRadius: 1,
                     display: 'flex',
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     bgcolor: 'background.default'
                  }}
               >
                  <Typography variant="h6" sx={{ color: 'gray', fontSize: 13, mr: 2 }}>
                     ACTIONS
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                     {order?.status === 'PROCESSING' && (
                        <>
                           <Button variant="contained" onClick={handleApprove}>
                              Approve
                           </Button>
                           <Button variant="outlined" onClick={handleReject}>
                              Reject
                           </Button>
                        </>
                     )}
                     {order?.status === 'DELIVERIED' && (
                        <Button
                           startIcon={<IconReport width={20} />}
                           variant="outlined"
                           onClick={handleReject}
                        >
                           Download bill
                        </Button>
                     )}
                     <Button
                        variant="text"
                        startIcon={<EditIcon />}
                        onClick={() => setMode('edit')}
                     >
                        Edit
                     </Button>
                  </Box>
               </Box>
               <Typography variant="h6" gutterBottom>
                  Details
               </Typography>

               <List>
                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        ID
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {order?._id}
                        </Typography>
                     </Box>
                  </ListItem>

                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Date
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {/* {parseISO(order?.createdAt)} */}
                           {order?.createdAt &&
                              format(parseISO(order?.createdAt), 'dd/MM/yyyy HH:mm')}
                        </Typography>
                     </Box>
                  </ListItem>

                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Delivery Information
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="primary">
                           {order?.deliveryInfo.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.address.street}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.address.ward}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.address.district}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.address.province}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.phone}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order?.deliveryInfo.email}
                        </Typography>
                     </Box>
                  </ListItem>

                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Payment Method
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order?.payment}
                        </Typography>
                     </Box>
                  </ListItem>

                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Total Amount
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           ${order?.amount.toFixed(2)}
                        </Typography>
                     </Box>
                  </ListItem>

                  <ListItem
                     sx={{ py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Status
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order?.status}
                        </Typography>
                     </Box>
                  </ListItem>
               </List>
               <Divider />

               <Typography variant="h6" gutterBottom sx={{ my: 3 }}>
                  Line items
               </Typography>

               <Table sx={{ minWidth: 400 }}>
                  <TableHead>
                     <TableRow>
                        <TableCell>Product</TableCell>
                        <TableCell align="center">QTY</TableCell>
                        <TableCell align="right">Amount</TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {order?.products.map((product: ProductOrder) => (
                        <TableRow key={product?.productId}>
                           <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                 <Avatar variant="rounded" src={product.img}></Avatar>
                                 {product.title}
                              </Box>
                           </TableCell>
                           <TableCell align="center">{product?.quantity}</TableCell>
                           <TableCell align="right">${product?.amount.toFixed(2)}</TableCell>
                        </TableRow>
                     ))}
                  </TableBody>
               </Table>
            </Box>
         )}
      </CustomizedModal>
   )
}
