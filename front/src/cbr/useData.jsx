import { useQuery } from '@tanstack/react-query'

const defQueryParams = {
  cacheTime: 'Infinity',
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  refetchOnMount: false,
}


export const useData = () => {
  var url = new URL('http://localhost:8000/getData')
  url.searchParams.set('from', '01/01/2010')
  url.searchParams.set('to', '01/01/2012')

  const queryFn = () => fetch(url.toString())
    .then(res => res.json())

  const query = useQuery({ queryKey: ['all'], queryFn, ...defQueryParams })

  return query
}
