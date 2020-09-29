/**
 * @description: 提示消息对话框
 * @param {this} that
 * @param {string} title
 * @param {string} message
 * @param {function} func
 * @return:
 */
export function log(that, title = '提示', message, func) {
  that.$createDialog({
    type: 'confirm',
    title: title,
    content: message,
    confirmBtn: {
      text: '确定',
      active: true
    },
    cancelBtn: {
      text: '取消',
      active: false
    },
    onConfirm: func
  }).show()
}

export function promptInfo(that, title, message) {
  that.$createDialog({
    type: 'alert',
    title: title,
    content: message,
    confirmBtn: {
      text: '确定',
      active: true
    }
  }).show()
}
