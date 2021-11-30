import { Box, Container, Pagination } from '@mui/material'
import { productApi } from 'api-client'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { ProductList, ProductListToolbar } from 'components/product'
import { ProductAddEditModal } from 'components/product/product-add-edit-modal'
import { PaginationParams, Product, ProductPayload } from 'models'
import Head from 'next/head'
import { ChangeEvent, useEffect, useState } from 'react'

const Products = () => {
   const [isEdit, setIsEdit] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const [editProduct, setEditProduct] = useState<Product>()
   const [loading, setLoading] = useState(false)
   const [products, setProducts] = useState<Product[]>([])
   const [pagination, SetPagination] = useState<PaginationParams>({
      currentPage: 1,
      pageSize: 12,
      totalItems: 0,
      totalPages: 1,
   })

   //TODO: apply debounce on searching products by title
   const getProductList = async (_pagination: Partial<PaginationParams>) => {
      setLoading(true)
      try {
         const payload = {
            page: _pagination.currentPage,
            pageSize: _pagination.pageSize,
         }
         const res = await productApi.getList(payload)
         setProducts(res.data)
         SetPagination(res.pagination)
      } catch (error) {
         console.log('error to get product list', error)
      }
      setLoading(false)
   }

   const handleChangePagination = async (event: ChangeEvent<unknown>, value: number) => {
      await getProductList({
         ...pagination,
         currentPage: value,
      })
   }

   const handleAddEditProduct = async (product: ProductPayload) => {
      console.log('edit product', editProduct?._id, product)

      if (editProduct?._id) {
         try {
            const res = await productApi.update(editProduct._id, product)
            console.log(res)
         } catch (error) {
            try {
               const res = await productApi.add(product)
               console.log(res)
            } catch (error) {
               console.log('error to add product', error)
            }
         }
      } else {
         await handleAddProduct(product)
      }

      await handleCloseAddEditModal()
      getProductList(pagination)
   }

   const handleEditProduct = async (product: ProductPayload) => {}
   const handleAddProduct = async (product: ProductPayload) => {}

   const handleDeleteProduct = async (product: Product) => {
      console.log('delete product', product)
      getProductList(pagination)
   }

   const handleCloseAddEditModal = () => {
      setIsEditModalOpen(false)
   }

   useEffect(() => {
      getProductList(pagination)
   }, [])

   return (
      <>
         <Head>
            <title>Products | FlowerShop</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8,
            }}
         >
            <Container maxWidth={false}>
               <ProductListToolbar
                  onAddProductClick={() => {
                     setIsEdit(false)
                     setIsEditModalOpen(true)
                  }}
               />
               <ProductList
                  products={products}
                  onEditClick={(product: Product) => {
                     console.log(product)
                     setIsEditModalOpen(true)
                     setEditProduct(product)
                     setIsEdit(true)
                  }}
                  onDeleteClick={handleDeleteProduct}
               />
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'center',
                     pt: 3,
                  }}
               >
                  <Pagination
                     color="primary"
                     count={pagination.totalPages}
                     page={pagination.currentPage}
                     onChange={handleChangePagination}
                  />
               </Box>

               <ProductAddEditModal
                  isEdit={isEdit}
                  data={editProduct}
                  isOpen={isEditModalOpen}
                  onClose={handleCloseAddEditModal}
                  onSubmit={handleAddEditProduct}
               />
            </Container>
         </Box>
      </>
   )
}

Products.Layout = DashboardLayout

export default Products
