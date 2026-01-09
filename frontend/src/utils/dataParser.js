// Utilities to normalize dataset fields, handle missing values and parse dates
export function safeString(v) {
  if (v === null || v === undefined || String(v).trim() === '') return 'Unknown';
  return String(v);
}

export function parseDate(value) {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d)) return null;
  return d;
}

export function normalizeRecords(records) {
  // Accept array of objects. Map common fields: date, category, severity, location, cause
  return records.map((r, idx) => {
    const dateValue = r.incident_date || r.createdAt || r.lastUpdated || r.date;
    const date = parseDate(dateValue ? new Date(dateValue) : null);
    
    return {
      id: r.id || r._id || r.recordId || idx,
      date,
      year: date ? date.getFullYear() : 'Unknown',
      month: date ? String(date.getMonth() + 1).padStart(2, '0') : 'Unknown',
      day: date ? String(date.getDate()).padStart(2, '0') : 'Unknown',
      category: safeString(r.primary_category || r.action_cause || r.category || r.type || r.incident_type),
      severity: safeString(r.severity_level !== undefined ? r.severity_level : (r.severity || r.risk_level || 'Unspecified')),
      location: safeString(r.location || r.site || r.area || 'Unknown'),
      cause: safeString(r.action_cause || r.cause || r.root_cause || r.reason || 'Unknown'),
      region: safeString(r.region || 'Unknown'),
      gbu: safeString(r.gbu || 'Unknown'),
      job: safeString(r.job || 'Unknown'),
      behavior_type: safeString(r.behavior_type || 'Unknown'),
      unsafe_condition_or_behavior: safeString(r.unsafe_condition_or_behavior || 'Unknown'),
      raw: r
    }
  })
}

// Aggregate helpers
export function groupBy(records, keyFn) {
  return records.reduce((acc, r) => {
    const k = keyFn(r);
    acc[k] = acc[k] || [];
    acc[k].push(r);
    return acc;
  }, {});
}