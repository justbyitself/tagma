import { join, concat as fromValues } from 'taowei'

export default (rule) => (...rules) => 
  `${rule} {\n\t${join("\n")(fromValues(rules))}\n}\n`
