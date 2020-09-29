<template>
  <div>
    <v-header :title="title" ></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <tickets
            @delete-ticket="handleRemoveTicket"
            @start-change="handleTitleChange" 
            @change-isok="_changeStart"
            :list="info" 
            :operation="operation"
          ></tickets>
        </div>
        <div class="personnel-wrapper">
          <personnel 
            :list="personnelList" 
            @out="userOut"
            @user-out="handleUserStatus"
          ></personnel>
        </div>
      </div>
      <footer-oper @search="_getTicket" @read="handleRead" @readNfc="handleNfc">
        <div class="footer-btn">
          <div class="btn" @click="_changeTicketStatus('1')">开工</div>
          <div class="btn" @click="_isStop">暂停</div>
          <div class="btn" @click="_changeTicketStatus('3')">复工</div>
          <router-link tag="div" to="/not" class="btn">无票</router-link>
        </div>
      </footer-oper>
      <cube-popup type="my-popup" :mask="false" ref="myPopup">
        <div class="cube-popup-message">
          <slot>{{message}}</slot>
        </div>
      </cube-popup>
      <cube-loading v-show="hasMore" class="loading"></cube-loading>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import VHeader from 'base/v-header/v-header'
import Tickets from 'base/tickets/tickets'
import Personnel from 'base/personnel/personnel'
import FooterOper from 'base/footer-operation/footer'
import {
  getTicket,
  changeTicketStatus,
  pauseReason,
  userTimeout,
  getNfc
} from 'api/start'
import { log , promptInfo } from 'common/js/dialog'
import { distinct } from 'common/helpers/util'
import { responesMode } from 'common/js/config'

