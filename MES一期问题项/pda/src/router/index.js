import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 开工
const start = (resolve) => {
  import('components/start/start').then((module) => {
    resolve(module)
  })
}

// 变更信息
const startChange = (resolve) => {
  import('components/start/change').then((module) => {
    resolve(module)
  })
}

// 缺料明细
const lack = (resolve) => {
  import('components/start/lack').then((module) => {
    resolve(module)
  })
}

// 关键件绑定
const linchpin = (resolve) => {
  import('components/linchpin/linchpin').then((module) => {
    resolve(module)
  })
}

// 报工
const ol = (resolve) => {
  import('components/ol/ol').then((module) => {
    resolve(module)
  })
}

// 工艺文件
const processFile = (resolve) => {
  import('components/process-file/process-file').then((module) => {
    resolve(module)
  })
}

// 二次匹配
const match = (resolve) => {
  import('components/match/match').then((module) => {
    resolve(module)
  })
}

// 物料交接
const materials = (resolve) => {
  import('components/materials/materials').then((module) => {
    resolve(module)
  })
}
// 物料交接记录
const recordingSearch = (resolve) => {
  import('components/materials-search/materials-search').then((module) => {
    resolve(module)
  })
}

// 不良品报工
const failedOl = (resolve) => {
  import('components/failed-ol/failed-ol').then((module) => {
    resolve(module)
  })
}

// 订单进度
const orderProgress = (resolve) => {
  import('components/order-progress/order-progress').then((module) => {
    resolve(module)
  })
}

// 查询现场出入库
const searchAcess = (resolve) => {
  import('components/acess/acess').then((module) => {
    resolve(module)
  })
}

// 查询个人工时
const workingHours = (resolve) => {
  import('components/working-hours/working-hours').then((module) => {
    resolve(module)
  })
}

// 无工票作业
const notTicket = (resolve) => {
  import('components/not-ticket/not-ticket').then((module) => {
    resolve(module)
  })
}

// 首页
const Home = (resolve) => {
  import('components/manufacturing/Manufacturing').then((module) => {
    resolve(module)
  })
}

const Selectlibrary = (resolve) => { // 选择库区
  import('components/warehouse/selectlibrary/Selectlibrary').then((module) => {
    resolve(module)
  })
}

const Manufacturing = (resolve) => { // 生产执行主界面
  import('components/manufacturing/Manufacturing').then((module) => {
    resolve(module)
  })
}

const GOdownEntry = (resolve) => { // 车间订单入库
  import('components/warehouse/godownEntry/GOdownEntry').then((module) => {
    resolve(module)
  })
}

const POstorage = (resolve) => { // PO入库
  import('components/warehouse/pOstorage/POstorage').then((module) => {
    resolve(module)
  })
}

const PLMaterialRequistion = (resolve) => { // Pl领料出库
  import('components/warehouse/so/PLMaterialRequistion').then((module) => {
    resolve(module)
  })
}

const PLMaterialRequistionDetail = (resolve) => { // Pl领料明细
  import('components/warehouse/so/PLMaterialRequistionDetail').then((module) => {
    resolve(module)
  })
}

const MRMaterialRequistion = (resolve) => { // MR领料单
  import('components/warehouse/mRMaterialRequistion/MRMaterialRequistion').then((module) => {
    resolve(module)
  })
}

const MRMaterialDetailed = (resolve) => { // MR集料明细
  import('components/warehouse/mRMaterialRequistion/MRMaterialDetailed').then((module) => {
    resolve(module)
  })
}

const Materialwithdrawal = (resolve) => { // 退料单入库
  import('components/warehouse/materialwithdrawal/Materialwithdrawal').then((module) => {
    resolve(module)
  })
}

const MTR = (resolve) => { // mtr
  import('components/warehouse/mtr/MTR').then((module) => {
    resolve(module)
  })
}

const TT = (resolve) => { // tt
  import('components/warehouse/tt/TT').then((module) => {
    resolve(module)
  })
}

const Print = (resolve) => { // 补条打码
  import('components/warehouse/print/Print').then((module) => {
    resolve(module)
  })
}

const Login = (resolve) => { // 登录
  import('components/login/Login').then((module) => {
    resolve(module)
  })
}

const MRHandover = (resolve) => { // MR物料交接
  import('components/warehouse/mrhandover/MRHandover').then((module) => {
    resolve(module)
  })
}

const SOHandover = (resolve) => { // SO物料交接
  import('components/warehouse/sohandover/SOHandover').then((module) => {
    resolve(module)
  })
}

const Personallist = (resolve) => { // 个人清单
  import('components/warehouse/personallist/Personallist').then((module) => {
    resolve(module)
  })
}

const MobileInventory = (resolve) => { // 移动库存
  import('components/warehouse/mobileinventory/MobileInventory').then((module) => {
    resolve(module)
  })
}

