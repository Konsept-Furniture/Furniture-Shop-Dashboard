import { Box, Card, Container, TablePagination, Typography } from '@mui/material'
import { orderApi } from 'api-client'
import CustomizedModal from 'components/customized-modal/customized-modal'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { OrderDetail } from 'components/order/order-detail'
import { OrderListResults } from 'components/order/order-list-results'
import { Order, PaginationParams } from 'models'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR, { useSWRConfig } from 'swr'

const Orders = () => {
   const [pagination, setPagination] = useState<PaginationParams>({
      totalItems: 10,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10
   })

   const { mutate } = useSWRConfig()
   const { data: orders = [] } = useSWR(
      `orders?page=${pagination.currentPage}&pageSize=${pagination.pageSize}&orderBy=updatedAt-desc`,
      {
         revalidateOnFocus: true
         // refreshInterval: 1000
      }
   )

   const [open, setOpen] = useState(false)
   const [selectedOrder, setSelectedOrder] = useState<Order>()

   const handleModalClose = () => {
      setOpen(false)
   }

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      console.log(newPage)
      setPagination({ ...pagination, currentPage: newPage + 1 })

      // setPage(newPage)
   }

   const handleOrderRowClick = async (order: Order) => {
      console.log('order', order)
      setOpen(true)
      setSelectedOrder(order)
   }

   const handleUpdateOrder = (id: string) => async (payload: Partial<Order>) => {
      try {
         await orderApi.update(id, payload).then(res => {
            const updatedOrder = res.data
            const idx = orders.findIndex((order: Order) => order._id === updatedOrder?._id)

            const newOrderList = [...orders]
            newOrderList[idx] = updatedOrder

            mutate(
               `orders?page=${pagination.currentPage}&pageSize=${pagination.pageSize}&orderBy=updatedAt-desc`,
               newOrderList
            )

            setOpen(false)
         })
      } catch (error) {
         console.log('error to update order', error)
      }
   }
   const handleDeleteOrder = async (id: string) => {
      try {
         await orderApi.delete(id).then(res => {
            setOpen(false)
         })
      } catch (error) {
         console.log('error to delete order', error)
      }
   }

   return (
      <>
         <Head>
            <title>Orders | FlowerShop</title>
         </Head>
         <Box
            component="main"
            sx={{
               flexGrow: 1,
               py: 8
            }}
         >
            <Container maxWidth={false}>
               <Box sx={{ mt: 3 }}>
                  <Card>
                     <PerfectScrollbar>
                        <Box sx={{ width: '100%' }}>
                           <OrderListResults
                              orders={orders}
                              pagination={pagination}
                              onRowClick={handleOrderRowClick}
                           />
                        </Box>
                     </PerfectScrollbar>
                     <TablePagination
                        component="div"
                        count={-1}
                        onPageChange={handlePageChange}
                        onRowsPerPageChange={handleLimitChange}
                        page={pagination.currentPage - 1}
                        rowsPerPage={pagination.pageSize}
                        rowsPerPageOptions={[5, 10, 25]}
                     />
                  </Card>
               </Box>
            </Container>
         </Box>

         <OrderDetail
            order={selectedOrder}
            open={open}
            onClose={handleModalClose}
            onUpdate={handleUpdateOrder}
            onDelete={handleDeleteOrder}
         />
      </>
   )
}
Orders.Layout = DashboardLayout

export default Orders
