<template>
  <div class="contaniner">
    <v-header :title="'无工票作业'"></v-header>
    <div class="common-wrapper">
      <div class="select-wrapper">
        <div class="select-wrapper_c">
          <span class="select-text">工&nbsp;&nbsp;区:</span>
          <cube-select 
          class="select-put"
          style="margin-right:10px"
          v-model="selected" 
          :options="selection"
          :placeholder="'请选择工区'"
          @input="handleInput"
          ></cube-select>
          <span class="select-text" >车&nbsp;&nbsp;号:</span>
          <cube-input class="select-put" :placeholder="'请输入车号'"  v-model="carNo" ></cube-input>
        </div>
      <div class="select-wrapper_c">
        <span class="select-text" >列&nbsp;&nbsp;号:</span>
        <cube-input class="select-put"  style="margin-right:10px" :placeholder="'请输入列号'" v-model="tranNo" ></cube-input>
        <span class="select-text" >开工时间:</span>
        <cube-input
              class="select-put"
              style="width:25%"
              :readonly="true"
              :placeholder="'请选择'"
              @focus="showDatePicker('开始时间',1)"
              v-model="startTime"
            ></cube-input>
        
      </div>
      <div class="select-wrapper_c">
          <cube-button style="width:20%; background:#276FC9; float:right; height:22px; line-height:4px; margin-right:30px"  @click="handleInput" type="submit">查询</cube-button>
      </div>
        
      </div>
      <div class="common-inside">
        <div class="ticket-wrapper">
          <Ticket 
            :list="list"
            @is-checked="notChecked"
            @checked-list="handleChecked"
          ></Ticket>
        </div>
      </div>
      <div class="footer-not">
        <div class="btn" @click="_checkedTicket">确认</div>
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
import VHeader from 'base/v-header/v-header'
import Ticket from './ticket'
import { searchWorkArea, searchTicketCode, checkedTicket } from 'api/not-ticket'
export default {
  data() {
    return {
      message: '',
      selected: '',
      carNo: '',//车号
      tranNo: '',//列号
      isEnd:0,
      list: [],
      startTime:'',//开始时间
      selection: [],
      startList: [],
      checkedList: []
    }
  },
  created() {
    this._searchWorkArea()
  },
  beforeRouteLeave(to, from, next) {
    this.$vnode.parent.componentInstance.cache = {}
    this.$vnode.parent.componentInstance.keys = []
    next()
  },
  methods: {
    _searchWorkArea() {
      const personnelCode = sessionStorage.getItem('personnelCode')
      // const personnelCode = '06751'
      searchWorkArea({empCode: personnelCode}).then((res) => {
        if (res.result.start === 200) {
          this.selection = res.result.list
        }
      }).catch((err) => {
        console.log(err)
        this.showPopup('myPopup', process.env.WARNING_INFO)
      })
    },
    _searchTicketCode(data) {
      searchTicketCode(data).then((res) => {
        if (res.result.start === 200) {
          if (res.result.list.length) {
            this.list = res.result.list
          } else {
            this.showPopup('myPopup', '未查询到相关工票')
          }
        }
      })
    },
    // 开始时间选择
    showDatePicker(title,who) {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          title: title,
          min: new Date(2008, 7, 8),
          max: new Date(2050, 9, 20),
          value: new Date(),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.isEnd = who;
      this.datePicker.show();
    },
    selectHandle(date, selectedVal, selectedText) {
      if (selectedVal[1] < 10) {
        selectedVal[1] = '0' + selectedVal[1]
      }
      if (selectedVal[2] < 10) {
        selectedVal[2] = '0' + selectedVal[2]
      }
      if (this.isEnd === 1) {
        this.startTime =
          selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
      }
      if (this.isEnd === 2) {
        this.endTime =
          selectedVal[0] + '-' + selectedVal[1] + '-' + selectedVal[2]
      }
      this.isEnd = 0;
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show();
    },
    // 选中工票确认
    _checkedTicket() {
      if (!this.checkedList.length) {
        return
      }
      const status = sessionStorage.getItem('hashUrl') === 'start' ? '1' : '2'
      let data = {'noTicktet': this.checkedList, start: status}
      checkedTicket(data).then((res) => {
        if (res.result.start === 200) {
          if (status === '1') {
            this.startList = res.result.ticketInfo.list
          } else {
            this.startList = res.result.list
          }
          if (status === '1') {
             this.$router.push({
              name: 'start',
              params: { data: this.startList, personnel: res.result.ticketInfo.userRec }
            })
          } else {
            this.$router.push({
              name: 'ol',
              params: { data: this.startList, personnel: res.result.userRec }
            })
          }
        } else {
          this.showPopup('myPopup', '确认失败')
        }
      }).catch((err) => {
        console.log(err)
        this.showPopup('myPopup', process.env.WARNING_INFO)
      })
    },
    handleChecked(list) {
      this.checkedList = list
    },
    handleInput(change) {
      if(!this.selected){
        this.showToast(this, '请选择工区')
        return
      }
      const personnelCode = sessionStorage.getItem('personnelCode')
      // const personnelCode = '06751'
      const start = sessionStorage.getItem('hashUrl') === 'start' ? '1' : '2'
      if(start == 1){
        const data = {
          empCode: personnelCode,
          workNo: this.selected,
          carNo : this.carNo,
          tranNo : this.tranNo,
          productionTime:this.startTime,
          start : '1'
        }
        this._searchTicketCode(data)
      }else{
        const data = {
          empCode: personnelCode,
          workNo: this.selected,
          carNo : this.carNo,
          tranNo : this.tranNo,
          productionTime:this.startTime,
          start : '2'
        }
        this._searchTicketCode(data)
      }
      
    },
    notChecked() {
      this.showPopup('myPopup', '只可选择相同批次的工票')
    },
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
    VHeader,
    Ticket
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
.contaniner
  position relative
  .footer-not
    position fixed
    bottom 0
    width 100%
    background: #fff;
    .btn
      width 92%
      margin 5px 4%
      height: 35px;
      line-height: 35px;
      color: #fff;
      background: #fc9153;
      cursor: pointer;
      text-align: center;
      white-space: nowrap;
  .select-wrapper
    box-sizing border-box
    padding 10px
    background #9acafb
    .select-text
      float left 
      margin-right 10px 
      line-height 22px
    .select-wrapper_c
      height 30px
      margin-top 5px
      .select-put
        border-radius 10px
        width 30%
        height 22px
        float left
        line-height 2px
        overflow hidden
        text-overflow ellipsis

  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)
</style>