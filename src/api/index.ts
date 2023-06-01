import axios from 'axios'
import type { AxiosPromise } from 'axios'
import type { User } from '../types'

const endpoints = {
  users: 'https://swapi.dev/api/people/'
}

type FetchUsersResponse = {
  results: User[]
}

export const fetchUsers = async (): AxiosPromise<FetchUsersResponse> => {
  const page = Math.floor(Math.random() * 10 + 1) // we randomize the page to emulate data changing over time in the database
  return axios.get(`${endpoints.users}${page ? `?page=${page}` : ''}`)
}
