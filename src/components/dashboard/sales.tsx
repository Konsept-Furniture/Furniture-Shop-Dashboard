import { Bar, Line } from 'react-chartjs-2'
import { Box, Button, Card, CardContent, CardHeader, Divider, useTheme } from '@mui/material'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import IconReport from 'assets/IconReport'

export const Sales = (props: any) => {
   const theme = useTheme()

   const data = {
      datasets: [
         {
            backgroundColor: '#3F51B5',
            borderColor: '#3F51B5',
            data: [18, 5, 19, 27, 29, 19, 20],
            label: 'This year'
            // cubicInterpolationMode: 'monotone',
            // tension: 0.4
         },
         {
            backgroundColor: '#e9e9e9',
            // borderColor: '#EEEEEE',
            data: [11, 20, 12, 29, 30, 25, 13],
            label: 'Last year',
            maxBarThickness: 10
            // cubicInterpolationMode: 'monotone',
            // tension: 0.4
         }
      ],
      labels: ['1 Aug', '2 Aug', '3 Aug', '4 Aug', '5 Aug', '6 Aug', '7 aug']
   }

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

   return (
      <Card {...props}>
         <CardHeader
            action={
               <>
                  <Button
                     startIcon={<IconReport width={20} />}
                     variant="outlined"
                     onClick={() => {}}
                  >
                     Reports
                  </Button>
                  <Button endIcon={<ArrowDropDownIcon fontSize="small" />} size="small">
                     Last 7 days
                  </Button>
               </>
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
               <Line data={data} options={options} />
            </Box>
         </CardContent>
         <Divider />
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
         </Box>
      </Card>
   )
}
