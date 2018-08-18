import lex from './lex'

it('can lex some simple syntax', () => {
  // Arrange
  const syntax = {
    lex: [
      ['ident', /^[a-zA-Z][a-zA-Z0-9]*/],
      ['semi', /^;/],
    ]
  }
  const source = 'foo;bar'

  // Act
  const tokens = lex({ source, syntax })

  // Assert
  expect(tokens).toEqual([
    {
      index: 0,
      value: 'foo',
      type: 'ident',
    },
    {
      index: 3,
      value: ';',
      type: 'semi',
    },
    {
      index: 4,
      value: 'bar',
      type: 'ident',
    }
  ])
})

it('can ignore a type', () => {
  // Arrange
  const syntax = {
    lex: [
      ['ident', /^[a-zA-Z][a-zA-Z0-9]*/],
      ['whitespace', /^\s+/, 'ignore'],
    ]
  }
  const source = 'foo bar'

  // Act
  const tokens = lex({ source, syntax })

  // Assert
  expect(tokens).toEqual([
    {
      index: 0,
      value: 'foo',
      type: 'ident',
    },
    {
      index: 4,
      value: 'bar',
      type: 'ident',
    }
  ])
})
