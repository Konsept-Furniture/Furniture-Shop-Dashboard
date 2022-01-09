import {
   Avatar,
   Box,
   Button,
   Card,
   CardActions,
   CardContent,
   Divider,
   Typography
} from '@mui/material'
import { format, parseISO } from 'date-fns'
import { useAuth } from 'hooks'

export const AccountProfile = (props: any) => {
   const { profile } = useAuth()

   return (
      <Card {...props}>
         <CardContent>
            <Box
               sx={{
                  alignItems: 'center',
                  display: 'flex',
                  flexDirection: 'column'
               }}
            >
               <Avatar
                  src="https://konsept-client.vercel.app/dist/src/assets/images/sang.jpg"
                  sx={{
                     height: 64,
                     mb: 2,
                     width: 64
                  }}
               />
               <Typography color="textPrimary" gutterBottom variant="h5">
                  {profile.name}
               </Typography>
               <Typography color="textSecondary" variant="body2">
                  {`Created at ${format(parseISO(profile.createdAt), 'dd/MM/yyyy HH:mm')}`}
               </Typography>
            </Box>
         </CardContent>
         <Divider />
         <CardActions>
            <Button color="primary" fullWidth variant="text">
               Upload picture
            </Button>
         </CardActions>
      </Card>
   )
}
