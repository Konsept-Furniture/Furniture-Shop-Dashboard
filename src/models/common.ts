import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { EmotionCache } from '@emotion/react'

export interface ResponseData<T> {
   data: T
   errorCode: number
   message: string
}

export interface IncomeDataset {
   ordinal: string
   data: number[]
   label: string
}

export interface IncomePeriod {
   datasets: IncomeDataset[]
   labels: string[]
}

export interface HeadCell {
   id: string
   align: 'left' | 'center' | 'right' | 'justify' | 'inherit'
   label: string
   sortable: boolean
}

//LAYOUT
export interface LayoutProps {
   children: ReactNode
}

export type NextPageWithLayout = NextPage & {
   Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
   Component: NextPageWithLayout
   emotionCache?: EmotionCache
}

//API
export interface PaginationParams {
   totalItems: number
   totalPages: number
   currentPage: number
   pageSize: number
}
export interface ListParams {
   page?: number
   pageSize?: number

   [key: string]: any
}

export interface ResponseListData<T> {
   data: T[]
   pagination: PaginationParams
   errorCode: Number
   messgae: string
}
