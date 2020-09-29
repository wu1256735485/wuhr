<template>
  <div>
    <v-header :title="'不良品报工'" @back="handleBack"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <failed-list :list="list" @change="olTicket"></failed-list>
        </div>
        <div class="personnel-wrapper">
          <personnel 
            :list="userList" 
            @out="userOut"
            :operationBtn="operationBtn"
          ></personnel>
        </div>
      </div>
      <cube-popup type="my-popup" :mask="false" ref="myPopup">
        <div class="cube-popup-message">
          <slot>{{message}}</slot>
        </div>
      </cube-popup>
      <footer-oper @search="_getTicket" @read="handleData">
        <div class="footer-btn">
          <div class="btn" @click="_confirmOl">报工</div>
        </div>
      </footer-oper>
    </div>
  </div>
</template>

<script>
import FailedList from './failed-list';
import VHeader from 'base/v-header/v-header';
import Personnel from 'base/personnel/personnel';
import FooterOper from 'base/footer-operation/footer';
import { getTicket, confirmOl } from 'api/failedOl';
export default {
  data() {
    return {
      list: [],
      userList: [],
      ticket: {},
      message: '',
      operationBtn: false,
      checkList: []
    };
  },
  created() {
    const ticketCode = this.$router.currentRoute.params.ticketCode;
    if (ticketCode) {
      this._getTicket(ticketCode);
    }
  },
  methods: {
    // 工票查询不良品
    _getTicket(code) {
      getTicket({ ticketCode: code })
        .then(res => {
          if (res.result.start === 200) {
            if (res.result.list[0].STA == 40) {
              this.showPopup('myPopup', '此工票已完结,不可报工');
              return;
            }
            this.list = [];
            this.userList = [];
            this.list = res.result.list;
            this.userList = res.result.userRec;
          } else {
            this.showPopup('myPopup', '获取数据异常');
          }
        })
        .catch(err => {
          console.log(err);
          this.showPopup("myPopup", process.env.WARNING_INFO);
        });
    },
    // 扫描工票
    handleData(data) {
      if (!data) {
        this.showPopup('myPopup', '未扫描到工票信息');
        return;
      }
      this._getTicket(data);
    },
    // 选中工票数据
    olTicket(data) {
      this.checkList = data;
    },
    // 确认报工
    _confirmOl() {
      if (!this.list.length) return;
      let data = {
        mes: [],
        userRec: []
      };
      this.userList.forEach(item => {
        data.userRec.push({
          jobuserCode: item.jobuserCode,
          jobuserName: item.jobuserName
        });
      });
      if (!this.checkList.length) {
        this.checkList = this.list;
      }
      this.checkList.forEach(item => {
        data.mes.push({
          id: item.TID,
          count: item.UNCOUNT,
          workNo: item.WORKNO
        });
      });
      confirmOl(data)
        .then(res => {
          if (res.status === 200) {
            this.showPopup('myPopup', '报工成功');
          }
        })
        .catch(err => {
          console.log(err);
          this.showPopup('myPopup', '系统发生未知错误');
        });
    },
    // 处理缓存数据
    handleBack() {
      this.list = [];
      this.userList = [];
    },
    // 人员退出
    userOut(index) {
      this.userList.splice(index, 1);
    },
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 2000);
    }
  },
  components: {
    FailedList,
    Personnel,
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
    background: rgba(0, 0, 0, 0.8);
</style>