// lib/Stage.js
// by Gavin Smith
// CS4242 Assignment 05
import { map, nth, defaultTo, sum, isArray, invokeMap, constant, reduce } from 'lodash'
import Node from './Node'

export default class Stage {
  constructor(nodes) {
    this.nodes = map(nodes, (n)=> {
      return isArray(n) ? new Node(n) : n
    })
  }

  infer({inputs}) {
    return map(this.nodes, (n)=> {
      return n.infer({inputs})
    })
  }

  backPropagate({outputs}) {
    console.log('[Stage.backPropagate] outputs:', outputs)
    return reduce(this.nodes, (acc, n, i)=> {
      const output = outputs[i]
      console.log(`[Stage.backPropagate] output[${i}]:`, output)
      const outs = n.backPropagate({output})
      console.log(`[Stage.backPropagate] outs[${i}]:`, outs)
      return map(outs, (o, j)=> {
        return acc[j] + o
      })
    }, map(this.nodes, constant(0.0)))
  }

  train({inputs, corrects, mutate}) {
    return map(this.nodes, (n, i)=> {
      const correct = corrects[i]
      return n.train({inputs, correct, mutate})
    })
  }

  clone() {
    const newNodes = invokeMap(this.nodes, 'clone')
    return new Stage(newNodes)
  }

  data() {
    return invokeMap(this.nodes, 'data')
  }
}
