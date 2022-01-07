import {
   Box,
   Card,
   Container,
   Divider,
   Tab,
   TablePagination,
   Tabs,
   Typography
} from '@mui/material'
import { orderApi } from 'api-client'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { OrderDetail } from 'components/order/order-detail'
import { OrderListResults } from 'components/order/order-list-results'
import { ResponseListData, Order, PaginationParams } from 'models'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR from 'swr'
import queryString from 'query-string'
import axiosClient from 'api-client/axios-client'
import { OrderListToolbar } from 'components/order/order-list-toolbar'

const Orders = () => {
   const [filters, setFilters] = useState({ status: '', orderBy: 'updatedAt-desc' })
   const [pagination, setPagination] = useState<PaginationParams>({
      totalItems: 10,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10
   })

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseListData<Order>>(url)
         .then((res: ResponseListData<Order>) => {
            setPagination(res.pagination)
            return res.data
         })
   }

   const { data: orderList, mutate } = useSWR(
      `orders?page=${pagination.currentPage}&pageSize=${
         pagination.pageSize
      }&${queryString.stringify(filters)}`,
      fetcher,
      {
         revalidateOnFocus: true
      }
   )

   const [open, setOpen] = useState(false)
   const [selectedOrder, setSelectedOrder] = useState<Order>()

   const [order, setOrder] = useState('asc')
   const [orderBy, setOrderBy] = useState('')

   const handleModalClose = () => {
      setOpen(false)
   }

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPagination({ ...pagination, currentPage: newPage + 1 })
   }

   const handleOrderRowClick = async (order: Order) => {
      setOpen(true)
      setSelectedOrder(order)
   }

   const handleUpdateOrder = (id: string) => async (payload: Partial<Order>) => {
      try {
         await orderApi.update(id, payload).then(res => {
            if (!orderList) return

            const updatedOrder = res.data
            const idx = orderList.findIndex((order: Order) => order._id === updatedOrder?._id)
            const newOrderList = [...orderList]

            if (updatedOrder && idx >= 0) newOrderList[idx] = updatedOrder
            mutate(newOrderList, true)

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

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setFilters({
         ...filters,
         status: newValue
      })
   }

   const handleSortOrder = (orderBy: string) => {
      setFilters({
         ...filters,
         orderBy
      })
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
               pt: 4,
               pb: 8
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
                  <Typography sx={{ m: 1 }} variant="h4">
                     Orders
                  </Typography>
               </Box>
               <Box>
                  <Card>
                     <Tabs value={filters.status} onChange={handleChangeTab}>
                        <Tab label="All" value="" />
                        <Tab label="Pending" value="PENDING" />
                        <Tab label="Processing" value="PROCESSING" />
                        <Tab label="Deliveried" value="DELIVERIED" />
                        <Tab label="Canceled" value="CANCELED" />
                     </Tabs>
                     <Divider />

                     <PerfectScrollbar>
                        <Box sx={{ width: '100%' }}>
                           <OrderListResults
                              orderList={orderList}
                              pagination={pagination}
                              onRowClick={handleOrderRowClick}
                              onSortByColumn={handleSortOrder}
                           />
                        </Box>
                     </PerfectScrollbar>
                     <TablePagination
                        component="div"
                        count={pagination.totalItems}
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
