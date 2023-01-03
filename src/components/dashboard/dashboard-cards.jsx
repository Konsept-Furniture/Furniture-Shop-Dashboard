import { Grid } from '@mui/material'
import axiosClient from 'api-client/axios-client'
import { ResponseData } from 'models'
import * as React from 'react'
import useSWR from 'swr'
import { Budget, TotalCustomers, TotalOrders, TotalProfit } from '.'

// export interface DashboardCardsProps {}

// export interface CardData {
//    label: string
//    value: string | number
//    compareLastMonth: number
// }
export function DashboardCards(props) {
   // const fetcher = (url: string) => {
   //    return axiosClient
   //       .get<any, ResponseData<{ dataMenu: CardData[] }>>(url)
   //       .then((res: ResponseData<{ dataMenu: CardData[] }>): CardData[] => {
   //          if (res.data) {
   //             const lisCardData: CardData[] = res.data.dataMenu.map(data => ({
   //                label: data.label,
   //                value: data.value,
   //                compareLastMonth: data.compareLastMonth
   //             }))
   //             return lisCardData
   //          }
   //          return []
   //       })
   // }
   // const { data } = useSWR(`orders/stats/card`, fetcher, {
   //    revalidateOnFocus: true
   // })
   return (
      <Grid item container spacing={3}>
         {/* <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Budget />
         </Grid> */}
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalCustomers
               data={{
                  label: 'Label',
                  value: 12,
                  compareLastMonth: 12
               }}
            />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalOrders
               data={{
                  label: 'Label',
                  value: 12,
                  compareLastMonth: 12
               }}
            />
         </Grid>
         <Grid item xl={4} lg={4} sm={6} xs={12}>
            <TotalProfit
               data={{
                  label: 'Label',
                  value: 12,
                  compareLastMonth: 12
               }}
            />
         </Grid>
      </Grid>
   )
}
