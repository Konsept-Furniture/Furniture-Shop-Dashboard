import { memo, useRef, useState } from 'react'

import styled from '@emotion/styled'
import {
   Box,
   Button,
   Card,
   FormControl,
   FormHelperText,
   IconButton,
   Stack,
   Typography
} from '@mui/material'
import Image from 'next/image'
import { useController } from 'react-hook-form'
import CloseIcon from 'icons/close'

const FormField = styled.input`
   font-size: 18px;
   display: block;
   width: 100%;
   border: none;
   text-transform: none;
   position: absolute;
   top: 0;
   left: 0;
   right: 0;
   bottom: 0;
   opacity: 0;

   &:focus {
      outline: none;
   }
`
const MEGA_BYTES_PER_BYTE = 1024 * 1024
const DEFAULT_MAX_FILE_SIZE_IN_MB = 10
const DEFAULT_MAX_FILE_SIZE_IN_BYTES = DEFAULT_MAX_FILE_SIZE_IN_MB * MEGA_BYTES_PER_BYTE

const convertNestedObjectToArray = nestedObj => Object.keys(nestedObj).map(key => nestedObj[key])

const renderFileUrl = file => {
   if ('url' in file) {
      return file.url
   }

   return URL.createObjectURL(file)
}

const FilePreviewCard = memo(({ file, onRemove }) => {
   if (!file) return

   return (
      <Box sx={{ marginBottom: 2 }}>
         <Card
            sx={{
               minHeight: '50px',
               width: '100%',
               padding: '10px'
            }}
         >
            <Box
               sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
               }}
            >
               <Stack direction={'row'} alignItems="center" spacing={2}>
                  <Box sx={{ position: 'relative', minHeight: 100, minWidth: 150 }}>
                     <Image src={renderFileUrl(file)} layout="fill" />
                  </Box>
                  <Typography>{file.name ?? 'Untitled'}</Typography>
               </Stack>

               {onRemove != undefined && (
                  <IconButton color="default" onClick={onRemove}>
                     <CloseIcon width={24} height={24} />
                  </IconButton>
               )}
            </Box>
         </Card>
      </Box>
   )
})

const FileUpload = ({
   name,
   control,
   label,
   multiple = false,
   maxFileSizeInBytes = DEFAULT_MAX_FILE_SIZE_IN_BYTES,
   ...otherProps
}) => {
   const fileInputField = useRef(null)
   const {
      field: { value, onChange },
      fieldState: { error }
   } = useController({
      name,
      control
   })

   const addNewFiles = newFiles => {
      const oldFiles = [...value]
      const acceptedFiles = newFiles.filter(file =>
         file.size <= maxFileSizeInBytes ? true : false
      )
      const updatedFiles = oldFiles.concat(acceptedFiles)

      if (!multiple) {
         return [updatedFiles[0]]
      }

      return updatedFiles
   }

   const handleNewFileUpload = e => {
      const { files: newFiles } = e.target

      if (newFiles.length) {
         const filesAsArray = convertNestedObjectToArray(newFiles)

         if (multiple) {
            let updatedFiles = addNewFiles(filesAsArray)
            updateFiles(updatedFiles)
         } else {
            updateFiles(filesAsArray[0])
         }
      }
   }

   const updateFiles = newFiles => {
      console.log('🚀 ~ file: file-upload.jsx:133 ~ updateFiles ~ newFiles', newFiles)
      onChange(newFiles)
      // setFiles(newFiles)
      // updateFilesCb(newFiles)
   }

   const removeFile = index => () => {
      if (index < value.length) {
         const newFiles = [...value]
         newFiles.splice(index, 1)
         updateFiles(newFiles)
      }
   }

   const renderPreviewImages = () => {
      if (multiple) {
         if (value.length)
            return value.map((file, index) => (
               <FilePreviewCard
                  key={`${file.name}_${index}`}
                  file={file}
                  onRemove={removeFile(index)}
               />
            ))

         return <></>
      }

      if (value?.name || value?.url) return <FilePreviewCard file={value} />

      return <></>
   }

   return (
      <FormControl error={!!error} sx={{ width: '100%' }}>
         <Box
            sx={{
               position: 'relative',
               margin: '25px 0 0',
               border: '1px dashed',
               borderColor: !error ? 'lightgray' : '#f44336',
               padding: '35px 20px',
               borderRadius: 2,
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center'
            }}
         >
            <Typography
               sx={{
                  top: -25,
                  color: 'black',
                  left: 0,
                  position: 'absolute'
               }}
            >
               {label}
            </Typography>
            <Typography sx={{ fontWeight: '500', marginTop: 0, textAlign: 'center' }}>
               Drag and drop your files here
            </Typography>
            <Typography
               variant="subtitle1"
               //  sx={{ fontWeight: '400', marginTop: 0, textAlign: 'center' }}
            >
               Max size: {DEFAULT_MAX_FILE_SIZE_IN_MB}MB
            </Typography>
            {/* <Button onClick={handleUploadBtnClick}>Upload {multiple ? 'files' : 'a file'}</Button> */}
            <FormField
               type="file"
               ref={fileInputField}
               onChange={handleNewFileUpload}
               title=""
               value=""
               multiple={multiple}
               {...otherProps}
            />
         </Box>
         <FormHelperText>{error?.message}</FormHelperText>

         <Box sx={{ width: '100%' }}>{renderPreviewImages()}</Box>
      </FormControl>
   )
}

export default FileUpload
