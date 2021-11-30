import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import Inventory2Icon from '@mui/icons-material/Inventory2'
import {
   Box,
   Card,
   CardContent,
   CardMedia,
   Divider,
   Grid,
   IconButton,
   Tooltip,
   Typography,
} from '@mui/material'
import { Product } from 'models'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { ConfirmDialog } from './confirm-dialog'

interface ProductCardProps {
   product: Product
   onEditClick?: Function
   onDeleteClick?: Function
}
export const ProductCard = ({ product, onEditClick, onDeleteClick, ...rest }: ProductCardProps) => {
   const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
   return (
      <Card
         sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
         }}
         {...rest}
      >
         <CardMedia component="img" height="220" image={product.img} alt={product.title} />
         <CardContent>
            <Typography align="center" color="textPrimary" gutterBottom variant="h5">
               {product.title}
            </Typography>
            <Tooltip title={product.desc || false} placement="top">
               <Typography noWrap align="center" color="textPrimary" variant="body1">
                  {product.desc}
               </Typography>
            </Tooltip>
         </CardContent>

         <Box sx={{ flexGrow: 1 }} />
         <Divider />
         <Box sx={{ p: 2 }}>
            <Grid container spacing={2} sx={{ justifyContent: 'space-between' }}>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                  }}
               >
                  <Inventory2Icon color="action" />
                  <Typography color="textSecondary" display="inline" sx={{ pl: 1 }} variant="body2">
                     {product.quantity} In Stocks
                  </Typography>
               </Grid>
               <Grid
                  item
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                  }}
               >
                  <Tooltip title="Edit" placement="top">
                     <IconButton
                        color="primary"
                        onClick={() => {
                           if (onEditClick) onEditClick(product)
                        }}
                     >
                        <EditIcon />
                     </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete" placement="top">
                     <IconButton color="error" onClick={() => setIsDeleteDialogOpen(true)}>
                        <DeleteIcon />
                     </IconButton>
                  </Tooltip>
               </Grid>
            </Grid>
         </Box>

         <ConfirmDialog
            isOpen={isDeleteDialogOpen}
            title="Are you sure to delete this product?"
            onClose={() => setIsDeleteDialogOpen(false)}
            onSubmit={async () => {
               if (onDeleteClick) await onDeleteClick(product)
               setIsDeleteDialogOpen(false)
            }}
         />
      </Card>
   )
}

ProductCard.propTypes = {
   product: PropTypes.object.isRequired,
}
