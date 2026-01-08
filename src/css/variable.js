import toVarName from './toVarName.js'

export default (name, value) => {
  const v = value === undefined ? '' : `, ${value}`
  
  return `var(${toVarName(name)}${v})`
}