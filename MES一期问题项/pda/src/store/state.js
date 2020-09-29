const state = {
  matchXlhStatus: false, //序列号页面搜索列表是否显示状态
  isSelect: false,
  authStatus: -1, // 值为1代表同时拥有仓库和执行的权限
  user:{
    token:{
      noahsessionID: '',
      noaToken: ''
    },
    name: '',
    roles: '',
    username: '',
    password: '',
    businessId: '1'
  }
}

export default state
