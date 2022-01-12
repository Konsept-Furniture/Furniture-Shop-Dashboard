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
import axiosClient from 'api-client/axios-client'
import { DashboardLayout } from 'components/layouts'
import { OrderDetailModal } from 'components/order/order-detail'
import { OrderListResults } from 'components/order/order-list-results'
import { Order, PaginationParams, ResponseListData } from 'models'
import Head from 'next/head'
import queryString from 'query-string'
import { ChangeEvent, MouseEvent, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'
import useSWR from 'swr'

const DEFAULT_PAGINATION = {
   totalItems: 10,
   totalPages: 1,
   currentPage: 1,
   pageSize: 10
}

const Orders = () => {
   const [filters, setFilters] = useState({ status: '', orderBy: 'updatedAt-desc' })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)

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
      }&${queryString.stringify(filters, { skipEmptyString: true })}`,
      fetcher,
      {
         revalidateOnFocus: true
      }
   )

   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      setPagination({ ...pagination, currentPage: newPage + 1 })
   }

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         status: newValue
      })
   }

   const handleSortOrder = (orderBy: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         orderBy
      })
   }

   return (
      <>
         <Head>
            <title>Orders | FurnitureStore</title>
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
                  <Typography sx={{ m: 1 }} variant="h4">
                     Orders
                  </Typography>
               </Box>
               <Box sx={{ mt: 1 }}>
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
      </>
   )
}
Orders.Layout = DashboardLayout

export default Orders
