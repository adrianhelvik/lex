import trace from '@adrianhelvik/trace'
import assert from 'assert'

class Lexer {
  constructor({ source, syntax }) {
    this.source = source
    this.syntax = syntax
  }

  lex() {
    this.tokens = []
    this.index = 0

    outer: while (this.index < this.source.length) {
      for (const [type, regex, ...flags] of this.syntax.lex) {
        assert(typeof type === 'string', 'Type must be a string')
        assert(regex instanceof RegExp, 'Pattern must be a RegExp instance')
        const substring = this.source.substring(this.index)
        const m = substring.match(regex)
        if (! m) continue
        if (m.index !== 0) continue
        if (! m[0].length) continue
        if (! flags.includes('ignore'))
          this.tokens.push({
            index: this.index,
            value: m[0],
            type,
          })
        this.index += m[0].length
        continue outer
      }
      throw Error(trace(this.source, this.index, 'Invalid syntax'))
    }
  }
}

export default ({ source, syntax }) => {
  const lexer = new Lexer({ source, syntax })
  lexer.lex()
  return lexer.tokens
}
