import { Backdrop, CircularProgress } from '@mui/material'
import * as React from 'react'
import ReactLoading from 'react-loading'
import { Animation } from './Animation'
export interface LoadingBackdropProps {
   open?: boolean
}

export function LoadingBackdrop({ open }: LoadingBackdropProps) {
   return (
      <Backdrop
         sx={{ color: '#00000000', zIndex: theme => theme.zIndex.drawer + 1 }}
         open={open ? open : true}
      >
      <Animation/>
);
      </Backdrop>
   )
}
