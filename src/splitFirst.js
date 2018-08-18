export default function splitFirst(source, separator) {
  const index = source.indexOf(separator)
  if (index === -1)
    return [source]
  return [source.substring(0, index), source.substring(index+separator.length, source.length)]
}
