<template>
  <div class="change">
    <cube-scroll :data="list">
      <div class="common-ticket">
        <div class="ticket-unit ticket-div">
          <li class="unit">
            <p class="child">
              <span class="desc">工票号:</span>
              <span class="desc">{{routerParam.TICKETCODE}}</span>
            </p>
            <p class="child">
              <span class="desc">车号/列号:</span>
              <span class="desc">{{routerParam.CARNO}}/{{routerParam.TRAINNO}}</span>
            </p>
          </li>
          <li class="unit border">
            <p class="child">
              <span class="desc">件号:</span>
              <span class="desc">{{path === 'start' ? routerParam.OARTNO : routerParam.PARTNO}}</span>
            </p>
            <p class="child">
              <span class="desc">件描述:</span>
              <span class="desc">{{routerParam.PARTDES}}</span>
            </p>
          </li>
          <li class="unit">
            <p class="child">
              <span class="desc">数量:</span>
              <span class="desc">{{path === 'start' ? routerParam.REPNUM : routerParam.REPCOUNT}}</span>
            </p>
            <!-- <p class="child">
              <span class="desc">工艺工时:</span>
              <span class="desc">{{routerParam.MACHTIME}}</span>
            </p> -->
          </li>
        </div>
      </div>
      <ul>
        <li v-for="(item, index) in list" class="change-unit">
          <span @click.stop="handleInfo(item.notes)">变更描述&nbsp;:&nbsp;</span>
          <span @click.stop="handleInfo(item.notes)">{{item.notes}}</span>
          <p class="change-ele">
            <span>变更代码:</span>
            <span>{{item.actionCode}}</span><br>
            <span>当前版本：{{item.newRevNo}}</span>
          </p>
          
        </li>
      </ul>
      <div class="success" v-show="routerParam.PROCHANG == 1">
        <div class="su-btn" v-show="btnStatus == 2">
          <cube-button :primary="true" @click="showLog(2)">生产退领料</cube-button>
        </div>
        <div class="su-btn" v-show="btnStatus == 2">
          <cube-button :primary="true" @click="showLog(1)">通知QA</cube-button>
        </div>
        <div class="su-btn" v-show="btnStatus == 2">
          <cube-button :primary="true" @click="showLog(3)">放行</cube-button>
        </div>
        <div class="su-btn" v-show="btnStatus == 1">
          <cube-button :primary="true" @click="showLog(4)">确认</cube-button>
        </div>
      </div>
    </cube-scroll>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import { log, promptInfo } from "common/js/dialog"
import { getChangeList, changeInfo } from "api/start"

export default {
  data() {
    return {
      list: [],
      param: {
        workNo: '',
        operationNo: ''
      },
      path: 'start',
      message: '',
      routerParam: {},
      currentIndex: -1,
      btnStatus: 0
    };
  },
  created() {
    if (this.$router.currentRoute.params.data) {
      this.routerParam = this.$router.currentRoute.params.data
      this.path = this.$router.currentRoute.params.path
      this.param.workNo = this.routerParam.WORKNO
      this.param.operationNo = this.routerParam.OPERATIONCODE
    }
    this._getChangeList();
  },
  methods: {
    handleInfo(item) {
      promptInfo(this, '变更描述', item)
    },
    _getChangeList() {
      getChangeList(this.param).then(res => {
          if (res.result.code == 0) {
            this.list = res.result.data;
            let num = 0
            this.list.forEach((item) => {
              if (item != 1) {
                num ++
              }
            })
            if (num > 0) {
              this.btnStatus = 2
            } else {
              this.btnStatus = 1
            }
          } else {
            log(this, "变更信息", "获取变更信息失败");
          }
        })
        .catch(err => {
          console.log(err);
          log(this, "错误", process.env.WARNING_INFO);
        });
    },
    // 变更信息状态
    _changeInfo() {
      const data = {
        start: this.status,
        changes: this.list
      };
      changeInfo(data).then(res => {
        if (res.result.code == 0) {
          this.showPopup('myPopup', '变更成功')
        } else {
          this.showPopup('myPopup', '变更失败')
        }
      }).catch(err => {
        console.log(err);
        log(this, "Error", process.env.WARNING_INFO)
      })
    },
    activeClick(index) {
      this.currentIndex = index;
    },
    showLog(status) {
      this.status = status
      if (status === 3) {
        log(this, '放行', '确认放行?', this._changeInfo)
      } else {
        this._changeInfo()
      }
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 3000)
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.change
  position: fixed;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 6;

  .active-unit
    background: #f8fcff;
    border-bottom: 1px solid #fff;

  .change-unit
    line-height: 45px;
    box-sizing: border-box;
    padding: 0 10px;

    .change-ele
      display block
      line-height 35px
      border-bottom 1px solid #999

  .cube-my-popup
    .cube-popup-message
      color: #fff;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8)

  .success 
    display: flex;
    .su-btn
      flex: 1;
      box-sizing: border-box;
      padding: 10px 15px;
</style>