const Clockin = (resolve) => { //打卡
  import('components/warehouse/clockin/Clockin').then((module) => {
    resolve(module)
  })
}

const Record = (resolve) => { //打卡记录
  import('components/warehouse/clockin/Record').then((module) => {
    resolve(module)
  })
}

const Call = (resolve) => { //现场call料
  import('components/warehouse/call/Call').then((module) => {
    resolve(module)
  })
}

const Assurance = (resolve) => { // 质保
  import('components/assurance/Assurance').then((module) => {
    resolve(module)
  })
}

const assprocess = (resolve) => { // 工艺文件
  import('components/assurance/process-file/process-file').then((module) => {
    resolve(module)
  })
}

const linchpins = (resolve) => { // 关键件
  import('components/assurance/linchpin/linchpin').then((module) => {
    resolve(module)
  })
}

const Exception = (resolve) => { // 异常管理模块
  import('components/exception/Exception').then((module) => {
    resolve(module)
  })
}
const ExceptionSend = (resolve) => {
  import('components/exception/send').then((module) => {
    resolve(module)
  })
}
const ExceptionInspect = (resolve) => {
  import('components/exception/inspect').then((module) => {
    resolve(module)
  })
}
const ExceptionDetail = (resolve) => {
  import('components/exception/inspect/detail').then((module) => {
    resolve(module)
  })
}
const router =  new Router({
  mode: 'hash',
  routes: [
    {
      path: '/exception',
      name: 'Exception',
      component: Exception,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/exception/inspect/detail',
      name: 'ExceptionDetail',
      component: ExceptionDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/exception/inspect',
      name: 'ExceptionInspect',
      component: ExceptionInspect,
      // children: [{
      //   path: '/exception/inspect/detail',
      //   name: 'ExceptionDetail',
      //   component: ExceptionDetail
      // }],
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/exception/send',
      name: 'ExceptionSend',
      component: ExceptionSend,

      meta: {
        keepAlive: false
      }
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/start',
      name: 'start',
      component: start,
      meta: {
        keepAlive: true
      },
      children: [
        {
          path: '/start/change',
          name: 'change',
          component: startChange,
          meta: {
            keepAlive: false
          }
        },
        {
          path: '/start/lack',
          name: 'lack',
          component: lack,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: '/linchpin',
      name: 'linchpin',
      component: linchpin,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/ol',
      name: 'ol',
      component: ol,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/process',
      name: 'process',
      component: processFile,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/match',
      name: 'match',
      component: match,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/materials',
      name: 'materials',
      component: materials,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/recording',
      name: 'recordingSearch',
      component: recordingSearch,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/not',
      name: 'notTicket',
      component: notTicket,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/failed',
      name: 'failedOl',
      component: failedOl,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/progress',
      name: 'orderProgress',
      component: orderProgress,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/acess',
      name: 'searchAcess',
      component: searchAcess,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/working',
      name: 'workingHours',
      component: workingHours,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Manufacturing',
      name: 'Manufacturing',
      component: Manufacturing,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Selectlibrary',
      name: 'Selectlibrary',
      component: Selectlibrary,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/GOdownEntry',
      name: 'GOdownEntry',
      component: GOdownEntry,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/POstorage',
      name: 'POstorage',
      component: POstorage,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MRMaterialRequistion',
      name: 'MRMaterialRequistion',
      component: MRMaterialRequistion,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MRMaterialDetailed',
      name: 'MRMaterialDetailed',
      component: MRMaterialDetailed,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Materialwithdrawal',
      name: 'Materialwithdrawal',
      component: Materialwithdrawal,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/PLMaterialRequistionDetail',
      name: 'PLMaterialRequistionDetail',
      component: PLMaterialRequistionDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/PLMaterialRequistion',
      name: 'PLMaterialRequistion',
      component: PLMaterialRequistion,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/TT',
      name: 'TT',
      component: TT,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MTR',
      name: 'MTR',
      component: MTR,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Print',
      name: 'Print',
      component: Print,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MRHandover',
      name: 'MRHandover',
      component: MRHandover,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/SOHandover',
      name: 'SOHandover',
      component: SOHandover,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Personallist',
      name: 'Personallist',
      component: Personallist,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Call',
      name: 'Call',
      component: Call,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Clockin',
      name: 'Clockin',
      component: Clockin,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Record',
      name: 'Record',
      component: Record,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Assurance',
      name: 'Assurance',
      component: Assurance,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/assprocess',
      name: 'assprocess',
      component: assprocess,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/linchpins',
      name: 'linchpins',
      component: linchpins,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/MobileInventory',
      name: 'MobileInventory',
      component: MobileInventory,
      meta: {
        keepAlive: false
      }
    }
  ]
})

export default router
