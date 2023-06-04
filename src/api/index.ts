import axios from 'axios'
import type { AxiosPromise } from 'axios'
import type { FetchPassengersResponse } from '@/types'

const endpoints = {
  passengers: 'https://swapi.dev/api/people/'
}

export const fetchPassengers = async (): AxiosPromise<FetchPassengersResponse> => {
  const page = Math.floor(Math.random() * 10 + 1) // we randomize the page to emulate data changing over time in the database
  return axios.get(`${endpoints.passengers}${page ? `?page=${page}` : ''}`)
}
