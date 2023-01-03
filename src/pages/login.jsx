import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material'
import { CustomTextField } from 'components/form-controls'
import { LoginLayout } from 'components/layouts'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useAuth } from '../hooks'
import userApi from 'api/userApi'

const schema = yup.object({
   username: yup.string().email().max(255).required('Username is required'),
   password: yup.string().max(255).required('Password is required')
})

const Login = () => {
   const { enqueueSnackbar } = useSnackbar()
   const router = useRouter()
   const { login } = useAuth({
      revalidateOnMount: false
   })

   const form = useForm({
      defaultValues: {
         username: 'admin.binh@gmail.com',
         password: '123456'
      },
      resolver: yupResolver(schema)
   })

   const {
      formState: { isSubmitting },
      control
   } = form

   const handleClickLogin = async _data => {
      const { response, err } = await userApi.login({
         email: _data.username,
         password: _data.password
      })
      if (err) {
         enqueueSnackbar(err.message, {
            variant: 'error'
         })
         return
      }
      // getProfile()
      localStorage.setItem('token', response.data.token)
      enqueueSnackbar('Login successfully!', {
         variant: 'success'
      })
      router.push('/')
   }

   return (
      <Box>
         <Head>
            <title>Login | FurnitureStore Dashboard</title>
         </Head>
         <Box
            component="main"
            sx={{
               alignItems: 'center',
               display: 'flex',
               flexGrow: 1,
               minHeight: '100%'
            }}
         >
            <Container
               maxWidth="sm"
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '100vh'
               }}
            >
               <Card elevation={12}>
                  <CardContent
                     sx={
                        {
                           // py: 8
                        }
                     }
                  >
                     <form onSubmit={form.handleSubmit(handleClickLogin)}>
                        <Box sx={{ textAlign: 'center' }}>
                           <img
                              src="https://konsept.qodeinteractive.com/wp-content/uploads/2020/07/logo_mainpng.png"
                              width="180px"
                           />
                           <Typography color="textPrimary" variant="h4">
                              Sign in
                           </Typography>
                        </Box>

                        <CustomTextField
                           disabled={isSubmitting}
                           control={control}
                           name="username"
                           label="Username"
                        />
                        <CustomTextField
                           disabled={isSubmitting}
                           control={control}
                           name="password"
                           label="Password"
                           type="password"
                        />
                        <Box sx={{ py: 2 }}>
                           <Button
                              color="primary"
                              disabled={isSubmitting}
                              fullWidth
                              size="large"
                              type="submit"
                              variant="contained"
                           >
                              Sign In
                           </Button>
                        </Box>
                        {/* <Typography color="textSecondary" variant="body2">
                           Don&apos;t have an account?{' '}
                           <NextLink href="/register">
                              <Link
                                 href="/register"
                                 variant="subtitle2"
                                 underline="hover"
                                 sx={{
                                    cursor: 'pointer'
                                 }}
                              >
                                 Sign Up
                              </Link>
                           </NextLink>
                        </Typography> */}
                     </form>
                  </CardContent>
               </Card>
            </Container>
         </Box>
      </Box>
   )
}
Login.Layout = LoginLayout

export default Login
