// pages/index.js
// by Gavin Smith
// CS4242 Assignment 04
import { Component } from 'react'
import Link from 'next/link'
import App from '../components/App'
import TrainingTable from '../components/TrainingTable'
import SourceImageGrid from '../components/SourceImageGrid'
import lightDarkAry from '../lib/lightDarkAry'
import isImageLight from '../lib/isImageLight'
import train from '../lib/train'
import infer from '../lib/infer'
import threshold from '../lib/threshold'
import trainingRate from '../lib/trainingRate'
import lightDarkLabel from '../lib/lightDarkLabel'
import isPixelLight from '../lib/isPixelLight'
import { times, constant, last, map, clone, concat, reduce, result } from 'lodash'

import {
  Container, Header, Button, Grid, Rail, Segment, Step, Table, Statistic, Icon
} from 'semantic-ui-react'

export default class extends Component {
  state = {
    trainingData: times(16, lightDarkAry),
    net: times(4, constant(0.0)),
    rounds: [],
    stage: 0,
    results: []
  }

  isStageTraining = (stageNum)=> {
    return (stageNum > 0) && (stageNum <= this.state.rounds.length)
  }

  calculateAnotherRound = () => {
    const nextRound = reduce(this.state.trainingData, (acc, val, i)=> {
      const newRow = train({
        weights: (result(last(acc), 'newWeights', this.state.net)),
        input: val,
        correct: isImageLight(val) ? +1 : -1
      })
      console.log(`newRow: ${newRow.weights}`)
      return concat(acc, [newRow])
    }, [])

    const res = last(nextRound)
    const newRounds = concat(this.state.rounds, [nextRound])
    const newNet = clone(res.weights)
    const newResult = map(this.state.trainingData, (d)=> {
      const output = infer({input: d, weights: newNet})
      const isActuallyLight = isImageLight(d)
      const correct = isActuallyLight ? +1 : -1
      const isValid = isActuallyLight == isPixelLight(output)

      return {
        input: clone(d),
        output: output,
        correct: correct,
        isValid: isValid
      }
    })

    this.setState({
      rounds: newRounds,
      net: newNet,
      stage: newRounds.length,
      results: concat(this.state.results, [newResult])
    })
  }

  startOver = () => {
    this.setState({
      rounds: [],
      net: times(4, constant(0.0)),
      stage: 0
    })
  }

  selectStage = (stageNumber) => {
    return () => {
      this.setState({
        stage: stageNumber
      })
    }
  }

  render() {
    return (
      <App>
        <Grid columns={10} centered padded stretched>
          <Grid.Row>
            <Grid.Column width={8}>
              <Rail position='left'>
                <Step.Group vertical>
                  <Step
                    active={this.state.stage == 0 ? true : undefined}
                    onClick={this.selectStage(0)}
                    title='Introduction'
                  />
                  {this.state.rounds.map((r, i)=> (
                    <Step
                      key={i}
                      active={this.state.stage == (i + 1) ? true : undefined}
                      onClick={this.selectStage(i+1)}
                      title={`Training - Round ${i + 1}`}
                    />
                  ))}
                </Step.Group>
              </Rail>
              <Rail position='right'>
                <Button
                  content='Start Over'
                  icon='refresh'
                  labelPosition='left'
                  fluid
                  onClick={this.startOver}
                />
                <br/>
                <Button
                  content='Another Round'
                  icon='plus'
                  labelPosition='left'
                  primary
                  fluid
                  onClick={this.calculateAnotherRound}
                />
              </Rail>
              <div>
                {this.state.stage == 0 && (
                  <Grid columns={2}>
                    <Grid.Column>
                      <Header>Training Data</Header>
                      <Table collapsing>
                        <Table.Body>
                          {map(this.state.trainingData, (d, i)=> (
                            <Table.Row key={i}>
                              <Table.Cell>T{i}</Table.Cell>
                              <Table.Cell><SourceImageGrid value={d}/></Table.Cell>
                              <Table.Cell>{isImageLight(d) ? 'Light' : 'Dark'}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                    <Grid.Column>
                      <Header>Threshold</Header>
                      <Statistic value={threshold}/>
                      <Header>Training Rate</Header>
                      <Statistic value={trainingRate}/>
                      <Header>Initial Weights</Header>
                      <Table collapsing definition>
                        <Table.Body>
                          {map(this.state.net, (w, i)=> (
                            <Table.Row key={i}>
                              <Table.Cell>W{i+1}</Table.Cell>
                              <Table.Cell>{w}</Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </Grid.Column>
                  </Grid>
                )}
                {this.isStageTraining(this.state.stage) &&
                  <div>
                    <TrainingTable round={this.state.rounds[this.state.stage-1]} />
                    <Grid columns={2}>
                      {map(this.state.results[this.state.stage-1], (x, i)=> (
                        <Grid.Column key={i}>
                          <Table color={x.isValid ? 'green' : 'red'}>
                            <Table.Body>
                              <Table.Row>
                                <Table.Cell><SourceImageGrid value={x.input}/></Table.Cell>
                                <Table.Cell content={lightDarkLabel(x.correct)}/>
                                <Table.Cell content={lightDarkLabel(x.output)}/>
                                <Table.Cell icon={{
                                  name: x.isValid ? 'smile' : 'frown',
                                  size: 'huge',
                                  color: x.isValid ? 'green' : 'red'
                                }}/>
                              </Table.Row>
                            </Table.Body>
                          </Table>
                        </Grid.Column>
                      ))}
                    </Grid>
                  </div>
                }
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </App>
    )
  }
}
