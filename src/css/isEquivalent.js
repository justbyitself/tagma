import normalize from './normalize.js'

export default css1 =>  css2 => normalize(css1) === normalize(css2)