import { Backdrop } from '@mui/material'
import * as React from 'react'
import { Animation } from './Animation'
export interface LoadingBackdropProps {
   open?: boolean
}

export function LoadingBackdrop({ open }: LoadingBackdropProps) {
   return (
      <Backdrop
         sx={{ color: '#00000000', zIndex: theme => theme.zIndex.drawer + 1 }}
         open={open ? open : false}
      >
         <Animation type={'bubbles'} color={'#ef5350'} />
      </Backdrop>
   )
}
