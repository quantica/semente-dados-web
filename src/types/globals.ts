import { FilterItem } from '../components/Filter'

export type User = {
  id?: string
  name: string
  surname: string
  email: string
  password?: string
}

export interface ListInputParams {
  filter?: string
  page?: string
  offset?: string
  relations: FilterItem
}
