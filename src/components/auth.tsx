import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../hooks'
import { LoadingBackdrop } from './loading'

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
   }, [router, profile, firstLoading])

   if (!profile?.username) return <LoadingBackdrop />

   return <div>{children}</div>
}
