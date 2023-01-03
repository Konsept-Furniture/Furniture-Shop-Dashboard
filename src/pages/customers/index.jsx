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
import { ChangeEvent, MouseEvent, useState, useEffect } from 'react'
import CustomerListResults from 'components/customer/customer-list-results'
import CustomerListToolbar from 'components/customer/customer-list-toolbar'
import DashboardLayout from 'components/layouts/dashboard-layout'
import userApi from 'api/userApi'
import { useSnackbar } from 'notistack'

const DEFAULT_PAGINATION = {
   total: 5,
   page: 1,
   limit: 5
}

const Customers = () => {
   const { enqueueSnackbar } = useSnackbar()
   const [userList, setUserList] = useState([])
   const [pagination, setPagination] = useState(DEFAULT_PAGINATION)
   const [filters, setFilters] = useState({
      search: ''
   })

   useEffect(() => {
      const getUsers = async () => {
         const { response, err } = await userApi.getList(pagination, filters)
         if (err) {
            enqueueSnackbar(err.message, {
               variant: 'error'
            })
            return
         }
         setUserList(response.data)
         setPagination(response.paging)
      }
      getUsers()
   }, [pagination.page, pagination.limit, pagination.total, filters.search])

   const handleLimitChange = event => {
      setPagination({ ...pagination, limit: Number.parseInt(event.target.value) })
   }

   const handlePageChange = (event, currentPage) => {
      setPagination({ ...pagination, page: currentPage + 1 })
   }

   const handleSearch = search => {
      setPagination(DEFAULT_PAGINATION)
      setFilters({
         ...filters,
         search
      })
   }
   // console.log(userList)
   return (
      <>
         <Head>
            <title>Customers | Material Kit</title>
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
               <CustomerListToolbar onSearch={handleSearch} />
               <Box sx={{ mt: 3 }}>
                  <CustomerListResults customerList={userList} pagination={pagination} />
               </Box>
               <TablePagination
                  component="div"
                  count={pagination.total}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={pagination.page - 1}
                  rowsPerPage={pagination.limit}
                  rowsPerPageOptions={[5, 10, 25]}
               />
            </Container>
         </Box>
      </>
   )
}
Customers.Layout = DashboardLayout

export default Customers
