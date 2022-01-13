import Head from 'next/head'
import {
   Box,
   Button,
   Card,
   Container,
   Divider,
   Tab,
   TablePagination,
   Tabs,
   Typography
} from '@mui/material'
import { ChangeEvent, MouseEvent, useState } from 'react'
import { CustomerQueryParams, PaginationParams, ResponseListData, User } from 'models'
import axiosClient from 'api-client/axios-client'
import useSWR from 'swr'
import queryString from 'query-string'
import { Download as DownloadIcon } from '../../icons/download'
import { CustomerListResults, CustomerListToolbar } from 'components/customer'
import { DashboardLayout } from 'components/layouts'

const DEFAULT_PAGINATION = {
   totalItems: 10,
   totalPages: 1,
   currentPage: 1,
   pageSize: 10
}

const Customers = () => {
   const [filters, setFilters] = useState<CustomerQueryParams>({
      search: '',
      orderBy: 'updatedAt-desc',
      isOrder: ''
   })
   const [pagination, setPagination] = useState<PaginationParams>(DEFAULT_PAGINATION)

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseListData<User>>(url)
         .then((res: ResponseListData<User>) => {
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

   const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         isOrder: newValue
      })
   }

   return (
      <>
         <Head>
            <title>Customers | FurnitureStore</title>
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
                  {/* <Box sx={{ m: 1 }}>
                     <Button startIcon={<DownloadIcon fontSize="small" />} sx={{ mr: 1 }}>
                        Export
                     </Button>
                  </Box> */}
               </Box>
               <Box sx={{ mt: 1 }}>
                  <Card>
                     <Tabs value={filters.isOrder} onChange={handleChangeTab}>
                        <Tab label="All" value="" />
                        <Tab label="Prospect" value="true" />
                        <Tab label="Returning" value="false" />
                     </Tabs>
                     <Divider />
                     <CustomerListToolbar
                        filters={filters}
                        onSearch={handleSearch}
                        onChangeSorting={handleChangeSorting}
                     />
                     <CustomerListResults
                        customerList={customerList}
                        pagination={pagination}
                        onSortByColumn={handleChangeSorting}
                     />
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
