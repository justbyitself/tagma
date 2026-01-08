import variable from '../variable.js'

export default (theme) => {
  const keys = new Set([...Object.keys(theme.light), ...Object.keys(theme.dark)])
  
  return Array.from(keys).reduce((acc, key) => {
    acc[key] = variable(key) 
    return acc
  }, {})
}