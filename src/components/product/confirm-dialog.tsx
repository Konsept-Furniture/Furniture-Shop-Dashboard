import {
   Avatar,
   Box,
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle
} from '@mui/material'
import React, { ReactNode } from 'react'

export interface ConfirmDialogProps {
   icon?: ReactNode
   isOpen: boolean
   title: string
   body?: ReactNode | string
   onSubmit?: Function
   onClose: Function
}

export function ConfirmDialog(props: ConfirmDialogProps) {
   const { icon, isOpen, title, body, onSubmit, onClose } = props

   const handleClose = () => {
      if (onClose) onClose()
   }
   const handleSubmit = () => {
      if (onSubmit) onSubmit()
   }
   return (
      <Dialog open={isOpen} onClose={handleClose}>
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {icon && <Box sx={{ ml: 2 }}>{icon}</Box>}
            <Box sx={{ flex: 1 }}>
               <DialogTitle>{title}</DialogTitle>
               <DialogContent>
                  <DialogContentText>{body}</DialogContentText>
               </DialogContent>
            </Box>
         </Box>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
               Confirm
            </Button>
         </DialogActions>
      </Dialog>
   )
}
