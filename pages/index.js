// pages/index.js
// by Gavin Smith
// CS4242 Assignment 05
import { Component } from 'react'
import App from '../components/App'
import Net from '../lib/Net'
import TrainingTable from '../components/TrainingTable'
import SourceImageGrid from '../components/SourceImageGrid'
import TrainingData from '../components/TrainingData'
import NetComponent from '../components/Net'
import Result from '../components/Result'
import trainRound from '../lib/trainRound'

import {
  times, constant, last, map, clone, concat, reduce, result, deepClone, pick, get, isEmpty
} from 'lodash'

import {
  Container, Header, Button, Grid, Rail, Segment, Step, Table, Statistic, Icon, Dropdown
} from 'semantic-ui-react'

export default class extends Component {
  state = {
    net: Net.default(),
    rounds: [],
    stage: 0,
  }

  isStageTraining = (stageNum)=> {
    return (stageNum > 0) && (stageNum <= this.state.rounds.length)
  }

  calculateAnotherRound = () => {
    const { net, trainingData, rounds, results } = this.state

    const nextRound = trainRound({net})
    const newRounds = concat(rounds, [nextRound])

    this.setState({
      net,
      rounds: newRounds,
      stage: newRounds.length,
    })
  }

  trainToSolution = ()=> {
    // TODO: make this
  }

  startOver = () => {
    this.setState({
      rounds: [],
      net: Net.default(),
      stage: 0
    })
  }

  selectStage = (stageNumber) => {
    this.setState({
      stage: stageNumber
    })
  }

  render() {
    const { stage, rounds } = this.state
    const currentRound = rounds[stage-1]
    const currentResult = last(currentRound)
    const net = get(currentResult, 'net', this.state.net)

    const roundsOptions = [
      {
        value: 0,
        text: 'Setup',
      },
      ...map(rounds, (r, i)=> {
        return {
          value: i+1,
          text: `Training Round ${i+1}`,
        }
      })
    ]

    console.log('currentRound:', currentRound)
    console.log('currentResult:', currentResult)

    return (
      <App>
        <Container fluid>
          <Button
            content='Start Over'
            icon='refresh'
            labelPosition='left'
            onClick={this.startOver}
          />
          {'   '}
          <Button
            content={isEmpty(rounds) ? 'Train 1 Round' : 'Train Another Round'}
            icon='plus'
            labelPosition='left'
            primary
            onClick={this.calculateAnotherRound}
          />
          {'   '}
          <Dropdown
            options={roundsOptions}
            value={stage}
            onChange={(e, d)=> this.selectStage(d.value)}
            button
          />
        </Container>
        <br/>
        {net &&
          <Container fluid>
            <Header>Test Results</Header>
            <Result value={net}/>
            <NetComponent value={net}/>
          </Container>
        }
      </App>
    )
  }
}
