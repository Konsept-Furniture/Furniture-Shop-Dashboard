import { Box, Card, Container, TablePagination } from '@mui/material'
import { DashboardLayout } from 'components/layouts/dashboard-layout'
import { OrderListResults } from 'components/order/order-list-results'
import { PaginationParams } from 'models'
import Head from 'next/head'
import { ChangeEvent, MouseEvent, useState } from 'react'
import PerfectScrollbar from 'react-perfect-scrollbar'

const Orders = () => {
   const [pagination, setPagination] = useState<PaginationParams>({
      totalItems: 10,
      totalPages: 1,
      currentPage: 1,
      pageSize: 10
   })
   const handleLimitChange = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setPagination({ ...pagination, pageSize: Number.parseInt(event.target.value) })
      // setLimit(Number.parseInt(event.target.value))
   }

   const handlePageChange = (event: MouseEvent<HTMLButtonElement> | null, newPage: number) => {
      console.log(newPage)
      setPagination({ ...pagination, currentPage: newPage + 1 })

      // setPage(newPage)
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
               {/* <CustomerListToolbar /> */}
               <Box sx={{ mt: 3 }}>
                  <Card>
                     <PerfectScrollbar>
                        <Box sx={{ minWidth: 1050 }}>
                           <OrderListResults pagination={pagination} />
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
      </>
   )
}
Orders.Layout = DashboardLayout

export default Orders
