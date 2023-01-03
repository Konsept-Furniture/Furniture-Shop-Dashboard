import {
   Box,
   Button,
   Card,
   CardContent,
   TextField,
   InputAdornment,
   SvgIcon,
   Typography,
   SelectChangeEvent,
   Grid,
   Select,
   MenuItem
} from '@mui/material'
import { useRef } from 'react'
import { Search as SearchIcon } from '../../icons/search'

// export interface ProductListToolbarProps {
//    onSearch: Function
//    onChangeSorting: Function
//    filters: Partial<CustomerQueryParams>
// }
const CustomerListToolbar = ({ onSearch, ...restProps }) => {
   const ref = useRef(null)

   const handleChangeSearch = e => {
      if (ref.current) {
         clearTimeout(ref.current)
      }
      ref.current = setTimeout(() => {
         onSearch(e.target.value.trim())
      }, 500)
   }

   return (
      <Box {...restProps}>
         <Box sx={{ m: 3 }}>
            <TextField
               fullWidth
               InputProps={{
                  startAdornment: (
                     <InputAdornment position="start">
                        <SvgIcon color="action" fontSize="small">
                           <SearchIcon />
                        </SvgIcon>
                     </InputAdornment>
                  )
               }}
               placeholder="Search customer by name, phone, email"
               variant="outlined"
               onChange={handleChangeSearch}
            />
         </Box>
      </Box>
   )
}

export default CustomerListToolbar
