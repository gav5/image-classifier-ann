// components/TrainingTable.js
// by Gavin Smith
// CS4242 Assignment 05
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
        {times(2, (stageNumber)=> (
          <div key={stageNumber}>
            {times(4, (nodeNumber)=> (
              <div key={nodeNumber}>
                {times(4, (weightNumber)=> (
                  <Table.HeaderCell key={nodeNumber}>
                    W{stageNumber}.{nodeNumber}.{nodeNumber}
                  </Table.HeaderCell>
                ))}
              </div>
            ))}
          </div>
        ))}
        <Table.HeaderCell content='State' />
        <Table.HeaderCell content='Actual' />
        <Table.HeaderCell content='Out' />
        {times(2, (stageNumber)=> (
          <div key={stageNumber}>
            {times(4, (nodeNumber)=> (
              <div key={nodeNumber}>
                {times(4, (weightNumber)=> (
                  <Table.HeaderCell key={nodeNumber}>
                    ΔW{stageNumber}.{nodeNumber}.{nodeNumber}
                  </Table.HeaderCell>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Table.Row>
    </Table.Header>
    <Table.Body>
      {map(round, (val, i) => (
        <Table.Row key={i}>
          <Table.Cell>T{i}</Table.Cell>
          {map(val, (stage, stageNumber)=> (
            <div key={stageNumber}>
              {map(stage, (node, nodeNumber)=> (
                <div key={nodeNumber}>
                  {map(node.weights, (w, weightNumber)=> (
                    <Table.Cell
                      content={formatWeight(w)}
                      key={weightNumber}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
          <Table.Cell>
            <SourceImageGrid value={val.input} />
          </Table.Cell>
          <Table.Cell content={lightDarkLabel(val.correct)} />
          <Table.Cell content={lightDarkLabel(val.output)} />
          {map(val, (stage, stageNumber)=> (
            <div key={stageNumber}>
              {map(stage, (node, nodeNumber)=> (
                <div key={nodeNumber}>
                  {map(node.deltas, (d, deltaNumber)=> (
                    <Table.Cell
                      content={formatWeight(d)}
                      key={deltaNumber}
                    />
                  ))}
                </div>
              ))}
            </div>
          ))}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
