import { Unauth } from 'components/unauth'
import { ReactNode } from 'react'

export const LoginLayout = ({ children }: { children: ReactNode }) => {
   return <Unauth>{children}</Unauth>
}
