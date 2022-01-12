import { Avatar, Box, Card, CardContent, Grid, Skeleton, Typography } from '@mui/material'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import { CardData } from '.'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export const TotalProfit = ({ data, ...restProps }: { data?: CardData }) => (
   <Card {...restProps}>
      <CardContent>
         <Grid container spacing={3} sx={{ justifyContent: 'space-between' }}>
            <Grid item sx={{ flex: 1 }}>
               {data ? (
                  <Typography color="textSecondary" gutterBottom variant="overline">
                     {data.label}
                  </Typography>
               ) : (
                  <Skeleton variant="text" width="100%" />
               )}
               {data ? (
                  <Typography color="textPrimary" variant="h4">
                     {data.value}
                  </Typography>
               ) : (
                  <Skeleton variant="text" width="100%" />
               )}
            </Grid>
            <Grid item>
               <Avatar
                  sx={{
                     backgroundColor: 'primary.main',
                     height: 56,
                     width: 56
                  }}
               >
                  <AttachMoneyIcon />
               </Avatar>
            </Grid>
         </Grid>
         {data ? (
            <Box
               sx={{
                  alignItems: 'center',
                  display: 'flex',
                  pt: 2
               }}
            >
               {data.compareLastMonth < 0 ? (
                  <ArrowDownwardIcon color="error" />
               ) : (
                  <ArrowUpwardIcon color="success" />
               )}
               <Typography
                  variant="body2"
                  sx={{
                     mr: 1
                  }}
               >
                  {Math.abs(data.compareLastMonth).toFixed(1)}%
               </Typography>
               <Typography color="textSecondary" variant="caption">
                  Since last month
               </Typography>
            </Box>
         ) : (
            <Box
               sx={{
                  alignItems: 'center',
                  display: 'flex',
                  pt: 2
               }}
            >
               <Skeleton variant="text" width="100%" />
            </Box>
         )}
      </CardContent>
   </Card>
)
