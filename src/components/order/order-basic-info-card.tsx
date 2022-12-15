import {
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   List,
   ListItem,
   Skeleton,
   Typography
} from '@mui/material'
import axios, { AxiosResponse } from 'axios'
import { format, parseISO } from 'date-fns'
import { District, Order, Province, ResponseData, Ward } from 'models'
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'
export interface OrderBasicInfoCardProps {
   order?: Order
}

function fetcher<T>(url: string) {
   return axios.get<any, AxiosResponse<T>>(url).then((res: AxiosResponse<T>): T => {
      return res.data
   })
}
export function OrderBasicInfoCard({ order }: OrderBasicInfoCardProps) {
   const { data: orderProvince } = useSWR<Province>(
      () =>
         order && order?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/p/${order?.deliveryInfo.address.province}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: orderDistrict } = useSWR<District>(
      () =>
         order && order?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/d/${order?.deliveryInfo.address.district}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: orderWard } = useSWR<Ward>(
      () =>
         order && order?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/w/${order?.deliveryInfo.address.ward}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )

   return (
      <Card>
         <CardHeader title="Basic info" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            {order ? (
               <List>
                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Delivery information
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="primary">
                           {order.user && (
                              <Link href={`/customers/${order.user._id}`} passHref legacyBehavior>
                                 {order.user?.name}
                              </Link>
                           )}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {order.deliveryInfo.address.street}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {orderWard?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {orderDistrict?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {orderProvince?.name}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        ID
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {order._id}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Date
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {/* {parseISO(order.createdAt)} */}
                           {order.createdAt &&
                              format(parseISO(order.createdAt), 'dd/MM/yyyy HH:mm')}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Payment Method
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           {order.payment}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Total Amount
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text">
                           ${order.amount.toFixed(2)}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  <ListItem
                     sx={{ px: 3, pt: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Status
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography
                           variant="body2"
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
                        </Typography>
                     </Box>
                  </ListItem>
               </List>
            ) : (
               <List>
                  {Array.from(new Array(6)).map((i, idx) => (
                     <ListItem key={idx} sx={{ px: 3, pt: 1.5 }} alignItems="center" disablePadding>
                        <Skeleton variant="text" sx={{ flex: 1, mb: 1 }} height={40} />
                        <Divider />
                     </ListItem>
                  ))}
               </List>
            )}
         </CardContent>
      </Card>
   );
}
