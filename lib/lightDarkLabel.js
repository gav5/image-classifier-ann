import formatWeight from './formatWeight'
import isPixelLight from './isPixelLight'

export default (val)=> `${(isPixelLight(val)) ? 'Light' : 'Dark'} (${formatWeight(val)})`
