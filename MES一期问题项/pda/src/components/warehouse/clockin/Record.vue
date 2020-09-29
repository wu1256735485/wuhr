<template>
  <div>
    <v-header :title="'个人打卡查询'"></v-header>
    <div class="record_b">
        <div class="record_t">
         <span class="record_sp">开始时间:</span>
         <span class="record_sp1"> 
           <input class="record_sp_input"
              @focus="showDatePicker('开始时间', 1)"
              v-model="startTime"
            />
            </span>
         <span class="record_sp">结束时间:</span>
         <span class="record_sp1">
            <input class="record_sp_input"
              @focus="showDatePicker('结束时间', 2)"
              v-model="endTime"
            />
         </span>
        </div>
        <div class="recrod_i">
         <span class="recrod_input"> 
           <input class="record_sp_i" v-model="namecode" placeholder="请刷员工卡或输入卡号"/> </span>
         <span class="recrod_btn"> 
            <cube-button class="btn_styles" :inline="true" :primary="true" @click="Undercarriage">查询</cube-button>
         </span>
        </div>
    </div>
    <div class="record_f">
      <cube-scroll class="scroll_wrapper" :data="upcList" ref="scroll">
      <div class="record_for" v-for="item in upcList" v-bind:key="item.id">
        <ul >
          <li class="record_f_ul">
             <span class="sp_li">姓名:{{item.userName}}</span>
             <span v-show="item.classType == 1" class="sp_li">班次:早班</span>
             <span v-show="item.classType == 2" class="sp_li">班次:中班</span>
             <span v-show="item.classType == 3" class="sp_li">班次:晚班</span>
          </li>
          <li class="record_f_ul">
             <span v-show="item.punchType == 0" class="sp_li1">上班时间:{{item.punchTime}}</span>
             <span v-show="item.punchType == 1" class="sp_li1">下班时间:{{item.punchTime}}</span>
          </li>
        </ul>
      </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
import VHeader from 'base/v-header/v-header'
import { log } from 'common/js/dialog'
import { getNfc } from 'api/materials'
import { selectDetailByDate } from 'api/clockin'
const pickerTime = [
  {
    is: 'cube-date-picker',
    title: '开始时间',
    min: new Date(2009, 0, 1),
    max: new Date(2022, 11, 31)
  },
  {
    is: 'cube-date-picker',
    title: '结束时间',
    min: new Date(1970, 0, 1),
    max: new Date(2050, 11, 31)
  }
];
export default {
  data() {
    return {
      namecode: '',
      upcList: [],
      startTime: '',
      endTime: '',
      message: '',
      isEnd: 0
    };
  },
  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    // console.log(date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.startTime = year.toString() + '-' + month + '-' + day
    this.endTime = this.startTime;
    window.beCalledNfc = this.beCalledNfc
  },
  methods: {
    // 开始时间选择
    showDatePicker(title, who) {
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
    beCalledNfc (data) {
    this.showIndicator(this)
    getNfc({ nfcNo: data }).then(res => {
      this.closeIndicator()
      if (res.result.start == 200 || res.result.start == 201 ) {
        // this.name = res.result.mes.NAME
        this.namecode = res.result.mes.NAMECODE
      } else {
        this.showToast(this, '未找到人员信息')
      }
    }).catch((error) => {
      this.closeIndicator()
      if (error=== 307 || error=== 900 || error=== 403) return
      this.showToast(this, '请求数据失败')
    })
    },
    Undercarriage(){
     if (!this.namecode) {
       this.showToast(this, '请刷卡')
       return
     }
     this.showIndicator(this)
      let requstdata = {
        'beforeTime': this.startTime,
        'userCode': this.namecode,
        'endTime': this.endTime
      }
      selectDetailByDate(requstdata).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status !== 200) {
          this.showToast(this, '提交失败')
          return
        }
        if (response.result.upcList.length === 0) {
          this.showToast(this, '无记录')
        }
        this.upcList = response.result.upcList
      }).catch((error) => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
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



    // _getWorkingHours(code, status = 1) {
    //   const data = {
    //     startTime: this.startTime,
    //     endTime: this.endTime,
    //     userCode: code,
    //     start: status
    //   };
    //   if (!data.startTime || !data.endTime) {
    //     const date = new Date();
    //     const startYear = date.getFullYear()
    //     const startMonth = date.getMonth() + 1
    //     const startDay = date.getDate();
    //     data.startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
    //     data.endTime = data.startTime;
    //   }
    //   getWorkingHours(data)
    //     .then(res => {
    //       if (res.result.start === 200) {
    //         this.userInfo = res.result.mes
    //         this.list = res.result.mes.del
    //       } else {
    //         this.showPopup('myPopup', res.result.mes)
    //       }
    //     })
    //     .catch(err => {
    //       console.log(err);
    //       this.showPopup("myPopup", process.env.WARNING_INFO);
    //     });
    // },
    // selectedTime() {
    //   const year = this.date[0][0] + '-'
    //   const month =
    //     this.date[0][1] < 10
    //       ? '0' + this.date[0][1] + '-'
    //       : this.date[0][1] + '-'
    //   const day =
    //     this.date[0][2] < 10 ? '0' + this.date[0][2] : this.date[0][2]
    //   this.startTime = year + month + day
    //   const endYear = this.date[1][0] + '-'
    //   const endMonth =
    //     this.date[1][1] < 10
    //       ? '0' + this.date[1][1] + '-'
    //       : this.date[1][1] + '-'
    //   const endDay =
    //     this.date[1][2] < 10 ? '0' + this.date[1][2] : this.date[1][2]
    //   this.endTime = endYear + endMonth + endDay
    //   this._getWorkingHours(this.userCode)
    // },
    // 提示消息
  //   showPopup(name, message = '操作成功') {
  //     this.message = message;
  //     const component = this.$refs[name];
  //     component.show();
  //     setTimeout(() => {
  //       component.hide();
  //     }, 2000);
  //   }
  // },
  // watch: {
  //   endTime(newVal) {
  //     console.log(newVal, 'end');
  //     if (newVal && this.startTime && this.userNfc) {
  //       this._getWorkingHours(this.userNfc);
  //     }
  //   },
  //   startTime(newVal) {
  //     console.log(newVal, 'start');
  //     if (newVal && this.endTime && this.userNfc) {
  //       this._getWorkingHours(this.userNfc);
  //     }
  //   }
  },
  components: {
    VHeader
  },
  beforeDestroy () {
    window.beCalledNfc = ''
  }
}
</script>

