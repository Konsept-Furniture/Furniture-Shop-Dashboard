import { Bar, Line } from 'react-chartjs-2'
import {
   MenuItem,
   Box,
   Button,
   Card,
   CardContent,
   CardHeader,
   Divider,
   Select,
   useTheme,
   SelectChangeEvent
} from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import IconReport from 'assets/IconReport'
import { useState } from 'react'
import axiosClient from 'api-client/axios-client'
import { IncomePeriod, ResponseData } from 'models'
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
   const theme = useTheme()
   const [period, setPeriod] = useState('week')

   const fetcher = (url: string) => {
      return axiosClient
         .get<any, ResponseData<IncomePeriod>>(url)
         .then((res: ResponseData<IncomePeriod>): ChartData | null => {
            if (res.data) {
               const newDatasets: Dataset[] = res.data.datasets.map(dataset => ({
                  backgroundColor: parseInt(dataset.ordinal) === 1 ? '#3F51B5' : '#db5446',
                  borderColor: parseInt(dataset.ordinal) === 1 ? '#3F51B5' : '#db5446',
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

   const options = {
      cornerRadius: 20,
      layout: { padding: 0 },
      legend: { display: false },
      maintainAspectRatio: false,
      responsive: true,
      xAxes: [
         {
            ticks: {
               fontColor: theme.palette.text.secondary
            },
            gridLines: {
               display: false,
               drawBorder: false
            }
         }
      ],
      yAxes: [
         {
            ticks: {
               fontColor: theme.palette.text.secondary,
               beginAtZero: true,
               min: 0
            },
            gridLines: {
               borderDash: [2],
               borderDashOffset: [2],
               color: theme.palette.divider,
               drawBorder: false,
               zeroLineBorderDash: [2],
               zeroLineBorderDashOffset: [2],
               zeroLineColor: theme.palette.divider
            }
         }
      ],
      tooltips: {
         backgroundColor: theme.palette.background.paper,
         bodyFontColor: theme.palette.text.secondary,
         borderColor: theme.palette.divider,
         borderWidth: 1,
         enabled: true,
         footerFontColor: theme.palette.text.secondary,
         intersect: false,
         mode: 'index',
         titleFontColor: theme.palette.text.primary
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
