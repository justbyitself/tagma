import { htmlDocument, tags } from '../../html.js'
const { head, body, meta, title, h1, p } = tags

export default () => htmlDocument({lang: 'en'})(
      head()(
        meta({charset: 'UTF-8'}),
        title()('Hello World')
      ),
      body()(
        h1()('Hello World!'),
        p()('This is my first HTML program.')
      )
    )