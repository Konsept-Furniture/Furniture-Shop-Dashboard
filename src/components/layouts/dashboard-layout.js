import { useState } from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import { DashboardNavbar } from './dashboard-navbar'
import { DashboardSidebar } from './dashboard-sidebar'
import { Auth } from '../auth'
import { authApi } from 'api-client'
import { useRouter } from 'next/router'

const DashboardLayoutRoot = styled('div')(({ theme }) => ({
   display: 'flex',
   flex: '1 1 auto',
   maxWidth: '100%',
   paddingTop: 64,
   [theme.breakpoints.up('lg')]: {
      paddingLeft: 280
   }
}))

export const DashboardLayout = props => {
   const { children } = props
   const router = useRouter()
   const [isSidebarOpen, setSidebarOpen] = useState(true)

   const handleLogout = async () => {
      try {
         await authApi.logout().then(() => router.push('/login'))
      } catch (error) {
         console.log('eror to logout', error)
      }
   }

   return (
      <Auth>
         <DashboardLayoutRoot>
            <Box
               sx={{
                  display: 'flex',
                  flex: '1 1 auto',
                  flexDirection: 'column',
                  width: '100%'
               }}
            >
               {children}
            </Box>
         </DashboardLayoutRoot>
         <DashboardNavbar onSidebarOpen={() => setSidebarOpen(true)} onLogout={handleLogout} />
         <DashboardSidebar onClose={() => setSidebarOpen(false)} open={isSidebarOpen} />
      </Auth>
   )
}
