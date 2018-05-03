import { Table } from 'semantic-ui-react'
import { map } from 'lodash'
import isImageLight from '../lib/isImageLight'
import SourceImageGrid from './SourceImageGrid'

export default ({value})=> (
  <Table collapsing>
    <Table.Body>
      {map(value, (d, i)=> (
        <Table.Row key={i}>
          <Table.Cell>T{i}</Table.Cell>
          <Table.Cell><SourceImageGrid value={d}/></Table.Cell>
          <Table.Cell>{isImageLight(d) ? 'Light' : 'Dark'}</Table.Cell>
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
