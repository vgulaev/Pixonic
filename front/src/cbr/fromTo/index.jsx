// import { queryClient } from 'src/config'
import { useQueryClient } from '@tanstack/react-query'
import { singleRow, useSeries } from './useFromTo'
import { fetchSeriesData } from 'src/char/useData'
import styles from './index.module.css'

import IconButton from '@mui/material/IconButton'
import AddBoxIcon from '@mui/icons-material/AddBox'
import InputBase from '@mui/material/InputBase'

const formatDate = value => (new Date(value))
  .toISOString()
  .substring(0, 10)

const FromTo = () => {
  const queryClient = useQueryClient()
  const { data: series } = useSeries()

  const handleChange = (index, field, value) => {
    const newSeries = series.map(s => ({ ...s }))
    newSeries[index][field] = value
    queryClient.setQueryData(['series'], newSeries)
  }

  return <div className={styles.tagBox}>
    {(series || []).map((s, i) => <div key={i} className={styles.chip}>
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={s.from || ''}
        onChange={e => {
          const from = formatDate(e.target.value)
          handleChange(i, 'from', from)
          fetchSeriesData({ index: i, from, to: s.to })
        }}
      />
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={s.to || ''}
        onChange={e => {
          const to = formatDate(e.target.value)
          handleChange(i, 'to', formatDate(e.target.value))
          fetchSeriesData({ index: i, from: s.from, to })
        }}
      />
      <InputBase
        className={styles.rounded}
        type='color'
        size='small'
        style={{ width: '50px' }}
        value={s.color || '#000000'}
        onChange={e => handleChange(i, 'color', e.target.value)}
      />
    </div>)}
    <div className={styles.chip}>
      <IconButton
        style={{ transform: 'scale(1.3)' }}
        onClick={() => queryClient.setQueryData(['series'], [...series, { ...singleRow[0] }])}>
        <AddBoxIcon/>
      </IconButton>
    </div>

    {/* <div className={styles.chip}>
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={from.data || ''}
        // size='small'
        onChange={e => handleChange('from', e.target.value)}
      />
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={to.data || ''}
        onChange={e => handleChange('to', e.target.value)}
      />
      <InputBase
        className={styles.rounded}
        type='color'
        size='small'
        style={{ width: '50px' }}
        value={color || '#000000'}
        onChange={e => setColor(e.target.value)}
      />
    </div>
    <div className={styles.chip}>
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={from.data || ''}
        // size='small'
        onChange={e => handleChange('from', e.target.value)}
      />
      <InputBase
        className={styles.roundedDate}
        type='date'
        value={to.data || ''}
        onChange={e => handleChange('to', e.target.value)}
      />
      <InputBase
        className={styles.rounded}
        type='color'
        size='small'
        style={{ width: '50px' }}
        value={color || '#000000'}
        onChange={e => setColor(e.target.value)}
      />
    </div> */}
  </div>
}

export default FromTo
