<template>
  <div>
    <div class="common-ticket common-back" 
      v-for="(item, index) in list"
      @click.stop="checkTickets(item)"
    >
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">工票号:</span>
            <span class="desc">{{item.TICCODE}}</span>
          </p>
          <p class="child">
            <span class="desc">项目号:</span>
            <span class="desc">{{item.PROJECT_CODE}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">件号:</span>
            <span class="desc">{{item.PARTNO}}</span>
          </p>
          <p class="child" @click.stop="handleInfo(item.PARTDES)">
            <span class="desc">件描述:</span>
            <span class="desc">{{item.PARTDES}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{item.CARNO}}/ {{item.TRAINNO}}</span>
          </p>
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">
              <!-- <input type="text" class="child-text" v-model="item.REPCOUNT"> -->
              {{item.REPCOUNT}}
            </span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">不良品:</span>
            <span class="desc">
              <input type="text" class="child-text" 
                v-model="item.UNCOUNT"
                @keyup="handleNumber(item, index)"
                @click.stop
              >
            </span>
          </p>
        </li>
      </div>
      <div class="ticket-status" v-show="isChecked(item.TID)">
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
import { promptInfo } from 'common/js/dialog'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkList: [],
      checkTicket: [],
      ticketList: [],
      message: ''
    }
  },
  created() {
    let interval = setInterval(() => {
      if (!this.list.length) return
      if (this.ticketList.length) {
        clearInterval(interval)
        return
      }
      this.ticketList = JSON.parse(JSON.stringify(this.list))
    }, 200)
  },
  methods: {
    handleInfo(item) {
      promptInfo(this, '件描述', item)
    },
    // 工票选中
    checkTickets(item) {
      const index = this.checkTicket.indexOf(item.TID)
      if (index < 0) {
        this.checkTicket.push(item.TID)
      } else {
        this.checkTicket.splice(index, 1)
      }
      this.readCheckTicket()
    },
    // 判断选中状态
    isChecked(id) {
      return this.checkTicket.indexOf(id) < 0 ? false : true
    },
    // 报工数量处理
    handleNumber(item, index) {
      if (item.UNCOUNT > item.COUNT) {
        this.showPopup('myPopup', `不可超出最大报工数量${item.COUNT}`)
        item.UNCOUNT = 0
        return
      }
      let num = 0
      if (this.checkList.length) {
        this.checkList.findIndex((child) => {
          if (item.TID === child.TID) {
            child.UNCOUNT = item.UNCOUNT
            num++
          }
        })
        if (num > 0) {
          this.$emit('change', this.checkList)
        } else {
          this.ticketList[index].UNCOUNT = item.UNCOUNT
          this.$emit('change', this.ticketList)
        }
      } else {
        this.ticketList[index].UNCOUNT = item.UNCOUNT
        this.$emit('change', this.ticketList)
      }
    },
    // 获取选中的工票
    readCheckTicket() {
      this.checkList = []
      if (this.checkTicket.length) {
        this.checkTicket.forEach((item) => {
          this.ticketList.forEach((child) => {
            if (child.TID === item) {
              this.checkList.push(child)
            }
          })
        })
        this.$emit('ticket', this.checkList)
      } else {
        this.$emit('ticket', this.ticketList)
      }
    },
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 2000)
    }
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
</style>