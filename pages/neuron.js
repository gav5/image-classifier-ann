// pages/neuron.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Header, Table, Input } from 'semantic-ui-react'
import neuron from '../lib/neuron'
import { times, constant, map } from 'lodash'
import formatWeight from '../lib/formatWeight'

export default class extends Component {
  state = {
    weights: times(4, constant(0.0)),
    inputs: times(4, constant(0.0)),
  }

  setWeight = (index, {value})=> {
    let weights = this.state.weights
    weights[index] = value
    this.setState({weights})
  }

  setInput = (index, {value})=> {
    let inputs = this.state.inputs
    inputs[index] = value
    this.setState({inputs})
  }

  render() {
    const output = neuron({weights: this.state.weights, inputs: this.state.inputs})

    return (
      <div>
        <br/>
        <Container>
          <Header>Weights</Header>
          {map(this.state.weights, (w, i)=> (
            <span>
              <Input label={`W${i}`} value={w} onChange={(e, d)=> this.setWeight(i, d)}/>
              {'  '}
            </span>
          ))}
        </Container>
        <br/>
        <Container>
          <Header>Inputs</Header>
          {map(this.state.inputs, (x, i)=> (
            <span>
              <Input label={`X${i}`} value={x} onChange={(e, d)=> this.setInput(i, d)}/>
              {'  '}
            </span>
          ))}
        </Container>
        <br/>
        <Container>
          Output: {formatWeight(output)}
        </Container>
      </div>
    )
  }
}
