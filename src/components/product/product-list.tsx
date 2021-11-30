import { Grid } from '@mui/material'
import { Box } from '@mui/system'
import { Product } from 'models'
import React from 'react'
import { ProductCard } from '.'

export interface ProductListProps {
   products: Product[]
   onEditClick: Function
   onDeleteClick: Function
}

export function ProductList({ products, onEditClick, onDeleteClick }: ProductListProps) {
   return (
      <Box sx={{ pt: 3 }}>
         <Grid container spacing={3}>
            {products.map(product => (
               <Grid item key={product._id} lg={3} md={4} sm={6} xs={12}>
                  <ProductCard
                     product={product}
                     onEditClick={onEditClick}
                     onDeleteClick={onDeleteClick}
                  />
               </Grid>
            ))}
         </Grid>
      </Box>
   )
}
