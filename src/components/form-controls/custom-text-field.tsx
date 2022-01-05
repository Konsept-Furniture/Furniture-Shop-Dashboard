import { InputProps, TextField } from '@mui/material'
import React, { InputHTMLAttributes } from 'react'
import { Control, useController } from 'react-hook-form'

export interface CustomTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
   name: string
   control: Control<any>
   label?: string
   disabled?: boolean
   multiline?: boolean
   rows?: number | string | undefined
   InputProps?: Partial<InputProps>
}

export function CustomTextField({
   name,
   control,
   label,
   disabled = false,
   multiline = false,
   rows,
   InputProps,
   ...restProps
}: CustomTextFieldProps) {
   const {
      field: { value, onChange, onBlur, ref },
      fieldState: { invalid, error }
   } = useController({
      name,
      control
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
         InputProps={InputProps}
         inputProps={restProps}
      />
   )
}
