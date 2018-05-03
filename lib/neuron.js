// lib/neuron.js
// by Gavin Smith
// CS4242 Assignment 05
import { reduce } from 'lodash'

export default ({weights, inputs})=> {
  return reduce(inputs, (acc, x, i)=> {
    return acc + (x * weights[i])
  }, 0.0)
}
