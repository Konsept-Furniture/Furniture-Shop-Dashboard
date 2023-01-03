import { useRouter } from 'next/router'
import React, { ReactNode, useEffect } from 'react'
import { useAuth } from '../hooks'
import { LoadingBackdrop } from './loading'

// export interface AuthProps {
//    children: ReactNode
// }

export function Auth({ children }) {
   const router = useRouter()

   return <div>{children}</div>
}
