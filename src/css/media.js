import { join, concat as fromValues } from 'taowei'

export default (query) => (...rules) => 
  `@media ${query} {\n\t${join("\n")(fromValues(rules))}\n}\n`
