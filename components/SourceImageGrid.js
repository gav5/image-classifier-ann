// components/SourceImageGrid.js
// by Gavin Smith
// CS4242 Assignment 04
import { Component } from 'react'
import { Table } from 'semantic-ui-react'
import threshold from '../lib/threshold'

export default ({value}) => (
  <Table celled textAlign="center" compact>
    <Table.Body>
      {[0,1].map(y => (
        <Table.Row key={y}>
          {[0,1].map(x => (
            <Table.Cell
              key={x}
              content={' '}
              active={value[x + (y * 2)] <= threshold}
            />
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
