import lightDarkAry from './lightDarkAry'
import isImageLight from './isImageLight'
import { times, cloneDeep, last, get, reduce } from 'lodash'

const trainingData = times(16, lightDarkAry)

export default ({net})=> {
  return reduce(trainingData, (acc, val, i)=> {
    console.log('training on pattern:', i)
    const currentNet = get(last(acc), 'net', net).clone()
    const results = currentNet.train({
      inputs: val,
      correct: isImageLight(val) ? +1 : -1,
      mutate: true,
    })
    const newRow = {
      net: currentNet.clone(),
      results: cloneDeep(results),
    }
    return [...acc, newRow]
  }, [])
}
