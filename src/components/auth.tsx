import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../hooks'

export interface AuthProps {
   children: ReactNode
}

export function Auth({ children }: AuthProps) {
   const router = useRouter()
   const { profile, firstLoading } = useAuth()

   useEffect(() => {
      if (!firstLoading && !profile?.username) {
         router.push('/login')
      }
      console.log('profile', profile)
   }, [router, profile, firstLoading])

   if (!profile?.username) return <p>Loading...</p>

   return <div>{children}</div>
}
