import { useQuery } from '@tanstack/react-query'

const defQueryParams = {
  cacheTime: 'Infinity',
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
}

const queryFn = () => fetch('http://localhost:8000/getData')
  .then(res => res.json())

export const useData = () => {

  const query = useQuery({ queryKey: ['all'], queryFn, ...defQueryParams })

  return query
}
