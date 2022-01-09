import { LoginPayload, User } from './../models'
import { authApi } from './../api-client'
import useSWR from 'swr'
import { PublicConfiguration } from 'swr/dist/types'
import axiosClient from 'api-client/axios-client'

const fetcher = (url: string) => {
   axiosClient.get(url).then(res => {
      console.log(res.data)
      return res.data
   })
}

export function useAuth(options?: Partial<PublicConfiguration>) {
   const {
      data: profile,
      error,
      mutate
   } = useSWR('users/read/infor', {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      revalidateOnFocus: false,
      ...options
   })

   const firstLoading = profile === undefined && error === undefined

   async function login(payload: LoginPayload) {
      await authApi.login(payload)

      await mutate()
   }

   async function logout() {
      await authApi.logout()
      mutate({}, false)
   }

   async function updateProfile(payload: Partial<User>) {
      await authApi.updateProfile(payload).then(res => {
         mutate({ ...res.data }, true)
      })
   }

   return {
      profile,
      error,
      login,
      logout,
      updateProfile,
      firstLoading
   }
}
