<template>
  <div>
    <v-header :title="'序列号件'" @back="handleBack"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <match-list
            :ticketInfo="ticketInfo"
            :ticketDet="ticketDet"
            @match="handleIndex"
            @check="handleCheck"
          ></match-list>
          <search-list :list="ticketDet" :matchCode="matchCode" @xlh="handleCheckXlh"></search-list>
        </div>
      </div>
      <footer-oper @search="_getMaterials" @read="handleMatch">
        <div class="footer-btn">
          <div class="btn" @click.stop="_binding">确定</div>
        </div>
      </footer-oper>
      <cube-popup type="my-popup" :mask="false" ref="myPopup">
        <div class="cube-popup-message">
          <slot>{{message}}</slot>
        </div>
      </cube-popup>
    </div>
  </div>
</template>

<script>
import MatchList from './match-list';
import SearchList from 'components/search-list/search-list';
import VHeader from 'base/v-header/v-header';
import FooterOper from 'base/footer-operation/footer';
import { mapGetters, mapMutations } from 'vuex';
import { getMaterials, binding } from 'api/match';
import { responesMode } from 'common/js/config';
import { log } from 'common/js/dialog';

export default {
  data() {
    return {
      item: '',
      message: '',
      params: '',
      ticketCode: '',
      detail: [],
      ticketDet: [],
      checkList: [],
      options: [],
      ticketInfo: {},
      currentIndex: -1,
      matchCode: '' // 序列号编码
    };
  },
  created() {
    if (!this.$router.currentRoute.params.ticketCode) return;
    this.params = this.$router.currentRoute.params.ticketCode;
    if (this.params) {
      this._getMaterials(this.params);
    }
  },
  computed: {
    ...mapGetters(['matchXlhStatus'])
  },
  methods: {
    // 扫描工票查询序列号
    handleMatch(data) {
      if (!data) {
        this.showPopup('myPopup', '未扫描到工票信息');
        return;
      }
      this._getMaterials(data);
    },
    // 查询物料相关
    _getMaterials(code) {
      getMaterials({ ticketCode: code }).then(res => {
        if (res.result.start === responesMode.ERR_OK) {
          this.ticketList = [];
          if (!res.result.ticketInfo) {
            this.showPopup('myPopup', '未找到相关工票信息');
            return;
          }
          this.ticketInfo = res.result.ticketInfo;
          if (res.result.ticketDet) {
            this.ticketDet = res.result.ticketDet;
          }
        }
      });
    },
    // 绑定序列号
    _binding() {
      if (!this.checkList.length) {
        log(this, '序列号', '是否确定调整序列号？', this.binds);
      } else {
        this.binds();
      }
    },
    binds() {
      if (this.checkList.length) {
        this.checkList.forEach(item => {
          this.ticketDet.forEach(child => {
            if (item === child.MHDID) {
              if(child.XLHS){
                this.detail.push({
                mhdId: child.MHDID,
                sncode: child.XLHS
                });
              }else{
                this.detail.push({
                mhdId: child.MHDID,
                sncode: child.XLH
                });
              }
              
            }
          });
        });
      } else {
        this.ticketDet.forEach(child => {
          if(child.XLHS){
           this.detail.push({
            mhdId: child.MHDID,
            sncode: child.XLHS
            }); 
          }else{
            this.detail.push({
            mhdId: child.MHDID,
            sncode: child.XLH
            }); 
          }
          
        });
      }
      binding({ detail: this.detail, tid: this.ticketInfo.TID }).then(res => {
        if (res.result.start === 200) {
          this.showPopup('myPopup');
        } else {
          this.showPopup('myPopup', res.result.mes);
        }
      });
    },
    // 处理序列号显示或隐藏
    handleBack() {
      if (this.matchXlhStatus) {
        this.setMatchStatus(false);
      }
    },
    // 选中序列号
    handleCheck(list) {
      this.checkList = list;
    },
    // 序列号下标
    handleIndex(index) {
      // 获取当前选中序列号的下标并且取到当前物料编码
      this.matchCode = this.ticketDet[index].MACODE;
      this.currentIndex = index;
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 2000);
    },
    // 搜索选中序列号
    handleCheckXlh(obj) {
      this.$set(this.ticketDet[this.currentIndex],'XLHS',obj.snCode)
    },
    // 取消选中
    cancelSelected(val) {
      console.log(val);
    },
    ...mapMutations({
      setMatchStatus: 'SET_MATCHXLH_STATUS'
    })
  },
  components: {
    MatchList,
    FooterOper,
    VHeader,
    SearchList
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.cube-my-popup {
  .cube-popup-message {
    color: #fff;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>