import { reduce } from 'lodash'
import threshold from './threshold'

export default ({weights, input})=> {
  return reduce(input, (acc, x, i)=> {
    return acc + (x * weights[i])
  }, 0)
}
