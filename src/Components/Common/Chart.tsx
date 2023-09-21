import { Title } from "@mui/icons-material"
import React from "react"
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';

function createData(time:any, amount:any) {
  return { time, amount };
}

type Props = {
  dataArray:number[][]
}

const Chart:React.FC<Props> = (dataProps) => {

  const dataObject = dataProps.dataArray.map(el => createData(el[0],el[1]))
    
    const theme = useTheme();

    return (<React.Fragment>
    <Title>Today</Title>
    <ResponsiveContainer>
      <LineChart
        data={dataObject}
        margin={{
          top: 16,
          right: 16,
          bottom: 0,
          left: 24,
        }}
      >
        <XAxis
          dataKey="time"
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        />
        <YAxis
          stroke={theme.palette.text.secondary}
          style={theme.typography.body2}
        >
          <Label
            angle={270}
            position="left"
            style={{
              textAnchor: 'middle',
              fill: theme.palette.text.primary,
              ...theme.typography.body1,
            }}
          >
            Counts
          </Label>
        </YAxis>
        <Line
          isAnimationActive={false}
          type="monotone"
          dataKey="amount"
          stroke={theme.palette.primary.main}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  </React.Fragment>
)
}

export default Chart;