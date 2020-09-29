'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  WEB_FLAG: '"a"',
  // BASEDATA_BASE_API: '"http://10.167.43.232:8765/mes-production"',
  // WAREHOUSE_URL: '"http://10.167.43.232:8765/mes-storage"',
  // EXCEPTION_BASEURL: '"http://10.167.43.232:8765/mes-exception"',
  // EXCEPTION_SAVEURL: '"http://10.167.43.232:8765/zuul/mes-exception"',
  // EXCEPTION_PENURL: '"http://10.167.43.232:8765/mes-backlog/backlog/getBacklogByBelongRole"',
  // tran环境  
  // BASEDATA_BASE_API: '"http://10.167.43.170:8765/mes-production"',
  // WAREHOUSE_URL: '"http://10.167.43.170:8765/mes-storage"',
  // EXCEPTION_BASEURL: '"http://10.167.43.170:8765/mes-exception"',
  // EXCEPTION_SAVEURL: '"http://10.167.43.170:8765/zuul/mes-exception"',
  // EXCEPTION_PENURL: '"http://10.167.43.170:8765/mes-backlog/backlog/getBacklogByBelongRole"',
  //生产环境·
  BASEDATA_BASE_API: '"http://10.167.43.155:8765/mes-production"',
  WAREHOUSE_URL: '"http://10.167.43.155:8765/mes-storage"',
  EXCEPTION_BASEURL: '"http://10.167.43.155:8765/mes-exception"',
  EXCEPTION_SAVEURL: '"http://10.167.43.155:8765/zuul/mes-exception"',
  EXCEPTION_PENURL: '"http://10.167.43.155:8765/mes-backlog/backlog/getBacklogByBelongRole"',
  WARNING_INFO: '"请求数据失败"'
})
