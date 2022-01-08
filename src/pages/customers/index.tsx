import Head from 'next/head'
import { Box, Card, Container, TablePagination, Typography } from '@mui/material'
import { CustomerListResults } from '../../components/customer/customer-list-results'
import { CustomerListToolbar } from '../../components/customer/customer-list-toolbar'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { PaginationParams, ResponseListData, User } from 'models'
import axiosClient from 'api-client/axios-client'
import useSWR from 'swr'
import queryString from 'query-string'

const DEFAULT_PAGINATION = {
   totalItems: 10,
   totalPages: 1,
   currentPage: 1,
   pageSize: 10
}

const Customers = () => {
   const [filters, setFilters] = useState({ status: '', orderBy: 'updatedAt-desc' })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseListData<User>>(url)
         .then((res: ResponseListData<User>) => {
            console.log('🚀 ~ file: customers.tsx ~ line 27 ~ .then ~ res', res)
            setPagination(res.pagination)
            return res.data
         })
   }

   const { data: customerList } = useSWR(
      `users?page=${pagination.currentPage}&pageSize=${pagination.pageSize}&${queryString.stringify(
         filters,
         { skipEmptyString: true }
      )}`,
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
            <title>Customers | FlowerShop</title>
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
                     Customers
                  </Typography>
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     {/* <CustomerListToolbar /> */}
                     <Box sx={{ mt: 3 }}>
                        <CustomerListResults
                           customerList={customerList}
                           pagination={pagination}
                           onSortByColumn={handleSortOrder}
                        />
                     </Box>
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
Customers.Layout = DashboardLayout

export default Customers
