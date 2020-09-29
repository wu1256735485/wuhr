<template>
  <div>
    <v-header :title="'个人工时查询'"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <div class="start-work">
            <label class="date-desc">开始时间:</label>
            <cube-input
              class="date-picker"
              :readonly="true"
              @focus="showDatePicker('开始时间', 1)"
              v-model="startTime"
            ></cube-input>
          </div>
          <div class="start-work">
            <label class="date-desc">结束时间:</label>
            <cube-input
              class="date-picker"
              :readonly="true"
              @focus="showDatePicker('结束时间', 2)"
              v-model="endTime"
            ></cube-input>
          </div>
          <working-list :mes="userInfo" :list="list"></working-list>
        </div>
      </div>
      
      <footer-oper
        :placeholder="'请刷员工卡或输入卡号'"
        @search="handleManualPrint"
        @readNfc="handleData"
        @read="handleScan"
      ></footer-oper>
      <cube-popup type="my-popup" :mask="false" ref="myPopup">
        <div class="cube-popup-message">
          <slot>{{message}}</slot>
        </div>
      </cube-popup>
    </div>
  </div>
</template>

<script>
import WorkingList from './working-list';
import VHeader from 'base/v-header/v-header';
import FooterOper from 'base/footer-operation/footer';
import { getWorkingHours } from 'api/WorkingHours';
import { log } from 'common/js/dialog';
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
      list: [],
      userInfo: {},
      date: [],
      dateSegmentPicker: '',
      startTime: '',
      endTime: '',
      message: '',
      userNfc: '',
      isEnd: 0
    };
  },
  mounted() {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    console.log(date.getMonth() + 1)
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    this.startTime = year.toString() + '-' + month + '-' + day
    this.endTime = this.startTime;
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
    handleData(code) {
      this.userNfc = code;
      this._getWorkingHours(this.userNfc)
    },
    // 手动输入查询
    handleManualPrint(code) {
      this._getWorkingHours(code, '2')
    },
    // 扫描二维码
    handleScan() {
      this.showPopup('myPopup', '请刷卡，不支持扫描工票');
    },
    _getWorkingHours(code, status = 1) {
      const data = {
        startTime: this.startTime,
        endTime: this.endTime,
        userCode: code,
        start: status
      };
      if (!data.startTime || !data.endTime) {
        const date = new Date();
        const startYear = date.getFullYear()
        const startMonth = date.getMonth() + 1
        const startDay = date.getDate();
        data.startTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
        data.endTime = data.startTime;
      }
      getWorkingHours(data)
        .then(res => {
          if (res.result.start === 200) {
            this.userInfo = res.result.mes
            this.list = res.result.mes.del
          } else {
            this.showPopup('myPopup', res.result.mes)
          }
        })
        .catch(err => {
          console.log(err);
          this.showPopup("myPopup", process.env.WARNING_INFO);
        });
    },
    selectedTime() {
      const year = this.date[0][0] + '-'
      const month =
        this.date[0][1] < 10
          ? '0' + this.date[0][1] + '-'
          : this.date[0][1] + '-'
      const day =
        this.date[0][2] < 10 ? '0' + this.date[0][2] : this.date[0][2]
      this.startTime = year + month + day
      const endYear = this.date[1][0] + '-'
      const endMonth =
        this.date[1][1] < 10
          ? '0' + this.date[1][1] + '-'
          : this.date[1][1] + '-'
      const endDay =
        this.date[1][2] < 10 ? '0' + this.date[1][2] : this.date[1][2]
      this.endTime = endYear + endMonth + endDay
      this._getWorkingHours(this.userCode)
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 2000);
    }
  },
  watch: {
    endTime(newVal) {
      console.log(newVal, 'end');
      if (newVal && this.startTime && this.userNfc) {
        this._getWorkingHours(this.userNfc);
      }
    },
    startTime(newVal) {
      console.log(newVal, 'start');
      if (newVal && this.endTime && this.userNfc) {
        this._getWorkingHours(this.userNfc);
      }
    }
  },
  components: {
    WorkingList,
    FooterOper,
    VHeader
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.cube-my-popup
  .cube-popup-message
    color: #fff;
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