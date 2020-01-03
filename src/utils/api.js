import axios from "axios"
import config from "../auth_config.json"

const apiHeaders = {
  "content-type": "application/json",
  "x-apikey": config.apiKey,
  "cache-control": "no-cache"
}

const apiInstance = axios.create({
  baseURL: config.apiBase,
  headers: apiHeaders
})

apiInstance.interceptors.response.use((response) => response.data || response)

const Api = {
  get: (path) => apiInstance.get(path),
  post: (path, payload) => apiInstance.post(path, payload)
}

export default Api
