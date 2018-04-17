// lib/infer.js
// by Gavin Smith
// CS4242 Assignment 04
import { reduce } from 'lodash'
import threshold from './threshold'

export default ({weights, input})=> {
  return reduce(input, (acc, x, i)=> {
    return acc + (x * weights[i])
  }, 0)
}
