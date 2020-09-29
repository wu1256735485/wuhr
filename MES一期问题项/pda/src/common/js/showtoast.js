var toast
const name = '';
const time = '';
function showToast (view, msg) {
  msg = '<p style=font-size:18px>' + msg + '</p>'
  view.$createToast({
    type: 'txt',
    time: 3000,
    txt: msg
  }).show()
}
function showIndicator (view) {
  toast = view.$createToast({
    time: 0,
    txt: 'Loading...',
    mask: false
  })
  toast.show()
}
function closeIndicator () {
  toast.hide()
}
function showdialog (view, title, msg) {
  view.$createDialog({
    type: 'alert',
    title: title,
    content: msg
  }).show()
}
export default {
  name,
  time,
  install: function (Vue) {
    Vue.prototype.showToast = (view, msg) => showToast(view, msg)
    Vue.prototype.showdialog = (view, title, msg) => showdialog(view, title, msg)
    Vue.prototype.showIndicator = (view) => showIndicator(view)
    Vue.prototype.closeIndicator = () => closeIndicator()
  }
}
