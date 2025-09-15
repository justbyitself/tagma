import { cssDocument, rule } from '../../src/css/index.js'
import { px, pc, vh } from '../../src/units/index.js'

export default ({rows, columns}) => cssDocument(
  rule('body, html')({
      margin: 0,
      padding: 0,
      height: pc(100)
  }),
  rule('.grid')({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    height: vh(100),
    gap: px(10),
    backgroundColor: '#f0f0f0',
    padding: px(10),
    boxSizing: 'border-box'
  }),
  rule('.grid-item')({
    backgroundColor: '#3498db',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontFamily: 'Arial, sans-serif',
    fontSize: px(24)
  })
)