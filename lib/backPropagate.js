// lib/backPropagate.js
// by Gavin Smith
// CS4242 Assignment 05
import { reduce } from 'lodash'

export default ({weights, output})=> {
  const avgOutput = output / weights.length
  console.log('avgOutput:', avgOutput)
  return reduce(weights, (acc, w, i)=> {
    return [...acc, avgOutput]
  }, [])
}
