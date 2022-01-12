import {
   Box,
   Card,
   CardContent,
   CardHeader,
   Divider,
   MenuItem,
   Select,
   SelectChangeEvent,
   useTheme
} from '@mui/material'
import axiosClient from 'api-client/axios-client'
import { ChartOptions } from 'chart.js'
import { IncomePeriod, ResponseData } from 'models'
import { useState } from 'react'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'

interface Dataset {
   backgroundColor: string
   borderColor: string
   data: number[]
   label: string
   cubicInterpolationMode: 'monotone' | 'default'
}

interface ChartData {
   datasets: Dataset[]
   labels: string[]
}
export const Sales = (props: any) => {
   const [period, setPeriod] = useState('week')

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseData<IncomePeriod>>(url)
         .then((res: ResponseData<IncomePeriod>): ChartData | null => {
            if (res.data) {
               const newDatasets: Dataset[] = res.data.datasets.map(dataset => ({
                  backgroundColor: parseInt(dataset.ordinal) === 1 ? '#3F51B5' : '#00675b',
                  borderColor: parseInt(dataset.ordinal) === 1 ? '#3F51B5' : '#00675b',
                  data: dataset.data,
                  label: dataset.label,
                  cubicInterpolationMode: 'monotone'
                  // tension: 0.6
               }))
               return {
                  datasets: newDatasets,
                  labels: res.data.labels
               }
            }
            return null
         })
   }
   const { data } = useSWR(`orders/stats/income?type=${period}`, fetcher, {
      revalidateOnFocus: true
   })

   const options: ChartOptions<'line'> = {
      interaction: {
         intersect: false,
         mode: 'index'
      },
      layout: { padding: 0 },
      maintainAspectRatio: false,
      responsive: true,
      // xAxes: [
      //    {
      //       ticks: {
      //          fontColor: theme.palette.text.secondary
      //       },
      //       gridLines: {
      //          display: false,
      //          drawBorder: false
      //       }
      //    }
      // ],
      // yAxes: [
      //    {
      //       ticks: {
      //          fontColor: theme.palette.text.secondary,
      //          beginAtZero: true,
      //          min: 0
      //       },
      //       gridLines: {
      //          borderDash: [2],
      //          borderDashOffset: [2],
      //          color: theme.palette.divider,
      //          drawBorder: false,
      //          zeroLineBorderDash: [2],
      //          zeroLineBorderDashOffset: [2],
      //          zeroLineColor: theme.palette.divider
      //       }
      //    }
      // ],
      // tooltips: {
      //    backgroundColor: theme.palette.background.paper,
      //    bodyFontColor: theme.palette.text.secondary,
      //    borderColor: theme.palette.divider,
      //    borderWidth: 1,
      //    enabled: true,
      //    footerFontColor: theme.palette.text.secondary,
      //    intersect: false,
      //    mode: 'index',
      //    titleFontColor: theme.palette.text.primary
      // },
      scales: {
         // x: {
         //    display: true,
         //    title: {
         //       display: true,
         //       text: 'value',
         //       color: '#191',
         //       font: {
         //          family: 'Times',
         //          size: 20,
         //          style: 'normal',
         //          lineHeight: 1.2
         //       },
         //       padding: { top: 30, bottom: 0 }
         //    }
         // },
         y: {
            ticks: {
               callback: (label: string | number) => `$${label}`
            },
            display: true,
            title: {
               display: true,
               text: 'Income',
               font: {
                  family: 'Inter',
                  size: 14,
                  style: 'normal',
                  lineHeight: 1.2
               },
               padding: { top: 0, bottom: 10 }
            }
         }
      }
   }

   const handleChangePeriod = (event: SelectChangeEvent) => {
      setPeriod(event.target.value as string)
   }

   return (
      <Card {...props}>
         <CardHeader
            action={
               <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Select value={period} onChange={handleChangePeriod} size="small">
                     <MenuItem value="week">Last 7 days</MenuItem>
                     <MenuItem value="month">Last month</MenuItem>
                     <MenuItem value="year">Last year</MenuItem>
                  </Select>
                  {/* <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
                     Last 7 days
                  </Button> */}
               </Box>
            }
            title="Latest Sales"
         />
         <Divider />
         <CardContent>
            <Box
               sx={{
                  height: 400,
                  position: 'relative'
               }}
            >
               {data && <Line data={data} options={options} />}
            </Box>
         </CardContent>
         {/* <Divider />
         <Box
            sx={{
               display: 'flex',
               justifyContent: 'flex-end',
               p: 2
            }}
         >
            <Button color="primary" endIcon={<ArrowRightIcon fontSize="small" />} size="small">
               Overview
            </Button>
         </Box> */}
      </Card>
   )
}