export default {
  name: 'start',
  data() {
    return {
      scrollOption: {
        scrollbar: true
      },
      userStatus: false,
      nfcCode: 'B038ED13', // 当前人员卡号
      title: '开工',
      info: [],
      message: '',
      personnelList: [],
      ticket: '',
      list: [],
      hasMore: false,
      ready: true,
      pauseList: [],
      checkList: [],
      ticketList: [],
      operation: false,
      userInfo: {
        workNo: '',
        nfcNo: ''
      },
      changeStart:''
    };
  },
  activated() {
    // 缓存钩子
    sessionStorage.setItem('hashUrl', 'start')
    this.info = this.info.slice()
    if(this.changeStart){
      this._getTicket(this.changeStart)
    }
  },
  mounted() {
    const url = this.$router.history.current.fullPath
    if (url === '/start/change') return
    this._getPausReason()
    sessionStorage.setItem('hashUrl', 'start')
    const list = this.$router.currentRoute.params.data
    if (!list) return
    const personnel = this.$router.currentRoute.params.personnel
    if (personnel) {
      this.personnelList = personnel
    }
    if (list.length) {
      this.info = list
    } else {
      // this.showPopup('myPopup', '未查询到相关工票信息')
      promptInfo(this, '', '未查询到相关工票信息')
    }
  },
  methods: {
    // 移除待开工的工票
    handleRemoveTicket(index) {
      this.info.splice(index, 1)
    },
    userOut(index) {
      this.personnelList.splice(index, 1)
      if (!this.personnelList.length) {
        this.info.forEach(item => {
          if (item.STA !== 10) {
            item.STA = 30
          }
        })
      }
    },
    // 跳转到工艺变更
    handleTitleChange() {
      // this.title = "工艺变更"
    },
    // 暂停原因列表
    _getPausReason() {
      pauseReason({}).then(res => {
        this.pauseList = res.result
      })
    },
    //解决变更局部刷新
    _changeStart(item){
      this.changeStart = item
    },
    // 工票查询
    _getTicket(ticketCode) {
      if (!ticketCode) return
      this.hasMore = true
      const data = { ticketCode: ticketCode }
      getTicket(data).then(res => {
        this.hasMore = false
        if (!res.result.ticketInfo.list) {
          // this.showPopup("myPopup", "未找到相关工票信息")
          promptInfo(this, '', '未找到相关工票信息')
          return
        }
        if (this.info.length && res.result.ticketInfo.list.length) {
          let result = []
          this.info.forEach(item => {
            result.push(item.TICKETCODE)
            if(item.TICKETCODE == res.result.ticketInfo.list[0].TICKETCODE){
              console.log(res.result.ticketInfo.list[0],'查看数据')
              item.PROCHANG = res.result.ticketInfo.list[0].PROCHANG
            }
          })
          let index = 0
          const list = res.result.ticketInfo.list
          list.forEach(item => {
            result.forEach(child => {
              if (child == item.TICKETCODE) {
                index++
              }
            })
          })
          this.hasMore = false
          if (index > 0) {
            return
          }
        }
        this.hasMore = false
        if (res.result.ticketInfo.list[0].workType === "2") {
          // this.showPopup("myPopup","该工票对应的工区属于委外，不允许开工，请送到委外工区");
          promptInfo(this, '', '该工票对应的工区属于委外，不允许开工，请送到委外工区')
          return
        }
        if (res.result.ticketInfo.list[0].STA === 40) {
          // this.showPopup('myPopup', '此工票已完工，不允许开工')
          promptInfo(this, '', '此工票已完工，不允许开工')
          return
        }
        if (res.result.start === responesMode.ERR_OK && res.result.ticketInfo.list.length) {
          if (res.result.ticketInfo.list[0].STA === 10) {
            if (this.info.length && this.info[0].STA == 10) {
              this.info = this.info.concat(res.result.ticketInfo.list)
            } else {
              this.info = res.result.ticketInfo.list
            }
          } else {
            this.info = res.result.ticketInfo.list
          }
          if (res.result.ticketInfo.userRec.length) {
            this.personnelList = []
            this.personnelList = distinct(res.result.ticketInfo.userRec, this.personnelList)
          } else {
            this.personnelList = []
          }
        }
        //this._getNfc()
      }).catch(res => {
        console.log(res)
        this.hasMore = false
        // this.showPopup("myPopup", process.env.WARNING_INFO)
        promptInfo(this, '', process.env.WARNING_INFO)
      })
    },
    _isStop() {
      if (this.info[0].STA == 10) {
        // this.showPopup('myPopup', '未开工的工票不可暂停')
        promptInfo(this, '', '未开工的工票不可暂停')
      } else {
        if (this.info[0].STA != 30) {
          this.showPicker()
        }
      }
    },
    // picker组件
    showPicker() {
      if (!this.info.length) {
        return
      }
      if (!this.picker) {
        this.picker = this.$createPicker({
          title: '暂停原因',
          data: [this.pauseList],
          selectedIndex: [0],
          alias: { value: 'parkCode', text: 'parkDesc' },
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      if (this.info.length) {
        if (this.info[0].STA !== 10) {
          this._changeTicketStatus('2', selectedVal[0], selectedText[0])
        }
      }
    },
    cancelHandle() {
      this.$createToast({
        type: 'correct',
        txt: 'Picker canceled',
        time: 1000
      }).show()
    },
    
    // 判断当前是否为人员退出操作
    handleUserStatus(status) {
      this.userStatus = status 
    },
    // 处理刷卡数据
    handleNfc(data) {
      if (this.userStatus) {
        return
      }
      this.nfcCode = data
      if (this.info.length) {
        if (this.info[0].STA === 30) {
          this._getNfc()
        } else {
          log(this, '开工', '当前为加人操作，是否继续？', this._getNfc)
        }
      } else {
        this._getTicket(this.nfcCode)
      }
    },
    _getNfc(data) {
      // 如果当前没有工票信息，扫卡添加工票
      if (!this.info.length) {
        this._getTicket(this.nfcCode)
      }
      this.hasMore = true
      let result = []
      this.info.forEach(item => {
        result.push({
          tlId: item.TID,
          workNO: item.WORKNO,
          ticketCode: item.TICKETCODE
        })
      })
      this.userInfo.nfcNo = this.nfcCode
      this.userInfo.workNo = result
      this.info[0].STA === 20 ? (this.userInfo.start = 20) : ''
      getNfc(this.userInfo).then(res => {
        this.hasMore = false
        if (res.result.code === '2') {
          // this.showPopup('myPopup', res.result.mes)
          promptInfo(this, '', res.result.mes)
          return
        }
        if (res.result.start == responesMode.ERR_OK && res.result.jobuserCode) {
          let arr = []
          arr.push(res.result)
          this.personnelList = distinct(arr, this.personnelList)
        } else if (res.result.start === responesMode.ERR_FAIL) {
          // this.showPopup('myPopup', '参数错误')
          promptInfo(this, '', '参数错误')
        } else if (!res.result.code) {
          // this.showPopup('myPopup', '未找到相关人员信息')
          promptInfo(this, '', '未找到相关人员信息')
          return
        } else {
          // this.showPopup('myPopup', '请求失败')
          promptInfo(this, '', '请求失败')
          return
        }
      })
        .catch(err => {
          console.log(err)
          this.hasMore = false;
          // this.showPopup("myPopup", process.env.WARNING_INFO)
          promptInfo(this, '', process.env.WARNING_INFO)
        });
    },
    // 变更工票状态
    _changeTicketStatus(status, reasonCode, reasonDesc) {
      if (!this.info.length) {
        return
      }
      this.ready = false
      let isChange = false // 是否存在变更
      this.info.forEach(item => {
        if (item.PROCHANG == 1) {
          isChange = true
        }
      });
      if (isChange) {
        // this.showPopup('myPopup', '存在变更信息的工票，请处理变更信息,再开工')
        promptInfo(this, '', '存在变更信息的工票，请处理变更信息,再开工')
        return
      }
      if (!this.checkList.length) {
        this.info.forEach(item => {
          this.checkList.push({
            tlId: item.TID,
            workNO: item.WORKNO,
            ticketCode: item.TICKETCODE
          })
        })
      }
      this.checkList.findIndex(item => {
        this.info.forEach(child => {
          this.ticketList.indexOf(child.TICKETCODE) < 0 ? this.ticketList.push(child.TICKETCODE) : ''
          if (this.ready) return
          if (item.tlId === child.TID) {
            if (status === '1') {
              if (child.STA !== 10) {
                // this.showPopup('myPopup', '当前工票已开工,请勿重复开工')
                promptInfo(this, '', '当前工票已开工,请勿重复开工')
                this.ready = true;
              }
            } else if (status === '2') {
              if (child.STA !== 20) {
                // this.showPopup('myPopup', '存在非开工状态的工票')
                promptInfo(this, '', '存在非开工状态的工票')
                this.ready = true
              }
            } else {
              if (child.STA !== 30) {
                // this.showPopup('myPopup', res.result.mes)
                promptInfo(this, '', res.result.mes)
                this.ready = true
              }
            }
          }
        })
      })
      if (this.ready) return
      if (!this.personnelList.length) {
        // this.showPopup('myPopup', '请先添加人员')
        promptInfo(this, '', '请先添加人员')
        return
      }
      if(status =='3' || status == '2'){
        getTicket({ ticketCode: this.ticketList[0] }).then(res => {
              this.info = res.result.ticketInfo.list
              this.personnelList = []
              this.personnelList = res.result.ticketInfo.userRec
              // this.personnelList = distinct(
              //     this.personnelList,
              //     res.result.ticketInfo.userRec
              //   ) 
          
      const data = {
        start: status,
        parkCode: reasonCode,
        parkDesc: reasonDesc,
        workNo: this.checkList,
        userRec: this.personnelList
      };
      changeTicketStatus(data).then(res => {
        this.checkList = [];
        if (res.result.start === responesMode.ERR_OK) {
          this.operation = true;
          this.showPopup('myPopup')
          getTicket({ ticketCode: this.ticketList[0] }).then(res => {
            this.ticketList = []
            this.info = []
            this.personnelList = []
              // this.info = res.result.ticketInfo.list
              // this.personnelList = []
              // this.personnelList = distinct(
              //     this.personnelList,
              //     res.result.ticketInfo.userRec
              //   ) 
          })
          setTimeout(() => {
            this.operation = false
          }, 1500)
        } else {
          // this.showPopup('myPopup', res.result.mes)
          promptInfo(this, '', res.result.mes)
        }
      })
        .catch(err => {
          this.checkList = []
          // this.showPopup("myPopup", process.env.WARNING_INFO)
          promptInfo(this, '', process.env.WARNING_INFO)
        })
      })
      }else{
        const data = {
        start: status,
        parkCode: reasonCode,
        parkDesc: reasonDesc,
        workNo: this.checkList,
        userRec: this.personnelList
      };
      changeTicketStatus(data).then(res => {
        this.checkList = [];
        if (res.result.start === responesMode.ERR_OK) {
          this.operation = true;
          this.showPopup('myPopup')
          getTicket({ ticketCode: this.ticketList[0] }).then(res => {
            this.ticketList = []
            this.info = []
            this.personnelList = []
              // this.info = res.result.ticketInfo.list
              // this.personnelList = []
              // this.personnelList = distinct(
              //     this.personnelList,
              //     res.result.ticketInfo.userRec
              //   ) 
          })
          setTimeout(() => {
            this.operation = false
          }, 1500)
        } else {
          // this.showPopup('myPopup', res.result.mes)
          promptInfo(this, '', res.result.mes)
        }
      })
        .catch(err => {
          this.checkList = []
          // this.showPopup("myPopup", process.env.WARNING_INFO)
          promptInfo(this, '', process.env.WARNING_INFO)
        })
      }
      
    },
    handleRead(data) {
      this._getTicket(data)
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 3000)
    }
  },
  components: {
    Tickets,
    Personnel,
    FooterOper,
    VHeader
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
.cube-my-popup
  .cube-popup-message
    color: #fff;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8)

</style>
