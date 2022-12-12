import { useQuery } from '@tanstack/react-query'
import { defQueryParams } from 'src/helpers'
import { queryClient } from 'src/config'
import { fetchSeriesData } from 'src/char/useData'

export const useFrom = () => useQuery({ queryKey: ['from'], queryFn: ({ queryKey }) => queryClient.getQueryData(queryKey) || '2022-07-01', ...defQueryParams })

export const useTo = () => useQuery({ queryKey: ['to'], queryFn: ({ queryKey }) => queryClient.getQueryData(queryKey) || '2022-09-30', ...defQueryParams })

export const singleRow = [
  {
    from: '2022-07-01',
    to: '2022-09-30',
    color: '#000000'
  }
]

const queryFn = ({ queryKey }) => {
  const data = queryClient.getQueryData(queryKey)
  if (data) return data
  fetchSeriesData({ ...singleRow[0], index: 0 })
  return [{ ...singleRow[0] }]
}

export const useSeries = () => useQuery({ queryKey: ['series'], queryFn, ...defQueryParams })
