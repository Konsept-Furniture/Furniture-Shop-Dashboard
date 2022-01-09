import { FormControl, FormHelperText, InputLabel, MenuItem } from '@mui/material'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Theme, useTheme } from '@mui/material/styles'
import React from 'react'
import { Control, useController } from 'react-hook-form'

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
   options: SelectOption[]
}
const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         width: 250
      }
   }
}
function getStyles(option: SelectOption, options: readonly SelectOption[], theme: Theme) {
   return {
      fontWeight:
         options.indexOf(option) === -1
            ? theme.typography.fontWeightRegular
            : theme.typography.fontWeightMedium
   }
}

export function CustomSelectField({
   name,
   control,
   label,
   disabled,
   options,
   multiple
}: CustomSelectFieldProps) {
   const theme = useTheme()

   const handleChange = (event: SelectChangeEvent<string>) => {
      const {
         target: { value }
      } = event

      onChange(typeof value === 'string' && value.includes(',') ? value.split(',') : value)
   }

   const {
      field: { value, onChange, onBlur },
      fieldState: { invalid, error }
   } = useController({
      name,
      control
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
            multiple={!!multiple}
         >
            {options
               ? options.map((item: SelectOption) => (
                    <MenuItem
                       key={item.value}
                       value={item.value}
                       style={getStyles(item, options, theme)}
                    >
                       {item.label}
                    </MenuItem>
                 ))
               : null}
         </Select>

         <FormHelperText>{error?.message}</FormHelperText>
      </FormControl>
   )
}
