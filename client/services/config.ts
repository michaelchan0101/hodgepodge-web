import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:3000'

export async function getConfig() {
  const result = await axios.get(`${BASE_URL}/api/v1.0/config`)
  return result.data
}
