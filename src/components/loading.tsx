import { Backdrop, CircularProgress } from '@mui/material'
import * as React from 'react'

export interface LoadingBackdropProps {
   open?: boolean
}

export function LoadingBackdrop({ open }: LoadingBackdropProps) {
   return (
      <Backdrop
         sx={{ color: 'secondary.main', zIndex: theme => theme.zIndex.drawer + 1 }}
         open={open ? open : true}
      >
         <CircularProgress color="inherit" />
      </Backdrop>
   )
}
