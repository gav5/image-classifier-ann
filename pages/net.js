// pages/net.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Header, Table, Input, Grid } from 'semantic-ui-react'
import Net from '../lib/Net'
import { times, constant, map, first } from 'lodash'
import formatWeight from '../lib/formatWeight'

export default class extends Component {
  state = {
    net: new Net.default(),
    inputs: times(4, constant(1.0)),
    correct: 0.4,
  }

  setWeight = (stageIndex, nodeIndex, weightIndex, {value})=> {
    let net = this.state.net
    net.stages[stageIndex].nodes[nodeIndex].weights[weightIndex] = value
    this.setState({net})
  }

  setInput = (index, {value})=> {
    let inputs = this.state.inputs
    inputs[index] = value
    this.setState({inputs})
  }

  setCorrect = ({value})=> {
    this.setState({correct: value})
  }

  render() {
    const colWidth = 4
    const { net, inputs, correct } = this.state
    const output = net.output({inputs})
    const result = net.train({inputs, correct, mutate: false})
    const deltas = map(result, (stage)=> {
      return map(stage, 'deltas')
    })
    console.log('result:', result)

    return (
      <div>
        {map(net.stages, (stage, si)=> (
          <div key={si}>
            {map(stage.nodes, (node, ni)=> (
              <div key={ni}>
                <br/>
                <Container>
                  <Header>Node {si}.{ni}</Header>
                  <Grid columns={colWidth} doubling>
                    {map(node.weights, (w, wi)=> (
                      <Grid.Column key={wi}>
                        <Input
                          label={`W${si}.${ni}.${wi}`}
                          value={w}
                          onChange={(e, d)=> this.setWeight(si, ni, wi, d)}
                          fluid
                        />
                      </Grid.Column>
                    ))}
                  </Grid>
                </Container>
              </div>
            ))}
          </div>
        ))}
        <br/>
        <Container>
          <Header>Inputs</Header>
          <Grid columns={colWidth} doubling>
            {map(inputs, (x, i)=> (
              <Grid.Column key={i}>
                <Input
                  label={`X${i}`}
                  value={x}
                  onChange={(e, d)=> this.setInput(i, d)}
                  fluid
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
        <br/>
        <Container>
          <Header>Output</Header>
          <Grid columns={colWidth} doubling>
            <Grid.Column>
              <Input
                label={`Y`}
                value={formatWeight(output)}
                fluid
              />
            </Grid.Column>
          </Grid>
        </Container>
        <br/>
        <Container>
          <Header>Correct</Header>
          <Grid columns={colWidth} doubling>
            <Grid.Column>
              <Input
                label={`C`}
                value={correct}
                onChange={(e, d)=> this.setCorrect(d)}
                fluid
              />
            </Grid.Column>
          </Grid>
        </Container>
        {map(deltas, (stage, si)=> (
          <div key={si}>
            {map(stage, (node, ni)=> (
              <div key={ni}>
                <br/>
                <Container>
                  <Header>Deltas – Stage {si}.{ni}</Header>
                  <Grid columns={colWidth} doubling>
                    {map(node, (d, di)=> (
                      <Grid.Column key={di}>
                        <Input
                          label={`D${si}.${ni}.${di}`}
                          value={formatWeight(d)}
                          fluid
                        />
                      </Grid.Column>
                    ))}
                  </Grid>
                </Container>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}
