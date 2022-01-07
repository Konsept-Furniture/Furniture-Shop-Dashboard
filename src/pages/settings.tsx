import Head from 'next/head'
import { Box, Container, Typography } from '@mui/material'
import { SettingsNotifications } from '../components/settings/settings-notifications'
import { SettingsPassword } from '../components/settings/settings-password'
import { DashboardLayout } from 'components/layouts/dashboard-layout'

const Settings = () => (
   <>
      <Head>
         <title>Settings | Material Kit</title>
      </Head>
      <Box
         component="main"
         sx={{
            flexGrow: 1,
            py: 8
         }}
      >
         <Container maxWidth="lg">
            <Typography sx={{ mb: 3 }} variant="h4">
               Settings
            </Typography>
            <SettingsNotifications />
            <Box sx={{ pt: 3 }}>{/* <SettingsPassword /> */}</Box>
         </Container>
      </Box>
   </>
)

Settings.Layout = DashboardLayout

export default Settings
