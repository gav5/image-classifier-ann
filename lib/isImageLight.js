import { filter } from 'lodash'
import threshold from './threshold'

export default (val)=> {
  return filter(val, (x)=> x > threshold).length >= 2
}
