import splitFirst from './splitFirst'

test('it works for single letter separators', () => {
  expect(
    splitFirst('foo:bar:baz', ':')
  ).toEqual([
    'foo',
    'bar:baz'
  ])
})

test('it works for sources not containing the separator', () => {
  expect(
    splitFirst('foo', ':')
  ).toEqual([
    'foo',
  ])
})
