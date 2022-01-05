import CloseIcon from '@mui/icons-material/Close'
import { useMediaQuery } from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import { styled, useTheme } from '@mui/material/styles'
import React from 'react'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
   px: 3,
   minWidth: 500,
   '& .MuiDialogContent-root': {
      padding: theme.spacing(2)
   },
   '& .MuiDialogActions-root': {
      padding: theme.spacing(1)
   }
}))

export interface DialogTitleProps {
   children?: React.ReactNode
   onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
   const { children, onClose, ...other } = props

   return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
         {children}
         {onClose ? (
            <IconButton
               aria-label="close"
               onClick={onClose}
               sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: theme => theme.palette.grey[500]
               }}
            >
               <CloseIcon />
            </IconButton>
         ) : null}
      </DialogTitle>
   )
}

export interface CustomizedModalProps {
   open: boolean
   title?: React.ReactNode
   children?: React.ReactNode
   actions?: React.ReactNode[]
   onClose: () => void
}

export default function CustomizedModal({
   open,
   onClose,
   title,
   actions,
   children,
   ...restProps
}: CustomizedModalProps) {
   const theme = useTheme()
   const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

   return (
      <BootstrapDialog
         scroll="body"
         fullScreen={fullScreen}
         maxWidth="sm"
         fullWidth
         onClose={onClose}
         open={open}
         {...restProps}
      >
         {title && <BootstrapDialogTitle onClose={onClose}>{title}</BootstrapDialogTitle>}
         <DialogContent dividers>{children}</DialogContent>
         {actions && (
            <DialogActions>
               {actions}
               {/* <Button variant="text" onClick={onClose}>
                  Cancel
               </Button>
               <Button variant="contained" autoFocus onClick={onClose}>
                  Save
               </Button> */}
            </DialogActions>
         )}
      </BootstrapDialog>
   )
}
