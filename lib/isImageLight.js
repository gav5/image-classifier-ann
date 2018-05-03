// lib/isImageLight.js
// by Gavin Smith
// CS4242 Assignment 05
import { filter } from 'lodash'
import threshold from './threshold'

export default (val)=> {
  return filter(val, (x)=> x > threshold).length >= 2
}
