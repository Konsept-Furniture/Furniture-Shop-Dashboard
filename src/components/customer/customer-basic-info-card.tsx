import {
   Card,
   CardContent,
   CardHeader,
   Divider,
   List,
   ListItem,
   Skeleton,
   Typography
} from '@mui/material'
import { Box } from '@mui/system'
import axios, { AxiosResponse } from 'axios'
import { format, parseISO } from 'date-fns'
import { District, Province, User, Ward } from 'models'
import React from 'react'
import useSWR from 'swr'

export interface CustomerBasicInfoCardProps {
   customer?: User
}

function fetcher<T>(url: string) {
   return axios.get<any, AxiosResponse<T>>(url).then((res: AxiosResponse<T>): T => {
      return res.data
   })
}

export function CustomerBasicInfoCard({ customer }: CustomerBasicInfoCardProps) {
   const { data: customerProvince } = useSWR<Province>(
      () =>
         customer && customer?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/p/${customer?.deliveryInfo.address.province}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: customerDistrict } = useSWR<District>(
      () =>
         customer && customer?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/d/${customer?.deliveryInfo.address.district}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )
   const { data: customerWard } = useSWR<Ward>(
      () =>
         customer && customer?.deliveryInfo.address.province
            ? `https://provinces.open-api.vn/api/w/${customer?.deliveryInfo.address.ward}`
            : null,
      fetcher,
      {
         revalidateOnFocus: false
      }
   )

   return (
      <Card>
         <CardHeader title="Basic details" />
         <Divider />
         <CardContent sx={{ p: 0 }}>
            {customer ? (
               <List>
                  <ListItem
                     sx={{ px: 3, py: 1.5, display: 'flex', flexDirection: 'row', my: 0 }}
                     alignItems="center"
                     disablePadding
                  >
                     <Typography variant="subtitle2" sx={{ minWidth: 180 }}>
                        Full Name
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontWeight: 'bold' }} variant="body2" color="text.secondary">
                           {customer.name}
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
                        Username
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {customer.username}
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
                        Phone Number
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {customer.phone}
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
                        Email
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {customer.email}
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
                        Delivery Information
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {customer.deliveryInfo.address.street}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {customerProvince?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {customerDistrict?.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                           {customerWard?.name}
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
                        Registration Date
                     </Typography>
                     <Box sx={{ flex: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                           {customer.createdAt &&
                              format(parseISO(customer.createdAt), 'dd/MM/yyyy HH:mm')}
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
   )
}
