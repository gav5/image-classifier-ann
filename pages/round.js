// pages/round.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import { Container, Button, Header } from 'semantic-ui-react'
import { last, get } from 'lodash'
import App from '../components/App'
import Result from '../components/Result'
import NetComponent from '../components/Net'
import trainRound from '../lib/trainRound'
import NetModel from '../lib/Net'

export default class extends Component {
  state = {
    net: NetModel.default()
  }

  shuffle = ()=> {
    this.setState({net: NetModel.default()})
  }

  render() {
    const originalNet = this.state.net
    const round = trainRound({net: originalNet})
    const resultNet = get(last(round), 'net')

    return (
      <App>
        <Container fluid>
          <Button
            content='Another'
            icon='refresh'
            labelPosition='left'
            size='mini'
            onClick={this.shuffle}
          />
        </Container>
        <br/>
        {resultNet &&
          <Container fluid>
            <Header>Result</Header>
            <NetComponent value={resultNet}/>
          </Container>
        }
        <br/>
        {originalNet &&
          <Container fluid>
            <Header>Original</Header>
            <NetComponent value={originalNet}/>
          </Container>
        }
      </App>
    )
  }
}
