import { useQuery } from '@tanstack/react-query'
import { useFrom, useTo } from 'src/cbr/fromTo/useFromTo'
import { defQueryParams } from 'src/helpers'

const formatDate = value => (new Date(value)).toISOString()
  .substring(0, 10).split('-').reverse().join('/')

export const useData = () => {
  const { data: from } = useFrom()
  const { data: to } = useTo()

  const queryFn = () => {
    if (!from || !to || (from >= to)) return {}

    const url = new URL('http://localhost:8000/getData')

    url.searchParams.set('from', formatDate(from))
    url.searchParams.set('to', formatDate(to))

    return fetch(url.toString())
      .then(res => res.json())
  }

  const query = useQuery({ queryKey: ['record', from, to], queryFn, ...defQueryParams, cacheTime: 0 })

  return query
}
