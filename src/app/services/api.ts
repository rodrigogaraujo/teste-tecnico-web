import axios, { AxiosError } from 'axios'
import { AuthTokenError } from './errors/AuthTokenError'

export function setupAPIClient(){

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "app-id": process.env.NEXT_PUBLIC_APP_ID!,
    },
  })

  api.interceptors.response.use(response => {
    return response
  }, (error: AxiosError) => {
    if(error.response && error.response.status === 401){
      if(typeof window !== undefined){
        // regra
      } else {
        return Promise.reject(new AuthTokenError())
      }
    }
    return Promise.reject(error)
  })

  return api

}