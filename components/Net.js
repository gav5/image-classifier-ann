import { Grid, Header, Table, Statistic } from 'semantic-ui-react'
import { map, flatMap } from 'lodash'
import formatWeight from '../lib/formatWeight'
import threshold from '../lib/threshold'
import trainingRate from '../lib/trainingRate'

export default ({value})=> {
  const nodes = flatMap(value.stages, (stage)=> stage.nodes)

  return (
    <Grid columns={8} doubling>
      {map(nodes, (node, i)=> {
        const stageNumber = parseInt(i/4)
        const nodeNumber = parseInt(i%4)

        return (
          <Grid.Column key={i}>
            <Header>Node {stageNumber}.{nodeNumber}</Header>
            <Table collapsing definition>
              <Table.Body>
                {map(node.weights, (w, weightNumber)=> (
                  <Table.Row key={weightNumber}>
                    <Table.Cell>W{nodeNumber}.{stageNumber}.{weightNumber}</Table.Cell>
                    <Table.Cell>{formatWeight(w)}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Grid.Column>
        )
      })}
      <Grid.Row>
        <Grid.Column width={8}>
          <Statistic.Group size='mini' items={[
            {key: 'threshold', label: 'Threshold', value: formatWeight(threshold)},
            {key: 'trainingRate', label: 'Training Rate', value: formatWeight(trainingRate)},
          ]}/>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}
