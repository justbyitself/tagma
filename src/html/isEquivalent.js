import normalize from './normalize.js'

export default html1 =>  html2 => normalize(html1) === normalize(html2)