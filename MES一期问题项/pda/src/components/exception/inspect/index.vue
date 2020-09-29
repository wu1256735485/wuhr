<template>
  <div>
    <v-header :title="'异常待办'"></v-header>
    <div class="common-wrapper">
      <div class="common-ticket">
        <div
          class="common-inside"
          style="padding-bottom: 0px;border-bottom:1px solid #ccc"
          v-for="(item,index) in data"
          :key="index"
        >
          <div class="ticket-unit">
            <li class="unit">
              <p class="child">
                <!-- <span class="desc">异常名称:</span>
                <span class="desc">{{item.exceptionDetail.exceptionName || ''}}</span> -->
                <span class="desc exceptionTitle">{{`${item.startUser}于${item.createTime || ''}发起了${item.exceptionName || ''}异常`}}</span>
              </p>
            </li>
            <li class="unit">
              <p class="child">
                <!-- <span class="desc">异常名称:</span>
                <span class="desc">{{item.exceptionDetail.exceptionName || ''}}</span> -->
                <span class="desc">当前停留人员为:</span>
                <span class="desc exceptionTitle">{{item.nowNodeName}}</span>
              </p>
            </li>
            <li class="unit border">
              <p class="child">
                <!-- <span class="desc">状态:</span> -->
                <span class="desc">{{`上一步状态为:${item.prevAction}`}}</span>
                
              </p>
            </li>
            <li class="unit border">
              <p class="child">
                <!-- <span class="desc">状态:</span> -->
                <span class="desc">{{`当前状态为:${item.exceptionStatusName}`}}</span>
                <span
                style="margin-left: 40px"
                @click="handleDetail(item.exceptionObj)" class="searchBtn">详</span>
              </p>
            </li>
            
            <!-- <li class="unit">
              <p class="child">
                <span class="desc">发起时间:</span>
                <span class="desc">{{item.exceptionDetail.createTime || parseTime(Date.now())}}</span>
              </p>
            </li>
            <li class="unit">
              <p class="child">
                <span class="desc">{{item.exceptionAction}}时间:</span>
                <span class="desc">{{item.created || ''}}</span>
              </p>
            </li> -->
            <!-- <li class="unit">
              <p class="child" style="text-align: right;margin-right: 40px">
                <span
                @click="handleDetail(item.exceptionObj)" class="searchBtn">详</span>
              </p>
            </li> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 'src/common/helpers/util.js'
import VHeader from '../v-header/v-header';
import { getList, activitiBackLog, getExceptionBackLog } from 'api/exception';
import { urlParse } from 'common/helpers/util';
// import {} from 'moment'
const defaultobj = {

}
const querygroupData = {
  assignment: 'group',
  includeProcessInstance: 'true',
  pageOffset: 0,
  sort: 'created-desc',
  state: 'open'
}
const queryinvolvedData = {
  assignment: 'involved',
  includeProcessInstance: 'true',
  pageOffset: 0,
  sort: 'created-desc',
  state: 'open'
}
// assignment: involved
// includeProcessInstance: true
// pageOffset: 0
// sort: created-desc
// state: open
const ACTIONINFO = {
  1: '响应',
  4: '处理',
  5: '关闭'
}

export default {
  data() {
    return {
      data: []
      // actionTxt:''
    };
  },
  watch: {
    '$route'(to, from) {
      this.getTitleList();
      // if (from.path === '/exception') {

      // }
    }
  },
  created() {

  },
  // processId
  mounted() {
    this.getTitleList();
  },
  methods: {
    handleDetail({ businesskey, action, taskid }) {
      let id = businesskey;
      // this.$createDialog({
      //   content: businesskey
      // }).show()
      this.$router.push({
        path: 'inspect/detail',
        query: {
          id,
          action,
          taskid,
          key: Math.random()
        }
      });
    },
    // 获取列表信息
    getTitleList() {
      getExceptionBackLog({}).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          this.data = res.data.data
          this.data.forEach(item => {
            item.exceptionObj = {
              taskid: item.processId,
              businesskey: item.exceptionMainId,
              action: item.processAction
            }
          })
        }
      })
//       export function getExceptionBackLog(params) {
//   return exception_service({
//     url: '/exception/getExceptionBackLog',
//     method: 'GET',
//     params
//   })
// }
      // 请求角色待办的信息
      // activitiBackLog(queryinvolvedData).then(res => {
      //   if (res.data.code === 0) {
      //     // this.$createDialog({
      //     //   content: '11111'
      //     // }).show()
      //     const groupData = res.data.data
      //     groupData.forEach(item => {
      //       Object.keys(item).forEach(key => {
      //         if (key === 'formKey') {
      //           item.exceptionObj = urlParse(`${item['formKey']}&taskid=${item.id}&businesskey=${item.processInstanceBusinessKey}`
      //             )
      //         }
      //       })
      //       item.exceptionDetail = item.businessObject || {}
      //     });
      //     this.data = groupData
      //   }
      // })
    },
    // getTitleList() {
    //   getList().then(res => {
    //     // const userInfo = sessionStorage.getItem('userInfo')
    //     // const roleIdsString = userInfo && JSON.parse(userInfo).roleIdsString

    //     if (res.data.msg === '操作成功') {
    //       const data = res.data.data.rows;

    //       data.forEach(item => {
    //         if (item.hasOwnProperty('backlogUrl')) {
    //           item.exceptionObj = urlParse(item.backlogUrl);
    //           console.log(item.backlogUrl)
    //           // item.exceptionAction = item.exceptionObj.action ? ACTIONINFO[item.exceptionObj.action] : ''
    //         }

    //         if (item.hasOwnProperty('businessJSON')) {
    //           const exceptionSaveData = JSON.parse(item.businessJSON)

    //           item.exceptionDetail = exceptionSaveData || {}
    //           // this.$createDialog({
    //           //   content: item.exceptionDetail
    //           // }).show()
    //           if (exceptionSaveData != null) {
    //             if (exceptionSaveData.hasOwnProperty('createTime')) {
    //               exceptionSaveData.createTime = this.parseTime(exceptionSaveData.createTime)
    //             }
    //           }
    //         }
    //       });

    //       console.log(data)
    //       this.data = data;

    //       // console.log(data);
    //     }
    //   });
    // },
    parseTime(time, cFormat) {
      if (arguments.length === 0) {
        return null
      }
      const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
      let date
      if (typeof time === 'object') {
        date = time
      } else {
        if (('' + time).length === 10) time = parseInt(time) * 1000
        date = new Date(time)
      }
      const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
      }
      const timeStr = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
        if (key === 'a') { return ['日', '一', '二', '三', '四', '五', '六'][value] }
        if (result.length > 0 && value < 10) {
          value = '0' + value
        }
        return value || 0
      })
      return timeStr
    }

  },
  components: {
    VHeader
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.cube-my-popup {
  .cube-popup-message {
    color: #fff;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
  }
}

.unit {
  padding-top: 5px;
  padding-bottom: 5px;
}
.exceptionTitle
  width:200px;
  white-space:normal;
.searchBtn
  display: inline-block
  width: 22px
  height: 22px
  line-height: 22px
  text-align: center
  font-size: 14px
  color: #fff
  background-color: #3b85e6
  border-radius: 22px

</style>