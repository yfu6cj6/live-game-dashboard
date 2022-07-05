export function browserVersion() {
  var UA = navigator.userAgent
  var tMatch
  var M = UA.match(/(OPERA|CHROME|SAFARI|FIREFOX|MSIE|TRIDENT(?=\/))\/?\s*(\d+)/i) || []
  if (/TRIDENT/i.test(M[1])) {
    tMatch = /\brv[ :]+(\d+)/g.exec(UA) || []
    return 'IE ' + (tMatch[1] || '')
  }
  if (M[1] === 'Chrome') {
    tMatch = UA.match(/\b(OPR|Edg)\/(\d+)/)
    if (tMatch != null) {
      return tMatch.slice(1).join(' ').replace('OPR', 'Opera').replace('Edg', 'Edge')
    }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tMatch = UA.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tMatch[1])
  return M.join(' ')
}

export function clientIP() {
  return fetch('https://api.ipify.org?format=json')
    .then(x => x.json())
    .then(({ ip }) => {
      return ip
    })
}
