import { htmlDocument, tags } from '../../src/html/index.js'
import { className } from '../../src/html/attributes/index.js'
const { head, body, meta, title, link, div, h1 } = tags

export default () => htmlDocument({ lang: 'en' })(
  head()(
    meta({ charset: 'UTF-8' }),
    title()('Cardish — HTML + CSS example'),
    link({ rel: 'stylesheet', href: 'style.css' })
  ),
  body()(
    div(className('card'))(
      h1(className('header'))('Hello with CSS'),
      div()('This example emits an external CSS file plus HTML.')
    )
  )
)
