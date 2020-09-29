<template>
  <div class="ol-ticket">
    <div class="common-ticket common-back"
      ref="allTicket"
      v-for="(item, index) in list"
    >
      <div class="ticket-unit">
        <li class="unit">
          <p class="child" @click.stop="ticketInfo(item.TICKETCODE)">
            <span class="desc">工票号:</span>
            <span class="desc">{{item.TICKETCODE}}</span>
          </p>
          <p class="child">
            <span class="desc">项目号:</span>
              <span class="desc">{{item.PROJECT_CODE}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">车号列号:</span>
            <span class="desc">{{item.CARNO}}/{{item.TRAINNO}}</span>
          </p>
          <p class="child">
            <span class="desc">计划车号:</span>
            <span class="desc">{{item.CPLANID}}</span>
          </p>
        </li>
        <li class="unit"  v-show="currentIndex !== index">
          <p class="child" @click.stop="partoInfo(item.PARTNO)">
            <span class="desc">件号:</span>
            <span class="desc">{{item.PARTNO}}</span>
          </p>
          <p class="child" @click.stop="handleInfo(item.PARTDES)">
            <span class="desc">件描述:</span>
            <span class="desc">{{item.PARTDES}}</span>
          </p>
        </li>
        <li class="unit border"  v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">
              {{item.REPCOUNT}}
              <input type="text" 
                class="child-text" 
                v-model="item.CHANGCOUN"
                :disabled="handleCountDisabled(item)"
                @focus.stop
                @click.stop
                @keyup="handleCount(index, item)"
              > 
            </span>
          </p>
          <p class="child">
            <span class="desc">完成%:</span>
            <span class="desc">
              <input type="text" class="child-text"
                v-model="item.FINPER"
                :disabled="isPercent"
                @click.stop
                @keyup="handlePercent(index, item)"
              >%
            </span>
          </p>
        </li>
        
        <li class="unit border"  v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">工艺变更:</span>
            <span class="desc" v-show="item.pictureStart == 0">
              <img src="static/change_no.png" alt />
            </span>
            <span class="desc" v-show="item.pictureStart == 1" @click="handleChanges(item)">
              <img src="static/change@2x.png" alt />
            </span>
          </p>
        </li>
      </div>
      <div class="ticket-operation">
        <span class="oper">
          <img src="static/collapse@2x.png" alt="" @click.stop="handleIsClose(index, $event)">
        </span>
        <span class="oper-img" @click="goRouter('failedOl', item.TICCODE)">
          <img src="static/liang.png" alt="">
        </span>
        <span class="oper-img" @click="goRouter('linchpin', item.TICCODE)">
          <img src="static/close@2x.png" alt="" v-show="item.ISNOTBIND !== 0">
        </span>
      </div>
      <!-- <div class="ticket-status">
        <img src="static/yes.png" alt="">
      </div> -->
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

const INDEX = 0 // 工票dom下标

export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      ticketList: [],
      checkList: [],
      checkTicket: [],
      message: '',
      currentIndex: -1,
      isNumber: false,
      isPercent: false
    }
  },
  mounted() {
    let interval = setInterval(() => {
      if (!this.list.length) return
      if (this.ticketList.length) {
        clearInterval(interval)
        return
      }
      this.ticketList = JSON.parse(JSON.stringify(this.list))
      this.list.forEach((item) => {
        this.isPrintPercent(item)
      })
    }, 200)
  },
  methods: {
    handleInfo(item) {
      promptInfo(this, '件描述', item)
    },
    partoInfo(item) {
      promptInfo(this, '件号', item)
    },
    ticketInfo(item) {
      promptInfo(this, '工票号', item)
    },
    handleCount(index, item) {
      // 检索是否存在禁用的数量
      let num = 0
      this.list.forEach((ticket, currentIndex) => {
        const isDisabled = this.$refs.allTicket[currentIndex].children[INDEX].children[3].children[0].children[1].children[0].disabled
        if (isDisabled) {
          num++
        }
      })
      // num > 0 即代表存在数量为禁用的工票
      // if (num > 0) {
      //   item.CHANGCOUN = 0
      //   this.showPopup('myPopup', '当前存在禁用的工票，不允许输入数量')
      //   return
      // } else {
        // num <= 0则代表均为可输入状态
        // 如果输入的数量正好等于最大报工数量，则填充剩余的工票数量
        if (index === 0) {
          if (item.CHANGCOUN == item.REPCOUNT) {
            this.list.forEach((ele, number) => {
              this.list[number].CHANGCOUN = ele.REPCOUNT
              this.ticketList[number].CHANGCOUN = ele.REPCOUNT
            })
            this.$emit('ticket', this.ticketList)
            return
          }
        }
      // }
      if (item.CHANGCOUN > this.ticketList[index].COUNT) {
        item.CHANGCOUN = 0
        this.showPopup('myPopup', `数量不可超过最大报工数量${this.ticketList[index].COUNT}`)
        return
      }
      this.ticketList[index].CHANGCOUN = item.CHANGCOUN
      this.$emit('ticket', this.ticketList)
    },
    handlePercent(index, item) {
      // item.CHANGCOUN = 0 // 输入0为通知后台此次数量不生效
      // 输入百分比数量全部禁用
      let num = 0
      this.$refs.allTicket[index].children[INDEX].children[3].children[0].children[1].children[0].disabled = true
      this.list.forEach((ticket, currentIndex) => {
      // this.$refs.allTicket[index].children[INDEX].children[3].children[0].children[1].children[0].disabled = true
        const isDisabled = this.$refs.allTicket[currentIndex].children[INDEX].children[3].children[1].children[1].children[0].disabled
        if (isDisabled) {
          num++
        }
      })
      if (index === 0) {
        if (num === 0) {
          if (item.FINPER == 100) {
            this.list.forEach((ticket, currentIndex) => {
              ticket.FINPER = 100
              this.ticketList[currentIndex].FINPER = item.FINPER
            })
            this.$emit('ticket', this.ticketList)
            return
          }
        }
      }
      if (item.FINPER > 100) {
        item.FINPER = 0
        this.showPopup('myPopup', '超出最大可报工百分比')
        return
      }
      // if(item.FINPER.indexOf('.') != -1){
      //   item.FINPER = 0
      //   this.showPopup('myPopup', '请输入整数')
      //   return
      // }
      this.ticketList[index].FINPER = item.FINPER
      this.$emit('ticket', this.ticketList)
    },
    handleIsClose(index, e) {
      let img = e.target;
      if (this.currentIndex === index) {
        img.setAttribute('src', 'static/collapse@2x.png');
        this.currentIndex = -1;
        return;
      }
      img.setAttribute('src', 'static/expand@2x.png');
      this.currentIndex = index;
    },
    goRouter(routerName, code) {
      this.$router.push({
        name: routerName,
        params: {ticketCode: code}
      })
    },
    // 数量是否禁用
    handleCountDisabled(item) {
      // 在此之前报工是否输入过百分比
      if (item.FINPER > 0) {
        return true
      }
      // 不需要绑定关键件
      if (item.ISNOTBIND === 0) {
        if (item.REPCOUNT == 1) {
          return true
        }
        return false
      } else {
        // 关键件绑定不完全
        if (item.ISBIND !== 1) {
          return true
        } else {
          return false
        }
      }
    },
    // 判断百分比输入框是否禁用
    isPrintPercent(item, call) {
      if (call) {
        this.isPercent = true
      }
      if (item.REPCOUNT == 1) {
        this.isPercent = false
      }
       // 不需要绑定关键件
      if (item.EXISTCRITICALPART === 0) {
        this.isPercent = false
      }
      if (item.ISNOTBIND == 0 && item.REPCOUNT == 1) {  // 不需要关键件的情况
        this.isPercent = false
      }
      if (item.ISBIND != 1) {
        this.isPercent = false
      }
      if (item.FINPER > 0) {
        this.isNumber = true
      }
      // 百分比是否禁用最终结果
      if (this.isPercent) {
        return true
      } else {
        return false
      }
      // if (item.ISBIND == 1 && item.REPCOUNT == 1) {
      //   return false  // 数量为1只能输入百分比
      // } else if (item.ISBIND == 0 || item.ISBIND == 2) {
      //   return false  // 关键件未绑定只能输入百分比，并且不考虑数量
      // } else if (item.REPCOUNT > 1 && item.ISBIND == 1) {
      //   return true   // 关键件已绑定并且数量大于1不可以输入百分比
      // }
    },
    // 变更信息
    handleChanges(item) {
      this.$router.push({
        name: 'change',
        params: { data: item, path: 'ol' }
      });
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