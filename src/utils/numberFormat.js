export function numberFormat(number, fiexd = 2) {
  if (number === null || number === undefined || isNaN(Number(number))) return number
  let str = number.toString()
  if (str.indexOf('.') < 0) {
    str = Number(number).toFixed(fiexd)
  }
  const x = str.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, `$1,$2`)
  }
  return x1 + x2
}