<style lang="stylus" scoped>

.record_b
 position absolute
 top 50px
 right 10px
 left 10px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 background: #9acafb
 padding-bottom 5px
 .record_t
  margin-top 5px
  display flex
  justify-content center
  align-items center
  font-size 14px
  margin-left 10px
  margin-right 10px
  .record_sp
   width 20%
  .record_sp1
    width 30%
    .record_sp_input
     border: 1px solid rgba(0, 0, 0, 0.1)
     border-radius: 8px
     width 95%
     height 30px
 .recrod_i
  display flex
  justify-content center
  align-items center
  margin-top 5px
  margin-left 10px
  margin-right 10px
  .recrod_input
   width 80%
   .record_sp_i
    width 95%
    height 30px
    border: 1px solid rgba(0, 0, 0, 0.1)
    border-radius: 8px
  .recrod_btn
   width 20%
   display flex
   justify-content flex-end
   .btn_styles
    margin-right 3px
    background: #3A85E6
    height: 25px
    line-height: 1px

.record_f
 position absolute
 top 130px
 right 0px
 left 0px
 bottom 0
 .scroll_wrapper
  height 100%
  width 100%
  .record_for
    border: 1px solid rgba(0, 0, 0, 0.1)
    border-radius: 5px
    margin-top 5px
    margin-left 10px
    margin-right 10px
    .record_f_ul
     font-size 14px
     display flex
     justify-content start
     margin-top 5px
     padding-bottom 5px
     margin-left 10px
     margin-right 10px
     .sp_li
      display flex
      justify-content start
      width 50%

.cube-my-popup
  .cube-popup-message
    padding: 20px;
    background: rgba(0, 0, 0, 0.8)

.start-work
  width: 100%;
  line-height: 40px;
  display: flex;
  margin-top: 10px;
  .date-desc
    width: 25%;
    text-indent: 1em
  .date-picker 
    flex: 1;
    margin-right: 15px
</style>