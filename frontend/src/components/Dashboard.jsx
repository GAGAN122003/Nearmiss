import React, { useEffect, useState } from 'react'
import api from '../api'
import Loader from './Loader'
import { normalizeRecords, groupBy } from '../utils/dataParser'
import IncidentsByCategory from './Charts/IncidentsByCategory'
import IncidentsOverTime from './Charts/IncidentsOverTime'
import SeverityPie from './Charts/SeverityPie'
import TopCausesDonut from './Charts/TopCausesDonut'
import LocationAreaChart from './Charts/LocationAreaChart'
import IncidentsByRegion from './Charts/IncidentsByRegion'

function prepareCategoryData(records){
  const grouped = groupBy(records, r => r.category)
  return Object.keys(grouped).map(k => ({ category: k, count: grouped[k].length })).sort((a,b)=>b.count-a.count)
}

function prepareMonthlyData(records){
  const months = {}
  records.forEach(r=>{
    if (!r.date) return;
    const key = `${r.date.getFullYear()}-${String(r.date.getMonth()+1).padStart(2,'0')}`
    months[key] = (months[key]||0)+1
  })
  return Object.keys(months).sort().map(k => ({ month: k, count: months[k] }))
}

function prepareSeverityData(records){
  const grouped = groupBy(records, r=>r.severity.toString())
  return Object.keys(grouped).map(k=>({ name: k, value: grouped[k].length }))
}

function prepareTopCauses(records, topN=6){
  const grouped = groupBy(records, r=>r.cause)
  const arr = Object.keys(grouped).map(k=>({ name: k, value: grouped[k].length })).sort((a,b)=>b.value-a.value)
  return arr.slice(0, topN)
}

function prepareLocations(records, topN=8){
  const grouped = groupBy(records, r=>r.location)
  const arr = Object.keys(grouped).map(k=>({ location: k, count: grouped[k].length })).sort((a,b)=>b.count-a.count)
  return arr.slice(0, topN)
}

function prepareRegionData(records){
  const grouped = groupBy(records, r => r.region)
  return Object.keys(grouped).map(k => ({ region: k, count: grouped[k].length })).sort((a,b) => b.count-a.count)
}

export default function Dashboard(){
  const [loading,setLoading] = useState(true)
  const [records,setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [filters, setFilters] = useState({
    region: '',
    year: '',
    category: ''
  })

  useEffect(()=>{
    api.fetchData().then(raw=>{
      const normalized = normalizeRecords(raw)
      setRecords(normalized)
      setFilteredRecords(normalized)
      setLoading(false)
    }).catch(e=>{
      console.error('Error fetching data:', e)
      setRecords([])
      setFilteredRecords([])
      setLoading(false)
    })
  },[])

  // Handle filtering
  useEffect(() => {
    let result = [...records]
    
    if (filters.region) {
      result = result.filter(r => r.region === filters.region)
    }
    if (filters.year) {
      result = result.filter(r => r.year === filters.year)
    }
    if (filters.category) {
      result = result.filter(r => r.category === filters.category)
    }
    
    setFilteredRecords(result)
  }, [filters, records])

  // Get unique values for filter dropdowns
  const regions = [...new Set(records.map(r => r.region))]
  const years = [...new Set(records.map(r => r.year))]
  const categories = [...new Set(records.map(r => r.category))]

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }))
  }

  if (loading) return <Loader />

  const cat = prepareCategoryData(filteredRecords)
  const monthly = prepareMonthlyData(filteredRecords)
  const severity = prepareSeverityData(filteredRecords)
  const causes = prepareTopCauses(filteredRecords)
  const locations = prepareLocations(filteredRecords)
  const regionsData = prepareRegionData(filteredRecords)

  return (
    <div className="container">
      <header className="header">
        <h1>Near Miss Dashboard</h1>
        <p className="muted">Construction Safety Insights - React + Recharts + Node.js</p>
      </header>

      {/* Filters Section */}
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="region">Region:</label>
          <select 
            id="region" 
            value={filters.region} 
            onChange={(e) => handleFilterChange('region', e.target.value)}
          >
            <option value="">All Regions</option>
            {regions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="year">Year:</label>
          <select 
            id="year" 
            value={filters.year} 
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
        
        <div className="filter-group">
          <label htmlFor="category">Category:</label>
          <select 
            id="category" 
            value={filters.category} 
            onChange={(e) => handleFilterChange('category', e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      <main>
        <div className="grid">
          <IncidentsByCategory data={cat} />
          <IncidentsOverTime data={monthly} />
          <SeverityPie data={severity} />
          <TopCausesDonut data={causes} />
          <LocationAreaChart data={locations} />
          <IncidentsByRegion data={regionsData} />
        </div>

        <section className="notes card">
          <h3>Dashboard Information</h3>
          <ul>
            <li>Total Records: {records.length}</li>
            <li>Filtered Records: {filteredRecords.length}</li>
            <li>Records with missing dates are excluded from time-series charts.</li>
            <li>Unknown or empty field values are mapped to "Unknown" to avoid chart errors.</li>
            <li>Data source: Construction near-miss incidents dataset with ~7,800 records.</li>
          </ul>
        </section>
      </main>
    </div>
  )
}