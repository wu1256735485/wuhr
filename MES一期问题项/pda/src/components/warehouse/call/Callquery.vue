<template>
  <div>
    <div class="call_popup" v-show="show">
     <div class="call_header">
       <div class="call_back" @click.stop="fish()"></div>
     </div>
     <div class="call_bodys">
        <div class="query_div">
          <span class="query_sp2">班&nbsp;&nbsp;&nbsp;&nbsp;组:&nbsp;{{teamGroupNames}}</span>
          <span class="query_sp1">
             <cube-button class="btn_styles" :inline="true" :primary="true" @click="getquery_apply()">查询</cube-button>
          </span>
        </div>
         <div class="query_div">
           <span class="query_sp">工&nbsp;&nbsp;&nbsp;&nbsp;区:&nbsp;
             <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="query_workarea"
                @change="changeworkarea(query_workarea)"
                :title="'工区'"
                :options="query_optionsworkarea"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
            </span>
            <span class="query_sp">项目号:&nbsp;
             <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="query_project_ub"
                @change="changeproject_ub(query_project_ub)"
                :title="'项目号'"
                :options="query_optionsproject_ub"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
           </span>
         </div>
        </div>
        <div class="cube_margintop"></div>
        <div class="div_body">
         <cube-tab-bar v-model="selectedLabel"
                    class="cube_tab_bar"
                    show-slider
                    :use-transition="disabled"
                    :data="tabLabels">
         </cube-tab-bar>
         <cube-slide
          :loop="loop"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          :initial-index="initialIndex"
          @change="changePage"
          >
          <cube-slide-item >
               <cube-scroll class="scroll_wrapper" :options="scrollOptions" >
                <div class="div_for" v-for="(item) in listdatano" v-bind:key="item.id">
                <ul>
                  <li class="call_item">
                    <span class="li_sp">零件号:{{item.partNo}}</span>
                     </li> <li class="call_item">
                    <span class="li_sp" @click.stop="showmaterial('零件描述',item.partName)">件描述:{{item.partName}}</span>
                  </li>
                  <li class="call_item">
                    <span class="li_sp">需求数量:{{item.applyAmount}}</span>
                    <span class="li_sp">预留数量:{{item.resrvedAmount}}</span>
                  </li>
                  <li class="call_item">
                    <span class="li_sp">发料数量:{{item.shippedAmount}}</span>
                    <span class="li_sp">申请日期:{{item.timeStart}}</span>
                  </li>
                   <li class="call_item">
                    <span class="li_sp" @click.stop="showmaterial('INV反馈',item.ckRemark)" >INV反馈:{{item.ckRemark}}</span>
                  </li>
                </ul>
                </div>
                </cube-scroll>
          </cube-slide-item>
            <cube-slide-item >
               <cube-scroll class="scroll_wrapper" :options="scrollOptions">
                <div class="div_for" v-for="(item) in listdatayes" v-bind:key="item.id">
                <ul>
                  <li class="call_item">
                    <span class="li_sp">零件号:{{item.partNo}}</span>
                  </li> <li class="call_item">
                    <span class="li_sp" @click.stop="showmaterial('零件描述',item.partName)">件描述:{{item.partName}}</span>
                  </li>
                  <li class="call_item">
                    <span class="li_sp">需求数量:{{item.applyAmount}}</span>
                    <span class="li_sp">预留数量:{{item.resrvedAmount}}</span>
                  </li>
                  <li class="call_item">
                    <span class="li_sp">发料数量:{{item.shippedAmount}}</span>
                    <span class="li_sp">申请日期:{{item.timeStart}}</span>
                  </li>
                  <li class="call_item">
                    <span class="li_sp" @click.stop="showmaterial('INV反馈',item.ckRemark)">INV反馈:{{item.ckRemark}}</span>
                  </li>
                </ul>
                </div>
               </cube-scroll>
          </cube-slide-item>
         </cube-slide>
        </div>
        <div class="div_x"> </div>
       <div class="call_btn">
       <cube-button class="btn_style" :primary="true" @click="back()">申请</cube-button>
      </div>
      </div>
  </div>
