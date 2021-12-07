import { formatDistance, parseISO, subHours } from 'date-fns'
import {
   Box,
   Button,
   Card,
   CardHeader,
   Divider,
   IconButton,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
   Skeleton
} from '@mui/material'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import NextLink from 'next/link'
import useSWR from 'swr'
import { Product } from 'models'

const NUMBER_PRODUCTS: number = 6

const ProductSkeleton = ({ numberProducts }: { numberProducts: number }) => (
   <List>
      {new Array(numberProducts).map((product, index) => (
         <ListItem divider={index < NUMBER_PRODUCTS - 1} key={index}>
            <ListItemAvatar>
               <Skeleton variant="rectangular" width={48} height={48} />
            </ListItemAvatar>
            <ListItemText
               primary={<Skeleton variant="text" />}
               secondary={<Skeleton variant="text" />}
            />
            <IconButton edge="end" size="small">
               <MoreVertIcon />
            </IconButton>
         </ListItem>
      ))}
   </List>
)

export const LatestProducts = (props: any) => {
   const { data: { data: products } = {} } = useSWR(`products?page=1&pageSize=${NUMBER_PRODUCTS}`, {
      revalidateOnFocus: true
   })

   return (
      <Card {...props}>
         <CardHeader
            subtitle={`${products ? products.length : 0} in total`}
            title="Latest Products"
         />
         <Divider />
         {products ? (
            <List>
               {products.map((product: Product, i: number) => (
                  <ListItem divider={i < products.length - 1} key={product._id}>
                     <ListItemAvatar>
                        <img
                           alt={product.title}
                           src={product.img}
                           style={{
                              height: 48,
                              width: 48
                           }}
                        />
                     </ListItemAvatar>
                     <ListItemText
                        primary={product.title}
                        secondary={`Updated ${formatDistance(
                           parseISO(product.updatedAt),
                           new Date(),
                           { addSuffix: true }
                        )}`}
                     />
                     <IconButton edge="end" size="small">
                        <MoreVertIcon />
                     </IconButton>
                  </ListItem>
               ))}
            </List>
         ) : (
            <ProductSkeleton numberProducts={NUMBER_PRODUCTS} />
         )}
         <Divider />
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <NextLink href={'/products'} passHref>
               <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
                  View all
               </Button>
            </NextLink>
         </Box>
      </Card>
   )
}
