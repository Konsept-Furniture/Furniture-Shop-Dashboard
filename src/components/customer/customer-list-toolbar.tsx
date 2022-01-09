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
import { CustomerQueryParams } from 'models'
import { useRef } from 'react'
import { Search as SearchIcon } from '../../icons/search'

export interface ProductListToolbarProps {
   onSearch: Function
   onChangeSorting: Function
   filters: Partial<CustomerQueryParams>
}
export const CustomerListToolbar = ({
   onSearch,
   onChangeSorting,
   filters,
   ...restProps
}: ProductListToolbarProps) => {
   const ref = useRef<NodeJS.Timeout | null>(null)

   const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (ref.current) {
         clearTimeout(ref.current)
      }
      ref.current = setTimeout(() => {
         onSearch(e.target.value.trim())
      }, 500)
   }

   const handleChangeSort = (event: SelectChangeEvent) => {
      onChangeSorting(event.target.value as string)
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
