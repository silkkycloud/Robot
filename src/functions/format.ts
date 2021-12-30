export const timeFormat = (duration: any): string => {
  const pad = function (num: number, size: number) {
    return ('000' + num).slice(size * -1)
  }

  const time = Number(parseFloat(duration).toFixed(3)),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60)

  let str = ''

  if (hours > 0) str += hours + ':'

  str += pad(minutes, 2) + ':' + pad(seconds, 2)

  return str
}

export const numberFormat = (num: number): string => {
  let i
  const digits = 2
  const si = [
    { value: 1, symbol: '' },
    { value: 1e3, symbol: 'k' },
    { value: 1e6, symbol: 'M' },
    { value: 1e9, symbol: 'B' },
  ]
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
  for (i = si.length - 1; i > 0; i--) {
    if (num >= si[i].value) {
      break
    }
  }
  return (num / si[i].value).toFixed(digits).replace(rx, '$1') + si[i].symbol
}
