import { clone, map } from 'lodash'
import infer from './infer'
import trainingRate from './trainingRate'
import threshold from './threshold'

export default ({weights, input, correct})=> {
  const output = infer({weights, input})

  const deltas = map(weights, (w, i)=> {
    return trainingRate * (correct - w)
  })

  const newWeights = map(weights, (w, i)=> {
    return w + deltas[i]
  })

  return {
    weights: clone(weights),
    newWeights: newWeights,
    input: clone(input),
    output: output,
    correct: correct,
    deltas: deltas
  }
}
