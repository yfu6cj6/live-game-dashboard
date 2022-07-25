export function getFullDate(targetDate) {
  const D = new Date(targetDate)
  const y = D.getFullYear()
  let m = D.getMonth() + 1
  let d = D.getDate()
  let h = D.getHours()
  let min = D.getMinutes()
  let s = D.getSeconds()

  m = m > 9 ? m : `0${m}`
  d = d > 9 ? d : `0${d}`
  h = h > 9 ? h : `0${h}`
  min = min > 9 ? min : `0${min}`
  s = s > 9 ? s : `0${s}`
  return `${y}-${m}-${d} ${h}:${min}:${s}`
}

export function getFullDateString(targetDate) {
  const D = new Date(targetDate)
  const y = D.getFullYear()
  let m = D.getMonth() + 1
  let d = D.getDate()
  let h = D.getHours()
  let min = D.getMinutes()
  let s = D.getSeconds()

  m = m > 9 ? m : `0${m}`
  d = d > 9 ? d : `0${d}`
  h = h > 9 ? h : `0${h}`
  min = min > 9 ? min : `0${min}`
  s = s > 9 ? s : `0${s}`
  return `${y}${m}${d}${h}${min}${s}`
}

export function getNextDate(next) {
  const end = new Date()
  const start = new Date()
  end.setTime(end.getTime() + 3600 * 1000 * 24 * next)
  return [start, end]
}

// 昨天
export function getYesterdayDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - 1)
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 今天
export function getTodayDateTime() {
  const start = new Date()
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() + 1)
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 上周
export function getLastWeekDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - 7 - start.getDay() + 1)
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() - end.getDay() + 1)
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 本週
export function getThisWeekDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - start.getDay() + 1)
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() + 7 - end.getDay() + 1)
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 上月
export function getLastMonthDateTime() {
  const start = new Date()
  start.setMonth(start.getMonth() - 1)
  start.setDate(1)
  start.setDate(start.getDate() - start.getDay() + 1)
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(1)
  end.setDate(end.getDate() - end.getDay() + 1)
  if (end.getMonth() !== new Date().getMonth()) {
    end.setDate(end.getDate() + 7)
  }
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 本月
export function getThisMonthDateTime() {
  const start = new Date()
  start.setDate(1)
  start.setDate(start.getDate() - start.getDay() + 1)
  if (start.getMonth() !== new Date().getMonth()) {
    start.setDate(start.getDate() + 7)
  }
  start.setHours(12)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setMonth(end.getMonth() + 1)
  end.setDate(1)
  end.setDate(end.getDate() - end.getDay() + 1)
  if (end.getMonth() !== new Date().getMonth() + 1) {
    end.setDate(end.getDate() + 7)
  }
  end.setHours(11)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}
