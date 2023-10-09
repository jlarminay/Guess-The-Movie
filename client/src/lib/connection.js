import axios from 'axios'
import router from '@/router'

const env = import.meta.env

const connection = axios.create({
  baseURL: (env.VITE_ENVIRONMENT === 'development' ? 'http://' : 'https://') + env.VITE_API_URL
})

connection.interceptors.request.use(
  async (config) => {
    console.log(config.method.toUpperCase() + ' ' + config.url)
    return config
  },
  (_error) => {
    //
  }
)

connection.interceptors.response.use(
  async (response) => {
    // console.log(response.status + ' ' + response.statusText)
    return response
  },
  (error) => {
    if (error.config === undefined) {
      router.push({ name: 'HomeView', query: { error: 'ConnectionError' } })
    }
  }
)

export default connection
