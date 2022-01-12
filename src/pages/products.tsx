import {
   Box,
   Button,
   Container,
   Divider,
   Pagination,
   Paper,
   Tab,
   Tabs,
   Typography
} from '@mui/material'
import { productApi } from 'api-client'
import axiosClient from 'api-client/axios-client'
import { ProductList, ProductListToolbar } from 'components/product'
import { ProductAddEditModal } from 'components/product/product-add-edit-modal'
import {
   PaginationParams,
   Product,
   ProductPayload,
   ProductQueryParams,
   ResponseListData
} from 'models'
import Head from 'next/head'
import { useSnackbar } from 'notistack'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import queryString from 'query-string'
import { Download as DownloadIcon } from '../icons/download'
import { Upload as UploadIcon } from '../icons/upload'
import { DashboardLayout } from 'components/layouts'

const DEFAULT_PAGINATION = {
   totalItems: 10,
   totalPages: 1,
   currentPage: 1,
   pageSize: 12
}
const Products = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)
   const [filters, setFilters] = useState<Partial<ProductQueryParams>>({
      orderBy: '',
      inStock: '',
      search: ''
   })

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseListData<Product>>(url)
         .then((res: ResponseListData<Product>) => {
            setPagination(res.pagination)
            return res.data
         })
   }

   const { data: productList, mutate } = useSWR(
      `products?page=${pagination.currentPage}&pageSize=${
         pagination.pageSize
      }&${queryString.stringify(filters, { skipEmptyString: true })}`,
      fetcher,
      {
         revalidateOnFocus: true
      }
   )

   const [isEdit, setIsEdit] = useState(false)
   const [isEditModalOpen, setIsEditModalOpen] = useState(false)
   const [editProduct, setEditProduct] = useState<Product>()
   const productListTitleRef = useRef<HTMLElement>(null)
   const executeScroll = () => {
      if (productListTitleRef.current) productListTitleRef.current.scrollIntoView()
   }

   const handleChangePagination = (event: ChangeEvent<unknown>, value: number) => {
      executeScroll()
      setPagination({
         ...pagination,
         currentPage: value
      })
   }

   const handleAddEditProduct = async (product: ProductPayload) => {
      if (editProduct?._id) {
         try {
            await productApi.update(editProduct._id, product).then(res => {
               if (!productList) return

               const updatedProduct = res.data
               const idx = productList.findIndex(product => product._id == updatedProduct?._id)
               const newProductList = [...productList]

               if (updatedProduct && idx >= 0) newProductList[idx] = updatedProduct
               mutate(newProductList, true)
               handleCloseAddEditModal()
               enqueueSnackbar(res.message, {
                  variant: 'success'
               })
            })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      } else {
         try {
            await productApi.add(product).then(res => {
               if (!productList) return

               const addedProduct = res.data
               if (addedProduct) {
                  const newProductList = [addedProduct, ...productList].slice(
                     0,
                     pagination.pageSize
                  )

                  if (newProductList) {
                     mutate(newProductList, true)
                  }
               }

               handleCloseAddEditModal()
               enqueueSnackbar(res.message, {
                  variant: 'success'
               })
            })
         } catch (error: any) {
            enqueueSnackbar(error.message, {
               variant: 'error'
            })
         }
      }
   }

   const handleDeleteProduct = async (id: string) => {
      try {
         await productApi.delete(id).then(res => {
            if (!productList) return

            const newProductList = productList.filter(product => product._id !== id)
            mutate(newProductList, true)
            enqueueSnackbar(res.message, {
               variant: 'success'
            })
         })
      } catch (error: any) {
         enqueueSnackbar(error.message, {
            variant: 'error'
         })
      }
   }

   const handleCloseAddEditModal = () => {
      setIsEditModalOpen(false)
      setEditProduct(undefined)
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         inStock: newValue
      })
   }

   const handleSearch = (search: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         search
      })
   }
   const handleChangeSorting = (orderBy: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         orderBy
      })
   }

   return (
      <>
         <Head>
            <title>Products | FurnitureStore</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <Box
                  sx={{
                     alignItems: 'center',
                     display: 'flex',
                     justifyContent: 'space-between',
                     flexWrap: 'wrap',
                     m: -1
                  }}
               >
                  <Typography sx={{ m: 1 }} variant="h4" ref={productListTitleRef}>
                     Products
                  </Typography>
                  <Box sx={{ m: 1 }}>
                     {/* <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Import
                     </Button>
                     <Button startIcon={<UploadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button> */}
                     <Button
                        color="primary"
                        variant="contained"
                        onClick={() => {
                           setIsEdit(false)
                           setIsEditModalOpen(true)
                        }}
                     >
                        Add products
                     </Button>
                  </Box>
               </Box>

               <Paper sx={{ mt: 1 }}>
                  <Tabs value={filters.inStock} onChange={handleChangeTab}>
                     <Tab label="All" value="" />
                     <Tab label="Available" value="true" />
                     <Tab label="Out of stock" value="false" />
                  </Tabs>
                  <Divider />
                  <ProductListToolbar
                     filters={filters}
                     onSearch={handleSearch}
                     onChangeSorting={handleChangeSorting}
                  />
               </Paper>
               <ProductList
                  products={productList}
                  pagination={pagination}
                  onEditClick={(product: Product) => {
                     setIsEditModalOpen(true)
                     setEditProduct(product)
                     setIsEdit(true)
                  }}
                  onDeleteClick={handleDeleteProduct}
               />

               {productList && productList.length > 0 && (
                  <Box
                     sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        pt: 3
                     }}
                  >
                     <Pagination
                        color="primary"
                        count={pagination.totalPages}
                        page={pagination.currentPage}
                        onChange={handleChangePagination}
                     />
                  </Box>
               )}

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
