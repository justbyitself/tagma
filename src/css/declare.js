import toVarName from './toVarName.js'

export default (props) => Object.entries(props).reduce((acc, [key, value]) => {
  acc[toVarName(key)] = value
  return acc
}, {})