// lib/Net.js
// by Gavin Smith
// CS4242 Assignment 05
import {
  reduce, reduceRight, map, first, clone, drop, dropRight, sum, invokeMap, isArray,
  times, constant, random
} from 'lodash'
import Stage from './Stage'
import isPixelLight from './isPixelLight'

export default class Net {
  constructor(stages) {
    this.stages = map(stages, (s)=> {
      return isArray(s) ? new Stage(s) : s
    })
  }

  infer({inputs}, upTo=0) {
    const relevantStages = dropRight(this.stages, upTo)
    return reduce(relevantStages, (acc, currentStage)=> {
      return currentStage.infer({inputs: acc})
    }, inputs)
  }

  backPropagate({outputs, to}) {
    const relevantStages = drop(this.stages, to)
    return reduceRight(relevantStages, (localOuts, currentStage)=> {
      return currentStage.backPropagate({outputs: localOuts})
    }, outputs)
  }

  output({inputs}) {
    const finalStageResult = this.infer({inputs})
    return sum(finalStageResult)
  }

  train({inputs, correct, mutate}) {

    // skip if already correct!
    const output = this.output({inputs})
    if (isPixelLight(correct) == isPixelLight(output)) {
      console.log('already correct!')
      return map(this.stages, (stage)=> {
        return map(stage.nodes, (node)=> {
          return {
            correct,
            inputs: clone(inputs),
            oldWeights: clone(node.weights),
            newWeights: clone(node.weights),
            nextInputs: clone(inputs),
            deltas: map(node.weights, constant(0.0)),
            output: output,
            needsCorrection: false,
          }
        })
      })
    }

    const precursor = this.infer({inputs}, this.stages.length-2)
    const weightedCorrect = correct / inputs.length
    const initial = map(precursor, (node)=> {
      return {correct: node, output: weightedCorrect}
    })
    const expectedOuts = map(precursor, ()=> weightedCorrect)
    const trainingData = reduceRight(this.stages, (acc, stage, stageNumber)=> {
      // const nextStageCorrects = map(first(acc), 'correct')
      const prevStage = this.infer({inputs}, stageNumber)
      const nextStage = this.backPropagate({outputs: expectedOuts, to: stageNumber})
      console.log('prevStage:', prevStage)
      console.log('nextStage:', nextStage)

      const result = stage.train({inputs: prevStage, corrects: nextStage, mutate})
      return [result, ...acc]
    }, [initial])

    console.log('corrected with:', trainingData)

    // remove the initial stage (was just a shim to get started)
    return dropRight(trainingData, 1)
  }

  clone() {
    const stagesClone = invokeMap(this.stages, 'clone')
    return new Net(stagesClone)
  }

  data() {
    return invokeMap(this.stages, 'data')
  }

  static default() {
    return new Net([
      times(4, ()=> {
        return times(4, ()=> {
          return 0.0
        })
      }),
      times(4, ()=> {
        return times(4, ()=> {
          return 0.0
        })
      }),
    ])
  }

  static perfect() {
    return new Net([
      times(4, ()=> times(4, constant(0.24))),
      times(4, ()=> times(4, constant(0.24))),
    ])
  }
}
