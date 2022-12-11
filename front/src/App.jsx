import { lazy } from 'react'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

const Crb = lazy(() => import('src/cbr'))

const App = () => <QueryClientProvider client={queryClient}>
  <Crb/>
  <ReactQueryDevtools initialIsOpen={false}/>
</QueryClientProvider>

export default App
