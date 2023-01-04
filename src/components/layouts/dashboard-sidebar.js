/* eslint-disable react/jsx-max-props-per-line */
import { useEffect } from 'react'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import { ChartBar as ChartBarIcon } from '../../icons/chart-bar'
import { Cog as CogIcon } from '../../icons/cog'
import { Lock as LockIcon } from '../../icons/lock'
import { Selector as SelectorIcon } from '../../icons/selector'
import { ShoppingBag as ShoppingBagIcon } from '../../icons/shopping-bag'
import { User as UserIcon } from '../../icons/user'
import { UserAdd as UserAddIcon } from '../../icons/user-add'
import { Users as UsersIcon } from '../../icons/users'
import { Order as OrderIcon } from '../../icons/order'
import { XCircle as XCircleIcon } from '../../icons/x-circle'
import { Logo } from '../logo'
import PerfectScrollbar from 'react-perfect-scrollbar'
import { NavItem } from 'components/nav-item'

const items = [
   {
      href: '/',
      icon: <ChartBarIcon fontSize="small" />,
      title: 'Dashboard'
   },
   {
      href: '/customers',
      icon: <UsersIcon fontSize="small" />,
      title: 'Customers'
   },
   {
      href: '/orders',
      icon: <OrderIcon fontSize="small" />,
      title: 'Orders'
   },
   {
      href: '/products',
      icon: <ShoppingBagIcon fontSize="small" />,
      title: 'Products'
   },
   {
      href: '/account',
      icon: <UserIcon fontSize="small" />,
      title: 'Account'
   }
]

export const DashboardSidebar = ({ token, ...props }) => {
   const { open, onClose } = props
   const router = useRouter()
   const lgUp = useMediaQuery(theme => theme.breakpoints.up('lg'), {
      defaultMatches: true,
      noSsr: false
   })

   useEffect(
      () => {
         if (!router.isReady) {
            return
         }

         if (open) {
            onClose?.()
         }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [router.asPath]
   )

   const content = (
      <PerfectScrollbar>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               height: '100%'
            }}
         >
            <div>
               <Box sx={{ p: 3, display: 'flex', justifyContent: 'center' }}>
                  <NextLink href="/" passHref style={{ mt: 2, textDecoration: 'none' }}>
                     {}
                     <Typography variant="h3" sx={{ color: '#ffffff' }}>
                        Buy Me
                     </Typography>
                  </NextLink>
               </Box>
            </div>
            <Divider
               sx={{
                  borderColor: '#394f73',
                  my: 3
               }}
            />
            <Box sx={{ flexGrow: 1 }}>
               {items.map(item => (
                  <NavItem key={item.title} icon={item.icon} href={item.href} title={item.title} />
               ))}
            </Box>
            <Divider sx={{ borderColor: '#394f73' }} />
         </Box>
      </PerfectScrollbar>
   )

   if (lgUp) {
      return (
         <Drawer
            anchor="left"
            open
            PaperProps={{
               sx: {
                  backgroundColor: 'neutral.900',
                  color: '#FFFFFF',
                  width: 280
               }
            }}
            variant="permanent"
         >
            {content}
         </Drawer>
      )
   }

   return (
      <Drawer
         anchor="left"
         onClose={onClose}
         open={open}
         PaperProps={{
            sx: {
               backgroundColor: 'neutral.900',
               color: '#FFFFFF',
               width: 280
            }
         }}
         sx={{ zIndex: theme => theme.zIndex.appBar + 100 }}
         variant="temporary"
      >
         {content}
      </Drawer>
   )
}

DashboardSidebar.propTypes = {
   onClose: PropTypes.func,
   open: PropTypes.bool
}
