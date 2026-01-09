import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function IncidentsByRegion({ data }){
  return (
    <div className="chart-container">
      <h3>Incidents by Region</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Incident Count" fill="#ff7300" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}