</template>
<script>
import { selectInitialization, selectByPartMes, getselectByMes } from 'api/call'
import { findIndex } from 'common/helpers/util'
import { getNfc } from 'api/materials'
export default {
   data () {
      return {
        teamGroupNames:'',
        show: true,
        nfcflage: false,
        data_text: '',
        listdatano: [],
        listdatayes: [],
        query_workarea: '', // 工区
        query_project_ub: '', // 项目号
        query_optionsworkarea: [], // 工区数组
        query_optionsproject_ub: [], // 项目号数组
        bz_flage: true,// 班组标识
        input_Image: {
        backgroundImage:
          'url(' +
          require('@/components/warehouse/pOstorage/inputbg.png') +
          ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      },
      selectedLabel: '未发料',
      tabLabels: [{
        label: '未发料'
      }, {
        label: '已全部发料'
      }],
      loop: false,
      disabled: false,
      autoPlay: false,
      showDots: false,
      currents: 0,
      slideOptions: {
        listenScroll: true,
        probeType: 2,
        directionLockThreshold: 0
      },
      scrollOptions: {
        directionLockThreshold: 0,
        click: false
      }
      }
   },
   computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
   methods: {
     changePage (current) {
      this.currents =current
      this.selectedLabel = this.tabLabels[current].label
      if (!this.bz_flage) {
        return
      }
       this._query_data(this.currents)
    },
     showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    fish () {
     this.$router.back()
    },
    back () {
      if (!this.bz_flage) {
        this.showToast(this, '登录人无班组信息,不能执行此操作')
        return
      }
      if (!this.nfcflage) {
        this.showToast(this, '请刷卡,再申请')
        return
      }
      window.beCalledNfc = ''
      this.show = false
      this.nfcflage = false
      this.$parent.nfc(this.data_text)
    },
    callshow () {
      window.beCalledNfc = this.beCalledNfc
     this.show = true
    },
    // 工区
    changeworkarea (value) {
      this.query_workarea = value
    },
    // 项目号
    changeproject_ub (value) {
      this.query_project_ub = value
    },
    // 组合数据
    _query_foreachdata(list){
      let listdata = []
      list.forEach(item => {
        listdata.push(item.code)
      });
      return listdata
    },
    // 工区检索
    _searcharea () {
      selectInitialization().then(res => {
        if (res.start === 201) {
          this.showToast(this, res.mes)
          this.bz_flage = false
          return
        }
        if (res.start !== 200) {
          this.showToast(this, '请求数据失败')
          return
        }
        this.teamGroupNames = res.teamGroupName
        this.query_optionsworkarea = this._query_foreachdata(res.conter)
        this.query_optionsproject_ub = this._query_foreachdata(res.project)
        this.query_workarea = this.query_optionsworkarea[0]
        this.query_project_ub = this.query_optionsproject_ub[0]
      })
      .catch(error => {
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    getquery_apply () {
      if (!this.bz_flage) {
        this.showToast(this, '登录人无班组信息,不能执行此操作')
        return
      }
      this._query_data(this.currents)
    },
    // 组合数据
    _foreachdata(list) {
      let newlist = []
      list.forEach( item => {
        let obj = {}
        obj.materialCode = item.partNo
        obj.materialName = item.partName
        obj.unitName = item.companyCode
        obj.itemChecked = false
        obj.isDisabled = true
        newlist.push(obj)
      })
      return newlist
    },
    // 获取数据
    _query_data (data) {
      this.showIndicator(this)
      var datas = { source:"pda", issuefinish: data, workCenter : this.query_workarea , projectId : this.query_project_ub, pageNo: 1, pageSize: 20}
      getselectByMes(datas).then(response => {
          this.closeIndicator()
          if (response.start !== 200) {
            this.showToast(this, '请求数据失败')
            return
          }
          if (response.list.length === 0 ) {
            this.showToast(this, '未查询到数据')
          }
          if (data === 0) {
            this.listdatano = response.list
          }else {
            this.listdatayes = response.list
          }
      })
      .catch(error => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    beCalledNfc (data){
      getNfc({nfcNo:data}).then((res) => {
        if(res.status == '200'){
          this.data_text = res.result.mes.NAMECODE
          this.nfcflage = true
          this.showToast(this, '刷卡成功')
        }else{
          this.showToast(this, '未找到人员信息')
        }
      })
      
    }
   },
   mounted() {
     this._searcharea()
     window.beCalledNfc = this.beCalledNfc
   },
   beforeDestroy () {
     window.beCalledNfc = ''
   }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.call_popup
 position absolute
 top 0px
 bottom 0px
 right 0px
 left 0px
 z-index 99
 .call_header
  width 100%
  height 40px
  .call_back
   height 40px
   width 70px
 .call_bodys
  margin-left 7px
  margin-right 7px
  margin-top 5px
  padding-bottom 5px
  padding-top 5px
  height auto
  border 1px solid rgba(0,0,0,0.1)
  border-radius 5px
  background #fff
  background #9acafb
  .query_div
   display flex
   margin-left 10px
   margin-right 10px
   align-items center
   overflow hidden
   .query_sp
    margin-top 5px
    width 50%
    display flex
    align-items center
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
    .cube_put
     border-radius 10px
     width 60%
     height 22px
     background none
     line-height 2px
     overflow hidden
     text-overflow ellipsis
     white-space nowrap
   .query_sp1
    width 15%
    display flex
    justify-content flex-end
   .query_sp2
    width 85%
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.cube_margintop
 height 5px
 margin-left 7px
 margin-right 7px
 background #fff

.cube_tab_bar
 height 40px
 margin-left 7px
 margin-right 7px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 background #9acafb
.div_x
 position absolute
 top 120px
 left 50%
 width 1px
 height 30px
 background #eeeeee

.div_body
  background #fff
  position absolute
  top 114px
  right 1px
  left 1px
  bottom 90px


.scroll_wrapper
  font-size 14px
  padding-left 10px
  padding-right 10px
  font-size 14px
  .div_for
    margin-top 5px
    position relative
    height auto
    padding-bottom 5px 
    border 1px solid rgba(0,0,0,0.1)
    border-radius 5px
    .call_item
      margin-top 5px
      margin-left 10px
      margin-right 10px
      display flex
      justify-content start
      align-items center
      overflow hidden
      .li_sp
        flex 1
        justify-content start
        align-items center
        padding-top: 2px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap

.call_btn
 position absolute
 right 10px
 left 10px
 bottom 5px
 .btn_style 
  width 100%
  height: 10px
  line-height: 1px

.btn_styles 
 background: #3A85E6
 height: 25px
 line-height: 1px

</style>