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
import { format, parseISO } from 'date-fns'
import React from 'react'

// export interface CustomerBasicInfoCardProps {
//    customer?: User
// }

// function fetcher<T>(url: string) {
//    return axios.get<any, AxiosResponse<T>>(url).then((res: AxiosResponse<T>): T => {
//       return res.data
//    })
// }

const CustomerBasicInfoCard = ({ customer }) => {
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
                        <Typography
                           sx={{ fontWeight: 'bold' }}
                           variant="body2"
                           color="text.secondary"
                        >
                           {customer.first_name + ' ' + customer.last_name}
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
                           {customer.last_name}
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
                           {customer.phone || 'N/A'}
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
                           {customer.email || 'N/A'}
                        </Typography>
                     </Box>
                  </ListItem>
                  <Divider />

                  {/* <ListItem
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
                  <Divider /> */}

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
                           {customer.created_at &&
                              format(parseISO(customer.created_at), 'dd/MM/yyyy HH:mm')}
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

export default CustomerBasicInfoCard
