// lib/infer.js
// by Gavin Smith
// CS4242 Assignment 05
import { reduce } from 'lodash'
import threshold from './threshold'
import neuron from './neuron'

export default ({stages, input})=> {
  return reduce(stages, (prevStage, nodes)=> {
    return reduce(nodes, (prevNode, weights)=> {
      return neuron({weights, inputs: prevNode})
    }, prevStage)
  }, input)
}
