// lib/lightDarkAry.js
// by Gavin Smith
// CS4242 Assignment 04
import { map, padStart } from 'lodash'

export default (val)=> {
  return map(padStart(val.toString(2), 4, '0'), (bit)=> bit === '1' ? +1 : -1)
}
