import type { Passenger } from '@/types'
import { seed, randFullName, randNumber } from '@ngneat/falso'
import type { AxiosResponse, AxiosPromise } from 'axios'
import type { FetchPassengersResponse } from '@/types'

export const mockAxiosResponse = <T>(data: T): AxiosResponse => ({
  data,
  status: 200,
  statusText: 'OK',
  headers: {},
  config: {}
})

export const mockPassenger = (key: string | number): Passenger => {
  seed(String(key))
  return {
    name: randFullName(),
    height: String(randNumber({ min: 140, max: 200 })),
    mass: String(randNumber({ min: 40, max: 120 }))
  }
}

export const mockFetchPassengers = (
  additionalPassengers: Passenger[] = []
): AxiosPromise<FetchPassengersResponse> => {
  const mockedPassengers = Array.from({ length: 5 }).map((_, i) => mockPassenger(i))
  return Promise.resolve(
    mockAxiosResponse({ results: [...mockedPassengers, ...additionalPassengers] })
  )
}
