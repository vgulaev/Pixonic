import { lazy } from 'react'
import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { queryClient } from 'src/config'

const Crb = lazy(() => import('src/cbr'))

const App = () => <QueryClientProvider client={queryClient}>
  <Crb/>
  <ReactQueryDevtools initialIsOpen={false}/>
</QueryClientProvider>

export default App
