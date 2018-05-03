// pages/node.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Header, Table, Input, Grid } from 'semantic-ui-react'
import Node from '../lib/Node'
import { times, constant, map } from 'lodash'
import formatWeight from '../lib/formatWeight'

export default class extends Component {
  state = {
    node: new Node(times(4, constant(0.24))),
    inputs: times(4, constant(0.24)),
    correct: 1.0,
  }

  setWeight = (index, {value})=> {
    const { node } = this.state
    node.weights[index] = value
    this.setState({ node })
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
    const {inputs, correct, node} = this.state
    const output = node.infer({inputs})
    const {deltas} = node.train({inputs, correct})

    return (
      <div>
        <br/>
        <Container>
          <Header>Weights</Header>
          <Grid columns={colWidth} doubling>
            {map(node.weights, (w, i)=> (
              <Grid.Column key={i}>
                <Input
                  label={`W${i}`}
                  value={w}
                  onChange={(e, d)=> this.setWeight(i, d)}
                  fluid
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
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
          <Header>Result</Header>
          <Grid columns={colWidth} doubling>
            <Grid.Column>
              <Input
                label='Correct'
                value={correct}
                onChange={(e, d)=> this.setCorrect(d)}
                fluid
              />
            </Grid.Column>
            <Grid.Column>
              <Input
                label='Output'
                value={formatWeight(output)}
                fluid
              />
            </Grid.Column>
          </Grid>
        </Container>
        <br/>
        <Container>
          <Header>Deltas</Header>
          <Grid columns={colWidth} doubling>
            {map(deltas, (d, i)=> (
              <Grid.Column key={i}>
                <Input
                  label={`D${i}`}
                  value={formatWeight(d)}
                  fluid
                />
              </Grid.Column>
            ))}
          </Grid>
        </Container>
      </div>
    )
  }
}
