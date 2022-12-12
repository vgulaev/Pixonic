import { useQuery } from '@tanstack/react-query'
import { defQueryParams } from 'src/helpers'
import { queryClient } from 'src/config'

export const useFrom = () => useQuery({ queryKey: ['from'], queryFn: ({ queryKey }) => queryClient.getQueryData(queryKey) || '2022-07-01', ...defQueryParams })

export const useTo = () => useQuery({ queryKey: ['to'], queryFn: ({ queryKey }) => queryClient.getQueryData(queryKey) || '2022-09-30', ...defQueryParams })

