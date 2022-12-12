import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import { useSeriesData } from 'src/char/useData'

const View = () => {
  const query = useSeriesData()

  if (!query.data?.length) return <>No data</>

  return <TableContainer>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Series ID</TableCell>
          <TableCell>Date</TableCell>
          <TableCell align="right">Price</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {(query.data.map((d, index) => d.Record.map(r => ({
          z: index,
          x: r.Date,
          Value: r.Value
        }))).flat()).map((row, index) => (
          <TableRow
            key={index}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            <TableCell component="th" scope="row">
              {row.z}
            </TableCell>
            <TableCell>{row.x}</TableCell>
            <TableCell align="right">{row.Value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}

export default View
