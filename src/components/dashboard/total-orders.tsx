import {
   Avatar,
   Box,
   Card,
   CardContent,
   Grid,
   LinearProgress,
   Skeleton,
   Typography
} from '@mui/material'
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined'
import { CardData } from '.'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'

export const TotalOrders = ({ data, ...restProps }: { data?: CardData }) => (
   <Card sx={{ height: '100%' }} {...restProps}>
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
                     backgroundColor: 'warning.main',
                     height: 56,
                     width: 56
                  }}
               >
                  <InsertChartIcon />
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
         {/* <Box sx={{ pt: 3 }}>
            <LinearProgress value={75.5} variant="determinate" />
         </Box> */}
      </CardContent>
   </Card>
)
