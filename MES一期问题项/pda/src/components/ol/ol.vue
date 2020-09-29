<template>
  <div>
    <v-header :title="'报工'" @back="handleBack"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <ticket :list="ticketList" @ticket="handleMes"></ticket>
        </div>
        <div class="personnel-wrapper">
          <personnel 
            :list="personnelList"
            :operationBtn="operationBtn"
            @out="userOut"
          ></personnel>
        </div>
      </div>
      <footer-oper @search="_getTicket" @read="handleRead" @readNfc="handleNfc">
        <div class="footer-btn">
          <div v-show="ashplacing" class="btn" @click="_confirmOl">确认报工</div>
          <div v-show="!ashplacing" class="btn" style="background:#888">确认报工</div>
          <router-link tag="div" to="/not" class="btn">无票</router-link>
          <!-- <div class="btn">不良品报工</div> -->
        </div>
      </footer-oper>
    </div>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
    <cube-loading v-show="hasMore" class="loading"></cube-loading>
    <div v-show="hasMores" class="loading">报工中请稍后{{timer}}S</div>
  </div>
</template>

<script>
import Ticket from './ticket'
import VHeader from 'base/v-header/v-header'
import Personnel from 'base/personnel/personnel'
import FooterOper from 'base/footer-operation/footer'
import { getTicket, confirmOl } from 'api/ol'
import { log , promptInfo } from 'common/js/dialog'
export default {
  data() {
    return {
      scrollOption: {
        scrollbar: true
      },
      operationBtn: false,
      mes: [],
      ol: {},
      message: '',
      ticketCode: '',
      personnelList: [],
      ticketList: [],
      checkList: [],
      userInfo: [],
      isConfirm: true,
      isNumber: false,
      hasMore:false,//loading显示隐藏
      hasMores:false,//loading提示文字显示与隐藏
      retuisshow:false,//判断数量和百分比是否为0
      timer:5,
      ashplacing:true,
      foowwLocalStorage : {//封装localStorage
          set: function (key, value, ttl_ms) {
              var data = { value: value, expirse: new Date(ttl_ms).getTime() };
              localStorage.setItem(key, JSON.stringify(data));
          },
          get: function (key) {
              var data = JSON.parse(localStorage.getItem(key));
              if (data !== null) {
                  if (data.expirse != null && data.expirse < new Date().getTime()) {
                      localStorage.removeItem(key);
                  } else {
                      return data.value;
                  }
              }
              return null;
          }
      }
    }
  },
  activated() {
    // 缓存钩子
    sessionStorage.setItem('hashUrl', 'ol')
  },
  mounted() {
    sessionStorage.setItem('hashUrl', 'ol')
    const list = this.$router.currentRoute.params.data
    if (!list) return
    const personnel = this.$router.currentRoute.params.personnel
    if (list.length) {
      this.ticketList = list
      if (personnel) {
        this.personnelList = personnel
      }
    } else {
      this.showPopup('myPopup', '未查询到需要报工的工票')
    }
  },
  methods: {
    // 工票查询
    _getTicket(code) {
      this.ashplacing = true
      this.hasMore = true
      const index = this.ticketList.forEach(item => {
        return item.TICKETCODE === code
      })
      if (index >= 0) {
        this.hasMore = false
        this.showPopup('myPopup', '此工票已存在')
        return
      }
      getTicket({ ticketCode: code }).then(res => {
        this.hasMore = false
        if (res.result.start !== 200) {
          this.showPopup('myPopup', '获取数据异常')
          return
        }
        if (res.result.list.length === 0) {
          this.showPopup('myPopup', '未获取到数据');
          return
        }
        if (res.result.list[0].STA === 10) {
          this.showPopup('myPopup', '此工票还未开工')
          return
        } else if (res.result.list[0].STA === 30) {
          this.showPopup('myPopup', '该工票暂停中，请复工之后再报工')
          return
        } else if (res.result.list[0].STA === 40) {
          this.showPopup('myPopup', '此工票已完结')
          return
        }
        this.ticketList = res.result.list
        if (res.result.userRec.length) {
          this.personnelList = res.result.userRec
        }
      })
    },
    // 刷卡查询
    handleNfc(data) {
      if (!this.ticketList.length) {
        this._getTicket(data)
      }
    },
    // 处理缓存数据
    handleBack() {
      this.personnelList = []
      this.ticketList = []
    },
    // 扫码查询工票
    handleRead(code) {
      this._getTicket(code)
    },
    _confirmOl() {
      this.retuisshow = false
      this.hasMore = true
      this.hasMores = true
      if (!this.ticketList.length) {
        this.hasMore = false
        this.hasMores = false
        return
      }
      this.ticketList.forEach(item => {
        if (item.ISBIND === 0 || item.ISBIND === 2) {
          let status = false
        }
      })
      let data = {
        mes: [],
        userRec: []
      }
      if (!this.personnelList.length) {
        this.hasMore = false
        this.hasMores = false
        // this.showPopup('myPopup', '请先添加人员')
        promptInfo(this, '', '请先添加人员')
        return
      }
      this.personnelList.forEach(item => {
        data.userRec.push({
          jobuserCode: item.jobuserCode,
          jobuserName: item.jobuserName
        })
      })
      if (!this.mes.length) {
        this.mes = this.ticketList
      }
      this.ticketList.forEach((item, index) => {
        if(item.CHANGCOUN == 0 && item.FINPER == 0){
          this.retuisshow = true
        }
        data.mes.push({
          id: item.TID,
          count: item.CHANGCOUN,
          workNo: item.WORKNO,
          percentage: item.FINPER
        })
      })
      if(this.retuisshow){
          promptInfo(this, '', '报工时数量和百分比不能同时为0')
          this.hasMore = false
          this.hasMores = false
          return
      }
      let settimeId = window.setInterval(() => {
        this.timer--
        if(this.timer < 0){
          window.clearInterval(settimeId)
          this.timer = 5
        }
      },1000)
      let WorkId = this.foowwLocalStorage.get("WorkId");
      if(WorkId == data.mes[0].id){
        // this.showPopup("myPopup", '正在进行报工操作请勿重复点击')
        promptInfo(this, '', '正在进行报工操作请勿重复点击')
        this.hasMore = false
        this.hasMores = false
        return
      }
      this.ashplacing = false //置灰报工按钮
      confirmOl(data).then(res => {
        let times = new Date().getTime();
        this.foowwLocalStorage.set("WorkId", data.mes[0].id, times + 60000);//设置localStorage的值
        this.hasMore = false
        this.hasMores = false
        if (res.result.start === 200) {
          // this.showPopup("myPopup", "报工成功")
          promptInfo(this, '', '报工成功')
          this.personnelList = [] // 报工之后人员全部退出
        } else if (res.result.start == 202) {
          this.ol = data
          log(this, '报工', '关键件未绑定全,是否报全部工作量', this._submitOl)
        }else if (res.result.start == 300) {
          promptInfo(this, '', res.result.mes)
          this.personnelList = []
        } else {
          // this.showPopup("myPopup", res.result.mes)
          promptInfo(this, '', res.result.mes)
          if(res.result.mes == "MES报工成功已进入队列，待IfS完成处理后自动成功!"){
            this.personnelList = [] // 报工之后人员全部退出
          }
        }
      }).catch(err => {
        this.hasMore = false
        this.hasMores = false
        console.log(err)
        // this.showPopup("myPopup", 'MES报工成功已进入队列，待Ifs完成处理后自动成功')
        promptInfo(this, '', 'MES报工成功已进入队列，待Ifs完成处理后自动成功')
      })
    },
    // 关键件未邦全进行报工
    _submitOl() {
      this.ol.start = 2
      confirmOl(this.ol).then(res => {
        if (res.result.start === 200) {
          // this.showPopup("myPopup", "报工成功")
          promptInfo(this, '', '报工成功')
          this.personnelList = [] // 报工之后人员全部退出
        } else {
          this.showPopup("myPopup", res.result.mes)
        }
      }).catch(err => {
        console.log(err)
        this.showPopup("myPopup", process.env.WARNING_INFO)
      })
    },
    // 人员退出
    userOut(index) {
      this.personnelList.splice(index, 1)
    },
    handleMes(ticketList) {
      this.mes = ticketList
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1500)
    }
  },
  components: {
    Ticket,
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
