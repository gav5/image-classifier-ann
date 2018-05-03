// pages/stage.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Header, Table, Input, Grid } from 'semantic-ui-react'
import Stage from '../lib/Stage'
import { times, constant, map } from 'lodash'
import formatWeight from '../lib/formatWeight'

export default class extends Component {
  state = {
    stage: new Stage([
      times(4, constant(0.24)),
      times(4, constant(0.24)),
    ]),
    inputs: times(4, constant(0.5)),
    corrects: times(2, constant(0.4)),
  }

  setWeight = (nodeIndex, weightIndex, {value})=> {
    let stage = this.state.stage
    stage.nodes[nodeIndex].weights[weightIndex] = value
    this.setState({stage})
  }

  setInput = (index, {value})=> {
    let inputs = this.state.inputs
    inputs[index] = value
    this.setState({inputs})
  }

  setCorrect = (index, {value})=> {
    let corrects = this.state.corrects
    corrects[index] = value
    this.setState({corrects})
  }

  render() {
    const colWidth = 4
    const { stage, inputs, corrects } = this.state
    const outputs = stage.infer({inputs})
    const deltas = map(stage.train({inputs, corrects}), 'deltas')

    return (
      <div>
        {map(stage.nodes, (node, ni)=> (
          <div key={ni}>
            <br/>
            <Container>
              <Header>Node {ni}</Header>
              <Grid columns={colWidth} doubling>
                {map(node.weights, (w, wi)=> (
                  <Grid.Column key={wi}>
                    <Input
                      label={`W${ni}.${wi}`}
                      value={w}
                      onChange={(e, d)=> this.setWeight(ni, wi, d)}
                      fluid
                    />
                  </Grid.Column>
                ))}
              </Grid>
            </Container>
            <br/>
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
          <Header>Outputs</Header>
          <Grid columns={colWidth} doubling>
            {map(outputs, (y, i)=> (
              <Grid.Column key={i}>
                <Input
                  label={`Y${i}`}
                  value={formatWeight(y)}
                  fluid
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
        <br/>
        <Container>
          <Header>Corrects</Header>
          <Grid columns={colWidth} doubling>
            {map(corrects, (c, i)=> (
              <Grid.Column key={i}>
                <Input
                  label={`C${i}`}
                  value={c}
                  onChange={(e, d)=> this.setCorrect(i, d)}
                  fluid
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
        {map(deltas, (stage, si)=> (
          <div key={si}>
            <br/>
            <Container>
              <Header>Deltas – Node {si}</Header>
              <Grid columns={colWidth} doubling>
                {map(stage, (d, di)=> (
                  <Grid.Column key={di}>
                    <Input
                      label={`D${si}.${di}`}
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
    )
  }
}
