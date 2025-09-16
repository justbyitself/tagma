import { htmlDocument, tags } from '../../html.js'
import { className } from '../../src/html/attributes/index.js'
import { enumFromTo, map } from 'taowei'

const { head, body, meta, title, link, div } = tags

export default ({rows, columns}) => htmlDocument({ lang: 'es' })(
  head()(
    meta({ charset: 'UTF-8' }),
    title()('Grid Example'),
    link({ rel: 'stylesheet', href: 'style.css' })
  ),
  body()(
    div(className('grid'))(
      map(div(className('grid-item')))(enumFromTo(1)(rows * columns))
    )
  )
)
