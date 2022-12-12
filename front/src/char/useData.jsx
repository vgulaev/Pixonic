import { useQuery } from '@tanstack/react-query'
import produce from 'immer'
import { useFrom, useTo } from 'src/cbr/fromTo/useFromTo'
import { queryClient } from 'src/config'
import { defQueryParams } from 'src/helpers'

const formatDate = value => (new Date(value)).toISOString()
  .substring(0, 10).split('-').reverse().join('/')

export const fetchSeriesData = ({ index, from, to }) => {
  if (!from || !to || (from >= to)) return
  const seriesData = queryClient.getQueryData(['seriesData']) || []

  const url = new URL(`http://${location.hostname}:8000/getData`)

  url.searchParams.set('from', formatDate(from))
  url.searchParams.set('to', formatDate(to))

  fetch(url.toString())
    .then(res => res.json())
    .then(jsoned => {
      const newSeriesData = produce(seriesData, draftState => {
        draftState[index] = jsoned
      })
      queryClient.setQueryData(['seriesData'], newSeriesData)
    })
}

export const useSeriesData = () => useQuery({ queryKey: ['seriesData'], queryFn: ({ queryKey }) => queryClient.getQueryData(queryKey) || [], ...defQueryParams })

export const useData = () => {
  const { data: from } = useFrom()
  const { data: to } = useTo()

  useSeriesData()

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
