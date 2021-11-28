import { TextField } from '@mui/material'
import React from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'

export interface TextInputProps {
   form: UseFormReturn
   name: string
   label: string
}

export function TextInput(props: TextInputProps) {
   const { form, name, label, ...restProps } = props
   const {
      control,
      formState: { errors },
   } = form

   return (
      <Controller
         name={name}
         control={control}
         render={({ field }) => (
            <TextField
               fullWidth
               variant="outlined"
               margin="normal"
               helperText={errors[name]?.message}
               error={!!errors[name]}
               label={label}
               name={name}
               {...field}
               {...restProps}
            />
         )}
      />
   )
}
