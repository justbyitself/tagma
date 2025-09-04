import { cssDocument, rule } from '../../src/css/index.js'
import { fontFamily } from '../../src/css/properties/index.js'
import { rem, px } from '../../src/units/index.js'
import { hex } from '../../src/color/index.js'

export default () => cssDocument(
  rule('body')(
    fontFamily('system-ui', 'sans-serif'),
    {
      margin: rem(2),
      background: hex('f7fafc'),
      color: hex('0f172a')
    }
  ),
  rule('.header')({
    color: hex('0b69ff')
  }),
  rule('.card')({
    background: hex('fff'),
    padding: rem(1),
    borderRadius: px(8),
    boxShadow: '0 6px 18px rgba(11,18,35,0.06)'
  })
)