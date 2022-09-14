import { i18n } from '@/lang/lang'

export function getMsg(message) {
  let msg
  if (message) {
    if (typeof message === 'string' || message instanceof String) {
      msg = message.toString()
    } else {
      msg = message[Object.keys(message)[0]].toString()
    }
  } else {
    msg = i18n.messages[i18n.locale]['__operationField']
  }
  return msg
}
