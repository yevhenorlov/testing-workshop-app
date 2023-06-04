export type Passenger = {
  name: string
  height: string
  mass: string
}

export type FetchPassengersResponse = {
  results: Passenger[]
}
