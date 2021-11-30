import {
   Button,
   Dialog,
   DialogActions,
   DialogContent,
   DialogContentText,
   DialogTitle,
} from '@mui/material'
import React, { ReactNode } from 'react'

export interface ConfirmDialogProps {
   isOpen: boolean
   title: string
   body?: ReactNode | string
   onSubmit?: Function
   onClose: Function
}

export function ConfirmDialog(props: ConfirmDialogProps) {
   const { isOpen, title, body, onSubmit, onClose } = props

   const handleClose = () => {
      if (onClose) onClose()
   }
   const handleSubmit = () => {
      if (onSubmit) onSubmit()
   }
   return (
      <Dialog
         open={isOpen}
         onClose={handleClose}
         aria-labelledby="alert-dialog-title"
         aria-describedby="alert-dialog-description"
      >
         <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
         <DialogContent>
            <DialogContentText id="alert-dialog-description">{body}</DialogContentText>
         </DialogContent>
         <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit} autoFocus>
               Confirm
            </Button>
         </DialogActions>
      </Dialog>
   )
}
