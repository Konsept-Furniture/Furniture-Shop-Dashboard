import { Box, Container, Typography } from '@mui/material'
import { DashboardLayout } from 'components/layouts'
import Head from 'next/head'
import { SettingsNotifications } from '../components/settings/settings-notifications'

const Settings = () => (
   <>
      <Head>
         <title>Settings | FurnitureStore Dashboard</title>
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
