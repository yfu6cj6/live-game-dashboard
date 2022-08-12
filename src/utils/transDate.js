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

// 昨天 要刪掉
export function getYesterdayDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - 1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() - 1)
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 今天 要刪掉
export function getTodayDateTime() {
  const start = new Date()
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 上周 要刪掉
export function getLastWeekDateTime() {
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

// 本週 要刪掉
export function getThisWeekDateTime() {
  const start = new Date()
  start.setDate(start.getDate() - start.getDay() + 1)
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)

  const end = new Date()
  end.setDate(end.getDate() + 7 - end.getDay())
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)

  return [start, end]
}

// 上月 要刪掉
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

// 本月 要刪掉
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

// month 負值為前X月 0為本月 正值為後X月
export function getMonthDateTime(month, overToday = false) {
  var date = new Date();
  date.setMonth(date.getMonth() + month)
  let start = new Date(date.getFullYear(), date.getMonth(), 1);
  if (!overToday) {
    if (start.getTime() > Date.now()) {
      start = new Date()
    }
  }
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)
  let end = new Date(date.getFullYear(), date.getMonth() + 1, 0);
  if (!overToday) {
    if (end.getTime() > Date.now()) {
      end = new Date()
    }
  }
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)
  return [start, end]
}

// day 負值為前X天 0為今天 正值為後X天
export function getDayDateTime(day, overToday = false) {
  let start = new Date()
  start.setDate(start.getDate() + day)
  if (!overToday) {
    if (start.getTime() > Date.now()) {
      start = new Date()
    }
  }
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)
  let end = new Date()
  end.setDate(end.getDate() + day)
  if (!overToday) {
    if (end.getTime() > Date.now()) {
      end = new Date()
    }
  }
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)
  return [start, end]
}

// week 負值為前X週 0為本週 正值為後X週
export function getWeekDateTime(week, overToday = false) {
  let start = new Date()
  start.setDate(start.getDate() + (week * 7) - start.getDay() + 1)
  if (!overToday) {
    if (start.getTime() > Date.now()) {
      start = new Date()
    }
  }
  start.setHours(0)
  start.setMinutes(0)
  start.setSeconds(0)
  let end = new Date()
  end.setDate(end.getDate() + ((week + 1) * 7) - end.getDay())
  if (!overToday) {
    if (end.getTime() > Date.now()) {
      end = new Date()
    }
  }
  end.setHours(23)
  end.setMinutes(59)
  end.setSeconds(59)
  return [start, end]
}
