<template>
  <div class="wrapper" v-show="list.length">
    <cube-scroll class="personnel" :data="list" :options="scrollOption">
      <ul>
        <li class="unit" v-for="(item, index) in list">
          <span class="name-user">{{item.jobuserName}}&nbsp;:&nbsp;({{item.employeeCode}})</span>
          <span class="name-user" v-if="index === 0">总人数:({{list.length}})</span>
          <span class="name-user" 
            @click.stop="_logOut(item.teusrId, index, item.jobuserName, item.jobuserCode)"
            v-show="operationBtn"
          >退出</span>
        </li>
      </ul>
    </cube-scroll>
    <read-nfc 
      :operation="operation"
      :cardId="nfcCard"
      @card="handleUser"
      @is-show="handleShowCard"
      v-show="nfcShow"
    ></read-nfc>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import { userTimeout } from 'api/start'
import { log } from 'common/js/dialog'
import ReadNfc from 'base/read-nfc/read-nfc'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    operationBtn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      scrollOption: {
        scrollbar: true,
        fade: false,
      },
      userId: '',
      userIndex: -1, // 人员下标
      nfcShow: false,
      message: '',
      operation: false,
      nfcCard: ''
    }
  },
  methods: {
    // 人员退出
    _logOut(id, index, name, nfcCard) {
      this.userId = id
      this.userIndex = index
      this.nfcCard = nfcCard
      log(this, '人员退出', `确定要退出${name}?`, this._userOut)
    },
    // 人员退出请求
    _userOut() {
      if (this.userId) {
        this.operation = true
        this.nfcShow = true
        this.$emit('user-out', true) // 通知父组件，当前为人员退出操作
      } else {
        this.operation = false
        this.$emit('out', this.userIndex)
        this.$emit('user-out', false) // 通知父组件，当前为人员退出操作
      }
    },
    handleUser(status) {
      if (status) {
        this.nfcShow = false
        if (this.userId) {
          userTimeout({id: this.userId}).then((res) => {
            if (res.result.start === 200) {
              this.operation = false
              this.$emit('user-out', false) // 通知父组件，当前为人员退出操作
              this.$emit('out', this.userIndex)
            } else {
              this.operation = false
              this.$emit('user-out', false) // 通知父组件，当前为人员退出操作
              this.showPopup('myPopup', '退出失败')
            }
          })
        } else {
          this.operation = false
          this.$emit('user-out', false) // 通知父组件，当前为人员退出操作
          this.$emit('out', this.userIndex)
        }
      } else {
        this.showPopup('myPopup', '人员验证未通过')
      }
    },
    handleShowCard(isShow) {
      this.nfcShow = isShow
      this.$emit('user-out', false) // 通知父组件，当前为人员退出操作已结束
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 2000)
    }
  },
  components: {
    ReadNfc
  }
}
</script>

<style lang="stylus" scoped>
.wrapper
  width 100%
  // position fixed
  // bottom 110px
  .personnel
    height 90px
    margin 30px 10px 5px 10px
    box-sizing border-box
    background #fff
    font-size 14px
    color #666
    border 1px solid #e5e5e5
    border-radius 5px
    .unit
      height 30px
      line-height 30px
      box-sizing border-box
      border-bottom 1px solid #e5e5e5
      .name-user
        text-align left
        box-sizing border-box
        padding-left 10px
      .name-user:last-child
        float right
        padding-right 5px
        color #3b85e6

  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)
</style>

