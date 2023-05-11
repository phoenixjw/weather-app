'use client'

import { AreaChart, Card, Title } from '@tremor/react';
import React from 'react'

type Props = {
    results: Root;
}

function HumidityChart({ results }: Props) {
    const hourly = results?.hourly.time.map(time => new Date(time).toLocaleString("en-US", {
        hour: "numeric",
        hour12: false,
    })
  )
    .slice(1,25) // Only need first 24 values as this chart is only going to cover the day

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "Humidity (%)": results.hourly.relativehumidity_2m[i],
    }))

    const dataFormatter = (number: number) => `${number} %`
  return (
    <Card>
        <Title>Humidity Levels</Title>
        <AreaChart
          className='mt-6'
          data={data}
          showLegend
          index='time'
          categories={["Humidity (%)"]}
          colors={["teal"]}
          minValue={0}
          maxValue={100}
          valueFormatter={dataFormatter}
          yAxisWidth={40}

        
        />
    </Card>
  )
}

export default HumidityChart