import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

export default function IncidentsByCategory({ data }){
  return (
    <div className="chart-container">
      <h3>Incidents by Category</h3>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="count" name="Incident Count" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}