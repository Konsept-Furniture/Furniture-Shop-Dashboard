import { TextField } from '@mui/material'
import { Product, ProductPayload } from 'models'
import React from 'react'
import { Control, Controller, useController, UseFormReturn } from 'react-hook-form'
import { InputHTMLAttributes } from 'react'

export interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   control: Control<any>
   label?: string
   disabled?: boolean
   multiline?: boolean
   rows?: number | string | undefined
}

export function CustomTextField({
   name,
   control,
   label,
   disabled = false,
   multiline = false,
   rows,
   ...restProps
}: CustomTextFieldProps) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   })

   return (
      <TextField
         fullWidth
         variant="outlined"
         margin="normal"
         value={value}
         onChange={onChange}
         onBlur={onBlur}
         label={label}
         inputRef={ref}
         error={invalid}
         helperText={error?.message}
         disabled={disabled}
         multiline={multiline}
         rows={rows}
         inputProps={restProps}
      />
   )
}
