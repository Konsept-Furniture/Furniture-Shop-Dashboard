import { PaginationParams } from 'models'

declare global {
   interface Navigator {
      msSaveBlob?: (blob: any, defaultName?: string) => boolean
   }
}

// function capitalizeFirstLetter(string: any) {
//    return string.charAt(0).toUpperCase() + string.slice(1)
// }
export function downloadFile(data: any, filename: string, mime?: string) {
   // It is necessary to create a new blob object with mime-type explicitly set
   // otherwise only Chrome works like it should
   const blob = new Blob([data], { type: mime || 'application/octet-stream' })
   if (typeof window.navigator.msSaveBlob !== 'undefined') {
      // IE doesn't allow using a blob object directly as link href.
      // Workaround for "HTML7007: One or more blob URLs were
      // revoked by closing the blob for which they were created.
      // These URLs will no longer resolve as the data backing
      // the URL has been freed."
      window.navigator.msSaveBlob(blob, filename)
      return
   }
   // Other browsers
   // Create a link pointing to the ObjectURL containing the blob
   const blobURL = window.URL.createObjectURL(blob)
   const tempLink = document.createElement('a')
   tempLink.style.display = 'none'
   tempLink.href = blobURL
   tempLink.setAttribute('download', filename)
   // Safari thinks _blank anchor are pop ups. We only want to set _blank
   // target if the browser does not support the HTML5 download attribute.
   // This allows you to download files in desktop safari if pop up blocking
   // is enabled.
   if (typeof tempLink.download === 'undefined') {
      tempLink.setAttribute('target', '_blank')
   }
   document.body.appendChild(tempLink)
   tempLink.click()
   document.body.removeChild(tempLink)
   setTimeout(() => {
      // For Firefox it is necessary to delay revoking the ObjectURL
      window.URL.revokeObjectURL(blobURL)
   }, 100)
}

export const renderPaginationText = (pagination: PaginationParams) => {
   const isLastIndex = pagination.currentPage === pagination.totalPages
   return `Showing ${
      pagination.totalItems > 0 ? (pagination.currentPage - 1) * pagination.pageSize + 1 : 0
   }–${!isLastIndex ? pagination.currentPage * pagination.pageSize : pagination.totalItems} of ${
      pagination.totalItems
   } results`
}
