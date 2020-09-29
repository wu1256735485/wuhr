import { RequestQuery } from 'common/js/warehouseRequest'
// TT移库单查询
export function getTTmovelibrary (data) {
  const url = '/ttmovelibrary/ttmovelibrarybymoveLibraryCode?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// TT移库单下架
export function getttmovelowershelflist (data) {
  const url = '/ttmovelibrary/ttmovelowershelflist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// TT移库单上架
export function getTTmoveonShelfBymoveLibraryCodes (data) {
  const url = '/ttmovelibrary/ttmoveonShelfBymoveLibraryCodes?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 根据TT移库明细批量上架
export function getttmoveonshelflist (data) {
  const url = '/ttmovelibrary/ttmoveonshelflist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 打印TT物料标签接口
export function getprintttwl (data) {
  const url = '/ttmovelibrary/printttwl'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 获取TT移库已下架未上架信息
export function getttmovelibrarylist () {
  const url = '/ttmovelibrary/getttmovelibrarylist'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}
// 获取TT移库未上架信息
export function getttnolowershelflibrarylist () {
  const url = '/ttmovelibrary/getttnolowershelflibrarylist'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}
// 获取MTR移库未上架信息
export function getmtrnolowershelflibrarylist () {
  const url = '/mtrmovelibrary/getmtrnolowershelflibrarylist'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}
// MTR移库单查询
export function getMTRmovelibrary (data) {
  const url = '/mtrmovelibrary/mtrmovelibrarybymoveLibraryCode?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// MTR移库单下架
export function getmtrmovelowershelflist (data) {
  const url = '/mtrmovelibrary/mtrmovelowershelflist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 打印MTR物料标签接口
export function getprintmtrwl (data) {
  const url = '/mtrmovelibrary/printmtrwl'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 获取MTR移库已下架未上架信息
export function getmtrmovelibrarylist (data) {
  const url = '/mtrmovelibrary/getmtrmovelibrarylist?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// MTR移库单上架
export function getMTRmoveonShelfBymoveLibraryCodes (data) {
  const url = '/mtrmovelibrary/mtrmoveonShelfBymoveLibraryCodes?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 根据MTR移库明细批量上架
export function getmtrmoveonshelflist (data) {
  const url = '/mtrmovelibrary/mtrmoveonshelflist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 补打条码查询
export function getsupplementBarcode (data) {
  const url = '/supplementBarcode/movelibrarybymoveLibraryCode?'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 生产退料
export function getbackinstockbybackcode (data) {
  const url = '/backinstock/backinstockbybackcode'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 提交生产退料
export function getsubmitbackinstock (data) {
  const url = '/backinstock/submitbackinstock'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 验证so是否已经打印过物料标签
export function getvalidhasprintedsowl (data) {
  const url = '/soaggregate/validhasprintedsowl'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 验证mr是否已经打印过物料标签
export function getvalidhasprintedmrwl (data) {
  const url = '/mraggregate/validhasprintedmrwl'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 库位查询
export function getquerywarehouse (data) {
  const url = '/basicInfo/querywarehouse'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// MR领料出库
export function getquerymraggregatelist (data) {
  const url = '/mraggregate/querymraggregatelist'
  return RequestQuery(url,'GET', data).then((res) => {
    return res.data
  })
}
// 查询MR领料明细信息
export function getquerymrpickingdetaillist (data) {
  const url = '/mraggregate/querymrpickingdetaillist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// MR领料明细提交
export function getsubmitaggregate (data) {
  const url = '/mraggregate/submitaggregate'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 打印MR物料标签接口
export function getprintmrwl (data) {
  const url = '/mraggregate/printmrwl'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// so根据流转卡和次流转卡查询预留物料信息
export function getquerysoaggregatelist (data) {
  const url = '/soaggregate/querysoaggregatelist'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// so根据选中集料获取SO集料物料明细
export function getquerysomaterielreservelist (data) {
  const url = '/soaggregate/querysomaterielreservelist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// so根据选中集料物料明细提交
export function getbuildsoaggregatelist (data) {
  const url = '/soaggregate/buildsoaggregatelist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
//  打印SO物料标签接口
export function getprintsowl (data) {
  const url = '/soaggregate/printsowl'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// so调整序列号
export function getquerymaterielsncode (data) {
  const url = '/soaggregate/querymaterielsncode'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// so调整序列号保存接口
export function getadjustmentmaterielreserveList (data) {
  const url = '/soaggregate/adjustmentmaterielreserveList'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// po根据供应商查询
export function getbasicInfo (data) {
  const url = '/basicInfo/querysupplier'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// po根据供应商编码获取待入库物料信息
export function getquerypoinstock (data) {
  const url = '/poarrival/querypoinstock'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// po入库提交
export function getsubmitpoinstock (data) {
  const url = '/poarrival/submitpoinstock'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 提醒接口
export function getremindercount () {
  const url = '/todotaskreminder/remindercount'
  return RequestQuery(url, 'GET').then((res) => {
    return res.data
  })
}
// so入库查询
export function getquerysoinstocklist (data) {
  const url = '/soinstock/querysoinstocklist'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// so入库提交
export function getsaveworkorderinstockrecordlist (data) {
  const url = '/soinstock/saveworkorderinstockrecordlist'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// 登录
export function getlogin (data) {
  // const url = 'http://10.167.43.231:8220/login/loginMes'
  // const url = httpurls + '/login/loginMes'
  const url = '/login/loginMes'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// mr物料交接根据集料号获取集料明细
export function getquerymrpickingdetailbyaggregatecode (data) {
  const url = '/mraggregate/querymrpickingdetailbyaggregatecode'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// MR物料收料接口
export function getmraggregatehandover (data) {
  const url = '/mraggregate/mraggregatehandover'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// mr物料交接发料确认接口
export function getsoaggregatehairfeedconfirm (data) {
  const url = '/mraggregate/mraggregatehairfeedconfirm'
  return RequestQuery(url, 'post', data).then((res) => {
    return res.data
  })
}
// mr物料交接发料确认接口
export function getquerypersonalhandoverinfo (data) {
  const url = '/soaggregate/querypersonalhandoverinfo'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 根据物料编号、名称、项目查询允许移动的物料库存信息接口
export function getsearchmovematerielstock (data) {
  const url = '/movelibrary/searchmovematerielstock'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 移库确认接口
export function getmovematerielstockconfirm (data) {
  const url = '/movelibrary/movematerielstockconfirm'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 移库确认接口
export function getqueryprojectinfo (data) {
  const url = '/basicInfo/queryprojectinfo'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 补打SO集料标签接口
export function getprintsobjbyaggregatecodelist (data) {
  const url = '/soaggregate/printsojlbyaggregatecodelist'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
// 补打MR集料标签接口
export function getPrintmrjlbyaggregatecodelist (data) {
  const url = '/mraggregate/printmrjlbyaggregatecodelist'
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
//Po入库到货区接口
export function getArrivalList (data) {
  const url = '/basicInfo/queryarrlocation'
  return RequestQuery(url, 'GET', data).then((res) => {
    return res.data
  })
}
// 补打标签 ['SO领料', 'TT移库', 'MTR移库', 'MR领料', 'SO集料','MR集料']
export function getmakepbuildprint (type, data) {
  var printurls = ''
  if (type === 0) {
    printurls = '/supplementBarcode/makepbuildprintsowlzpl'
  } else if (type === 1) {
    printurls = '/ttmovelibrary/printttwl'
  } else if (type === 2) {
    printurls = '/mtrmovelibrary/printmtrwl'
  } else if (type === 3) {
    printurls = '/supplementBarcode/makepbuildprintmrwlzpl'
  } else if (type === 4) {
    printurls = '/soaggregate/printsojlbyaggregatecodelist'
  } else if (type === 5) {
    printurls = '/mraggregate/printmrjlbyaggregatecodelist'
  }
  return RequestQuery(printurls, 'POST', data).then((res) => {
    return res.data
  })
}
// 根据集料单号删除集料 1、MR  2、SO
export function getdeleteaggregate (type, data) {
  var url = ''
  if (type === 2) {
    url = '/mraggregate/deletemraggregate'
  } else if (type === 1) {
    url = '/soaggregate/deletesoaggregate'
  }
  return RequestQuery(url, 'POST', data).then((res) => {
    return res.data
  })
}
//根据工票号获取非消耗订单物料信息
export function getquerywomaterialnotconsbyticket (data) {
    const url = '/workordermaterial/querywomaterialnotconsbyticket'
    return RequestQuery(url, 'GET', data).then((res) => {
      return res.data
    })
  }
  //根据工票号获取消耗订单物料信息
  export function getquerywomaterialconsbyticket (data) {
    const url = '/workordermaterial/querywomaterialconsbyticket'
    return RequestQuery(url, 'GET', data).then((res) => {
      return res.data
    })
  }

  //根据集料单号获取非消耗订单物料信息
export function getquerywomaterialnotconsbyaggregateno (data) {
    const url = '/workordermaterial/querywomaterialnotconsbyaggregateno'
    return RequestQuery(url, 'GET', data).then((res) => {
      return res.data
    })
  }
  //根据集料单号获取消耗订单物料信息
  export function getquerywomaterialconsbyaggregateno (data) {
    const url = '/workordermaterial/querywomaterialconsbyaggregateno'
    return RequestQuery(url, 'GET', data).then((res) => {
      return res.data
    })
  }