import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { Box, Button, Container, Grid, Link, TextField, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as yup from 'yup'
import { authApi } from '../api-client'
import { LoginPayload } from '../models'
import { useAuth } from '../hooks'

const schema = yup.object({
   username: yup.string().max(255).required('Username is required'),
   password: yup.string().max(255).required('Password is required'),
})

const Login = () => {
   const router = useRouter()
   const { login } = useAuth({
      revalidateOnMount: false,
   })
   const form = useForm<LoginPayload>({
      defaultValues: {
         username: '',
         password: '',
      },
      resolver: yupResolver(schema),
   })
   const {
      formState: { isSubmitting, errors },
      register,
   } = form

   const handleClickLogin = async (_data: LoginPayload) => {
      try {
         await login(_data)
         router.push('/')
      } catch (error) {
         console.log('error to login:', error)
      }
   }

   return (
      <Box>
         <Head>
            <title>Login | FlowerShop Dashboard</title>
         </Head>
         <Box
            component="main"
            sx={{
               alignItems: 'center',
               display: 'flex',
               flexGrow: 1,
               minHeight: '100%',
            }}
         >
            <Container maxWidth="sm">
               <form onSubmit={form.handleSubmit(handleClickLogin)}>
                  <Box sx={{ my: 3 }}>
                     <Typography color="textPrimary" variant="h4">
                        Sign in
                     </Typography>
                  </Box>
                  <TextField
                     fullWidth
                     error={!!errors['username']}
                     helperText={errors['username']?.message}
                     label="Username"
                     margin="normal"
                     type="text"
                     variant="outlined"
                     {...register('username')}
                  />
                  <TextField
                     fullWidth
                     error={!!errors['password']}
                     helperText={errors['password']?.message}
                     label="Password"
                     margin="normal"
                     type="password"
                     variant="outlined"
                     {...register('password')}
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
                  <Typography color="textSecondary" variant="body2">
                     Don&apos;t have an account?{' '}
                     <NextLink href="/register">
                        <Link
                           href="/register"
                           variant="subtitle2"
                           underline="hover"
                           sx={{
                              cursor: 'pointer',
                           }}
                        >
                           Sign Up
                        </Link>
                     </NextLink>
                  </Typography>
               </form>
            </Container>
         </Box>
      </Box>
   )
}

export default Login
