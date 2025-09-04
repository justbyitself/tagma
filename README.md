<div align="center">
  <a href="https://github.com/justbyitself/tagma">
    <img src="https://raw.githubusercontent.com/justbyitself/tagma/main/tagma.svg" alt="Tagma logo" width="400"/>
  </a>
  
  **🚧 Work In Progress (WIP) 🚧**
</div>

## Introduction

Tagma is a lightweight, functional library for generating HTML and CSS from JavaScript. It favors composability, small runtime output, and predictable code generation for static sites.

Tagma builds upon [Taowei](https://github.com/justbyitself/tagma), a functional JavaScript library.

## Features

- Functional, declarative API for HTML and CSS.
- Utilities for attributes, properties, units and colors.
- CLI for file-based generation.

## Example

Tagma compiles JavaScript modules into HTML and CSS files (JS → HTML/CSS). In the example below the JS modules are:

- index.html.js — produces the HTML output (index.html)
- styles.css.js — produces the CSS output (styles.css)

### HTML (index.html.js)

```javascript
import { htmlDocument, tags } from 'tagma/html'
import { className } from 'tagma/html/attributes'
const { head, body, meta, title, link, div, h1 } = tags

export default () => htmlDocument({ lang: 'en' })(
  head()(
    meta({ charset: 'UTF-8' }),
    title()('Cardish — HTML + CSS example'),
    link({ rel: 'stylesheet', href: 'styles.css' })
  ),
  body()(
    div(className('card'))(
      h1(className('header'))('Hello with CSS'),
      div()('This example emits an external CSS file plus HTML.')
    )
  )
)
```

### CSS (styles.css.js)

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
```

## Installation

```bash
npm install tagma
```

## CLI

Tagma generates HTML and CSS files from JavaScript scripts.

```bash
# Generate index.html and styles.css at dist/002-cardish
tagma -i examples/002-cardish
```

## Tests

```bash
# Run tests
npm test

# Generate code coverage
npm run coverage
```
