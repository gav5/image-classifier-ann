// lib/Node.js
// by Gavin Smith
// CS4242 Assignment 05
import { map, clone, cloneDeep } from 'lodash'
import neuron from './neuron'
import backPropagate from './backPropagate'
import trainingRate from './trainingRate'
import threshold from './threshold'
import isPixelLight from './isPixelLight'

export default class Node {
  constructor(weights) {
    this.weights = weights
  }

  infer({inputs}) {
    return neuron({inputs, weights: this.weights})
  }

  backPropagate({output}) {
    return backPropagate({output, weights: this.weights})
  }

  train({inputs, correct, mutate}) {
    const output = this.infer({inputs})
    const oldWeights = clone(this.weights)

    const deltas = map(oldWeights, (w, i)=> {
      return trainingRate * (correct - output)
    })

    const newWeights = map(this.weights, (w, i)=> {
      const newW = w + deltas[i]
      if (mutate) {
        this.weights[i] = newW
      }
      return newW
    })

    const nextInputs = map(deltas, (d, i)=> {
      return inputs[i] + (d * trainingRate)
    })

    return {
      inputs: clone(inputs),
      correct: clone(correct),
      oldWeights,
      newWeights,
      nextInputs,
      output,
      deltas,
      needsCorrection: true,
    }
  }

  clone() {
    const weightsClone = cloneDeep(this.weights)
    return new Node(weightsClone)
  }

  data() {
    return clone(this.weights)
  }
}
