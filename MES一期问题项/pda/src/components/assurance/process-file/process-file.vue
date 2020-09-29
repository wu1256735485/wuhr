<template>
<div>
  <v-header :title="'查看工艺文件'"></v-header>
  <div class="common-wrapper pb">
    <div class="common-side">
      <file-list :list="list"></file-list>
    </div>
    <footer-oper @search="_seeFile" @read="handleFile"></footer-oper>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</div>
</template>

<script>
import { getqueryqarouting } from 'api/processFile'
import { getTicket } from 'api/start'
import VHeader from 'base/v-header/v-header'
import FileList from './file-list'
import FooterOper from 'base/footer-operation/footer'
import { responesMode } from 'common/js/config'

export default {
  data() {
    return {
      ticketCode: '',
      ticket: '',
      list: {},
      info: [],
      message: ''
    }
  },
  created() {
    if (!this.$router.currentRoute.params.ticketCode) return
    this.ticket = this.$router.currentRoute.params.ticketCode
    if (this.ticket) {
      this._seeFile(this.ticket)
    }
  },
  methods: {
    // 扫描工票获取文件
    handleFile(data) {
      if (!data) {
        this.showPopup('myPopup', '未扫描到工票信息')
        return
      }
      this._seeFile(data)
    },
    // 查询工票相关工艺文件
    _seeFile(code) {
      getqueryqarouting({qcCode: code}).then((res) => {
        if (res.status === 1) {
          this.list = res.result
        } else {
          this.list = {}
          this.showPopup('myPopup', '该工票无工艺文件')
        }
      })
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
    FileList,
    FooterOper,
    VHeader
  },
  mounted() {
    // this._seeFile('MES-LZK;8684472;*;*;10;')
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)

.pb
  padding-bottom 100px
</style>