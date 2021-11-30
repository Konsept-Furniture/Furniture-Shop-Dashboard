import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material'
import React, { useState } from 'react'
import { Control, useController } from 'react-hook-form'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Theme, useTheme } from '@mui/material/styles'
import useSWR from 'swr'
import { Category } from 'models'

export interface SelectOption {
   label?: string
   value: number | string
}

export interface CustomSelectFieldProps {
   name: string
   control: Control<any>
   label?: string
   disabled?: boolean
   multiple?: boolean
}
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250,
      },
   },
}
function getStyles(option: Category, options: readonly Category[], theme: Theme) {
   return {
      fontWeight:
         options.indexOf(option) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium,
   }
}

export function CustomSelectField({
   name,
   control,
   label,
   disabled,
   multiple = false,
}: CustomSelectFieldProps) {
   const { data: { data: options } = {} } = useSWR('categories', {
      dedupingInterval: 60 * 60 * 1000, // 1hr
      revalidateOnFocus: false,
      revalidateOnMount: true,
   })
   const theme = useTheme()

   const handleChange = (event: SelectChangeEvent<string>) => {
      const {
         target: { value },
      } = event
      onChange(
         // On autofill we get a the stringified value.
         typeof value === 'string' ? value.split(',') : value,
      )
   }

   const {
      field: { value, onChange, onBlur },
      fieldState: { invalid, error },
   } = useController({
      name,
      control,
   })

   return (
      <FormControl fullWidth variant="outlined" margin="normal" disabled={disabled} error={invalid}>
         <InputLabel id={`${name}_label`}>{label}</InputLabel>
         <Select
            labelId={`${name}_label`}
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            label={label}
            multiple={multiple}
         >
            {options
               ? options.map((item: Category) => (
                    <MenuItem
                       key={item._id}
                       value={item.name}
                       style={getStyles(item, options, theme)}
                    >
                       {item.name}
                    </MenuItem>
                 ))
               : null}
         </Select>

         <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
   )
}
