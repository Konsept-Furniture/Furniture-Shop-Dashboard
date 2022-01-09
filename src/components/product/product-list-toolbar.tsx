import {
   Box,
   Card,
   CardContent,
   Grid,
   InputAdornment,
   MenuItem,
   Select,
   SelectChangeEvent,
   SvgIcon,
   TextField
} from '@mui/material'
import { Search as SearchIcon } from '../../icons/search'
import queryString from 'query-string'
import { ReactNode, useRef } from 'react'
import { ProductQueryParams } from 'models'

export interface ProductListToolbarProps {
   onSearch: Function
   onChangeSorting: Function
   filters: Partial<ProductQueryParams>
}
export const ProductListToolbar = ({
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
         <Card>
            <CardContent>
               <Grid container spacing={2}>
                  <Grid item sm={12} md={9}>
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
                        placeholder="Search product"
                        variant="outlined"
                        onChange={handleChangeSearch}
                     />
                  </Grid>
                  <Grid item sm={12} md={3}>
                     <Select
                        fullWidth
                        value={filters.orderBy ? filters.orderBy : 'updatedAt-desc'}
                        onChange={handleChangeSort}
                     >
                        <MenuItem value="updatedAt-desc">Default Sorting</MenuItem>

                        <MenuItem value="createdAt-desc">Sort by latest</MenuItem>
                        <MenuItem value="price-asc">Sort by price: low to high</MenuItem>
                        <MenuItem value="price-desc">Sort by price: high to low</MenuItem>
                     </Select>
                  </Grid>
               </Grid>
            </CardContent>
         </Card>
      </Box>
   )
}
