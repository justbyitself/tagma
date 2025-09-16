<div align="center">
  <a href="https://github.com/justbyitself/tagma">
    <img src="https://raw.githubusercontent.com/justbyitself/tagma/main/tagma.svg" alt="Tagma logo" width="400"/>
  </a>
  
  **🚧 Work In Progress (WIP) 🚧**
</div>

## Introduction

Tagma is a lightweight, functional library for generating HTML and CSS using JavaScript, designed to simplify static website creation.

### Why Tagma?

| Aspect | Traditional HTML/CSS | Tagma |
|--------|------------------|-------|
| Code Repetition | High | Low |
| Parameterization | Limited | Very Flexible |
| Maintenance | Complex | Simpler |
| Abstraction | Minimal | Powerful |

## Key Features

- 🧩 **Functional and Declarative API**: Programmatically generate HTML and CSS
- 🚀 **No runtime overhead**: Static generation without extra complexity
- 🛠 **Integrated Utilities**: Support for attributes, properties, units, and colors
- 📦 **Built-in CLI**: Generate files directly from JS modules

## Basic Example

### HTML Generation (index.html.js)

```javascript
import { htmlDocument, tags } from 'tagma/html'
import { className } from 'tagma/html/attributes'
const { head, body, meta, title, link, div, h1 } = tags

export default () => htmlDocument({ lang: 'en' })(
  head()(
    meta({ charset: 'UTF-8' }),
    title()('Tagma Example'),
    link({ rel: 'stylesheet', href: 'styles.css' })
  ),
  body()(
    div(className('card'))(
      h1(className('header'))('Hello, Tagma!'),
      div()('HTML generation with the power of JavaScript')
    )
  )
)
```

### CSS Generation (styles.css.js)

```javascript
import { cssDocument, rule } from 'tagma/css'
import { fontFamily } from 'tagma/css/properties'
import { rem, px } from 'tagma/units'
import { hex } from 'tagma/color'

export default () => cssDocument(
  rule('body')(
    fontFamily('system-ui', 'sans-serif'),
    {
      margin: rem(2),
      background: hex('f7fafc'),
      color: hex('0f172a')
    }
  ),
  rule('.card')({
    background: hex('fff'),
    padding: rem(1),
    borderRadius: px(8)
  })
)
```

For more examples, check out the [examples/](examples/) directory.

## CLI

Generate HTML and CSS files from JavaScript scripts:

```bash
# Generate index.html from index.html.js and styles.css from styles.css.js in dist/
tagma -i examples/my-project
```

## Built on Taowei

Tagma is built on top of [Taowei](https://github.com/justbyitself/taowei), a functional JavaScript library.

