import {
   Box,
   Button,
   Card,
   CardContent,
   TextField,
   InputAdornment,
   SvgIcon,
   Typography
} from '@mui/material'
import { Download as DownloadIcon } from '../../icons/download'
import { Search as SearchIcon } from '../../icons/search'
import { Upload as UploadIcon } from '../../icons/upload'

export const OrderListToolbar = (props: any) => {
   return (
      <Box {...props}>
         <Box>
            <Card>
               <CardContent>
                  <Box sx={{ maxWidth: 500 }}>
                     <TextField
                        fullWidth
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position="start">
                                 <SvgIcon fontSize="small" color="action">
                                    <SearchIcon />
                                 </SvgIcon>
                              </InputAdornment>
                           )
                        }}
                        placeholder="Search order by customer's name"
                        variant="outlined"
                     />
                  </Box>
               </CardContent>
            </Card>
         </Box>
      </Box>
   )
}
