'use client'

import { AreaChart, Card, Title } from '@tremor/react';
import React from 'react'

type Props = {
    results: Root;
}

function TempChart({ results }: Props) {
    const hourly = results?.hourly.time.map(time => new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
    })
  )
    .slice(1,25) // Only need first 24 values as this chart is only going to cover the day

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "UV Index": results.hourly.uv_index[i],
        "Temperature (°C)": results.hourly.temperature_2m[i],
    }))

    const dataFormatter = (number: number) => `${number}`
  return (
    <Card>
        <Title>Temperature & UV Index</Title>
        <AreaChart
          className='mt-6'
          data={data}
          showLegend
          index='time'
          categories={["Temperature (°C)", "UV Index" ]}
          colors={["yellow", "rose"]}
          minValue={0}
          valueFormatter={dataFormatter}
          yAxisWidth={40}

        
        />
    </Card>
  )
}

export default TempChart