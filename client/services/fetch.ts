import axios from 'axios'

const BASE_URL = 'http://127.0.0.1:3000'
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 1000,
})

export default instance
