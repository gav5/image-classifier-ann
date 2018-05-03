import { Grid, Table } from 'semantic-ui-react'
import SourceImageGrid from './SourceImageGrid'
import lightDarkLabel from '../lib/lightDarkLabel'
import lightDarkAry from '../lib/lightDarkAry'
import isImageLight from '../lib/isImageLight'
import threshold from '../lib/threshold'
import { map, times } from 'lodash'

const trainingData = times(16, lightDarkAry)

export default ({value})=> (
  <Grid columns={4} doubling>
    {map(trainingData, (x, i)=> {
      const output = value.output({inputs: x})
      const outBool = output > threshold
      const correctBool = isImageLight(x)
      const correct = correctBool ? +1 : -1
      const isValid = (outBool == correctBool)

      return (
        <Grid.Column key={i}>
          <Table color={isValid ? 'green' : 'red'}>
            <Table.Body>
              <Table.Row>
                <Table.Cell><SourceImageGrid value={x}/></Table.Cell>
                <Table.Cell content={lightDarkLabel(correct)}/>
                <Table.Cell content={lightDarkLabel(output)}/>
                <Table.Cell icon={{
                  name: isValid ? 'smile' : 'frown',
                  size: 'huge',
                  color: isValid ? 'green' : 'red'
                }}/>
              </Table.Row>
            </Table.Body>
          </Table>
        </Grid.Column>
      )
    })}
  </Grid>
)
