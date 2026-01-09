import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

export async function fetchData() {
  const res = await axios.get(`${API_BASE}/api/data`);
  return res.data.records || [];
}

export default { fetchData };