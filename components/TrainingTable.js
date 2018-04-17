// components/TrainingTable.js
// by Gavin Smith
// CS4242 Assignment 04
import { Component } from 'react'
import { Table } from 'semantic-ui-react'
import SourceImageGrid from '../components/SourceImageGrid'
import lightDarkLabel from '../lib/lightDarkLabel'
import formatWeight from '../lib/formatWeight'
import threshold from '../lib/threshold'
import { map, times } from 'lodash'

export default ({ round }) => (
  <Table compact>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell/>
        {times(4, (i)=> (
          <Table.HeaderCell key={i}>W{i+1}</Table.HeaderCell>
        ))}
        <Table.HeaderCell content='State' />
        <Table.HeaderCell content='Actual' />
        <Table.HeaderCell content='Out' />
        {times(4, (i)=> (
          <Table.HeaderCell key={i}>ΔW{i+1}</Table.HeaderCell>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {map(round, (val, i) => (
        <Table.Row key={i}>
          <Table.Cell>T{i}</Table.Cell>
          {map(val.weights, (w, j)=> (
            <Table.Cell content={formatWeight(w)} key={j} />
          ))}
          <Table.Cell>
            <SourceImageGrid value={val.input} />
          </Table.Cell>
          <Table.Cell content={lightDarkLabel(val.correct)} />
          <Table.Cell content={lightDarkLabel(val.output)} />
          {map(val.deltas, (d, j)=> (
            <Table.Cell content={formatWeight(d)} key={j} />
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
