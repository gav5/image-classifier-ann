// lib/lightDarkLabel.js
// by Gavin Smith
// CS4242 Assignment 05
import formatWeight from './formatWeight'
import isPixelLight from './isPixelLight'

export default (val)=> `${(isPixelLight(val)) ? 'Light' : 'Dark'} (${formatWeight(val)})`
