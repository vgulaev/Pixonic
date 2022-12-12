import { queryClient } from 'src/config'
import { useFrom, useTo } from './useFromTo'

const FromTo = () => {
  const from = useFrom()
  const to = useTo()

  const handleChange = (field, value) => queryClient.setQueryData(
    [field],
    (new Date(value)).toISOString()
      .substring(0, 10)
  )

  return <>
    <input
      type='date'
      value={from.data || ''}
      onChange={e => handleChange('from', e.target.value)}
    />
    <input
      type='date'
      value={to.data || ''}
      onChange={e => handleChange('to', e.target.value)}
    />
  </>
}

export default FromTo
