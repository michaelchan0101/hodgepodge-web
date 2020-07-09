import axios from 'axios'

const BASE_URL = process.env.apiHost
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
})

export default instance
