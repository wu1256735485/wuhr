<template>
  <div>
    <div class="common-ticket common-active" v-show="ticketInfo.TICKETCODE">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child" @click.stop="handleInfos(ticketInfo.TICKETCODE)">
            <span class="desc">工票号:</span>
            <span class="desc">{{ticketInfo.TICKETCODE}}</span>
          </p>
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{ticketInfo.CARNO}}/{{ticketInfo.TRAINNO}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">件号:</span>
            <span class="desc">{{ticketInfo.PARTNO}}</span>
          </p>
          <p class="child">
            <span class="desc" @click.stop="handleInfo(item.PARTDES)">件描述:</span>
            <span class="desc">{{ticketInfo.PARTDES}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{ticketInfo.REPNUM}}</span>
          </p>
          <p class="child">
            <span class="desc">工艺工时:</span>
            <span class="desc">{{ticketInfo.MACHTIME}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket" v-for="(item, index) in ticketDet"
      v-show="ticketDet.length"
      @click.stop="handleCheckClick(item.MHDID)"
    >
      <div class="ticket-unit">
        <li class="unit">
          <p class="child" @click.stop="showmaterial('序列号', item.XLH)">
            <span class="desc">序列号:</span>
            <span class="desc">{{item.XLH}}</span>
          </p>
          
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">变更为:</span>
            <span class="desc">
              <input
                v-model="item.XLHS"
                :disabled="xlhStatus"
                @focus.stop="getXlh(index)"
                @click.stop
                style="width:200px; height:20px"
                class="child-text"/>
            </span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">批次号:</span>
            <span class="desc">{{item.PCH}}</span>
          </p>
          <p class="child">
            <span class="desc">物料编码:</span>
            <span class="desc">{{item.MACODE}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">物料名称:</span>
            <span class="desc">{{item.MANAME}}</span>
          </p>
        </li>
      </div>
      <div class="ticket-status" v-show="checked(item.MHDID)">
        <img src="static/yes.png" alt="">
      </div>
    </div>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { promptInfo } from 'common/js/dialog'
export default {
  props: {
    ticketDet: {
      type: Array,
      default: []
    },
    ticketInfo: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      message: '系统建设中',
      value: '',
      options: [2013, 2015, 2016],
      xlhStatus: false,
      checkList: []
    }
  },
  methods: {
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    handleInfo(item) {
      promptInfo(this, '件描述', item)
    },
    handleInfos(item){
      promptInfo(this, '工票号', item)
    },
    getXlh(index) {
      this.$emit('match', index)
      this.setMatchStatus(true)
    },
    // 选中序列号
    handleCheckClick(id) {
      const index = this.checkList.indexOf(id)
      if (index < 0) {
        this.checkList.push(id)
      } else {
        this.checkList.splice(index, 1)
      }
      this.$emit('check', this.checkList)
    },
    checked(id) {
      return this.checkList.indexOf(id) < 0 ? this.status : !this.status
    },
    showPopup(refId) {
      const component = this.$refs[refId]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    },
    ...mapMutations({
      setMatchStatus: 'SET_MATCHXLH_STATUS'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
  .select-text
    height 25px
  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)
</style>