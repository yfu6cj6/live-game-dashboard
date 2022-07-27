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
  start.setDate(start.getDate() - 14 - start.getDay() + 1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() - 7 - end.getDay())
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 本週
export function getThisWeekDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - 7 - start.getDay() + 1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() - end.getDay())
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 上月
export function getLastMonthDateTime() {
  var date = new Date();
  date.setMonth(date.getMonth() - 1)
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay.setHours(0)
  firstDay.setMinutes(0)
  firstDay.setSeconds(0)
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDay.setHours(23)
  lastDay.setMinutes(59)
  lastDay.setSeconds(59)
  return [firstDay, lastDay]
}

// 本月
export function getThisMonthDateTime() {
  var date = new Date();
  var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  firstDay.setHours(0)
  firstDay.setMinutes(0)
  firstDay.setSeconds(0)
  var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  lastDay.setHours(23)
  lastDay.setMinutes(59)
  lastDay.setSeconds(59)
  return [firstDay, lastDay]
}
