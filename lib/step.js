// lib/step.js
// by Gavin Smith
// CS4242 Assignment 05
export default ({value, threshold})=> {
  if (value >= threshold) {
    return 1.0
  } else {
    return 0.0
  }
}
