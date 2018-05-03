// lib/train.js
// by Gavin Smith
// CS4242 Assignment 05
import { cloneDeep, reduce, reduceRight } from 'lodash'
import adjustment from './adjustment'
import infer from './infer'

export default ({net, input, correct})=> {
  const output = infer({
    stages: net,
    input,
  })
  const newNet = reduceRight(net, (nextStage, nodes)=> {
    return reduce(nodes, (prevNode, weights)=> {
      return adjustment({
        weights,
        input: prevNode,
        correct: nextStage.input,
      })
    }, nextStage)
  }, [output])

  return {
    net: cloneDeep(net),
    newNet: newNet,
    input: cloneDeep(input),
    output: output,
    correct: cloneDeep(correct),
  }
}
