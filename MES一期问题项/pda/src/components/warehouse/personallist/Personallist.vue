<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <div>
      <cube-tab-bar v-model="selectedLabel"
                    class="cube_tab_bar"
                    show-slider
                    :use-transition="disabled"
                    :data="tabLabels">
      </cube-tab-bar>
       <div>
        <cube-slide
          :loop="loop"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          :initial-index="initialIndex"
          @change="changePage"
         >
          <cube-slide-item >
               <cube-scroll class="scroll-wrapper" :options="scrollOptions">
               <div class="personallist" v-for="(item,index) in personal_syes_list" v-bind:key="item.id">
        <ul class="personal_for">
          <li class="personal_item">
            <span class="personal_sp" v-if="item.handoverType === 2">MR号:{{item.mrCode}}</span>
            <span class="personal_sp" v-else-if="item.handoverType === 1">SO订单号:{{item.orderNo}} </span>      
            <span class="personal_sp">项目号:{{item.projectCode}}</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp">工区:{{item.workCenterNo}}</span>
           <span class="personal_sp">种类:{{item.categoryCount}}</span>
          </li>
          <li class="personal_item">
            <span class="personal_sp">集料单号:{{item.aggregateCode}}</span>
           <span class="personal_sp">创建时间:{{item.createTime}}</span>
          </li>
          </ul>
          <div class="img_div" @click.stop="router(item.aggregateCode, item.handoverType)">
            <img v-if="item.confirmationStatus==0" class="image" src="@/components/warehouse/personallist/double.png" alt="">
            <img v-else-if="item.confirmationStatus==1" class="image" src="@/components/warehouse/personallist/single.png" alt="">
          </div>
          <div class="div_text personal_for">
          <li class="personal_item">
           <span class="personal_sp1">交接信息:</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp1">{{item.hairFeedInfo}}</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp1">{{item.receivingInfo}}</span>
          </li>
          <div class="div_cilck">
            <!-- <img  class="images" src="@/components/warehouse/personallist/double.png" alt=""> -->
            <img v-if="show_print" @click.stop="print(item.aggregateCode,item.handoverType)" class="images" src="@/components/warehouse/personallist/prints.png" alt="">
            <img v-else-if="!show_print" class="images" src="@/components/warehouse/personallist/prints_no.png" alt="">
            <img @click.stop="delete_list(item.handoverType, item.aggregateCode, index,0)" class="images" src="@/components/warehouse/personallist/delete.png" alt="">
          </div>
          </div>
      </div>
               </cube-scroll>
          </cube-slide-item>
            <cube-slide-item >
               <cube-scroll class="scroll-wrapper" :options="scrollOptions">
                       <div class="personallist" v-for="(item,index) in personal_sno_list" v-bind:key="item.id">
        <ul class="personal_for">
          <li class="personal_item">
            <span class="personal_sp" v-if="item.handoverType === 2">MR号:{{item.mrCode}}</span>
            <span class="personal_sp" v-else-if="item.handoverType === 1">SO订单号:{{item.orderNo}} </span>      
            <span class="personal_sp">项目号:{{item.projectCode}}</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp">工区:{{item.workCenterNo}}</span>
           <span class="personal_sp">种类:{{item.categoryCount}}</span>
          </li>
          <li class="personal_item">
            <span class="personal_sp">集料单号:{{item.aggregateCode}}</span>
           <span class="personal_sp">创建时间:{{item.createTime}}</span>
          </li>
          </ul>
          <div class="img_div" @click.stop="router(item.aggregateCode, item.handoverType)">
            <img v-if="item.confirmationStatus==0" class="image" src="@/components/warehouse/personallist/double.png" alt="">
            <img v-else-if="item.confirmationStatus==1" class="image" src="@/components/warehouse/personallist/single.png" alt="">
          </div>
          <div class="div_text personal_for">
          <li class="personal_item">
           <span class="personal_sp1">交接信息:</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp1">{{item.hairFeedInfo}}</span>
          </li>
          <li class="personal_item">
           <span class="personal_sp1">{{item.receivingInfo}}</span>
          </li>
          <div class="div_cilck">
            <!-- <img  class="images" src="@/components/warehouse/personallist/double.png" alt=""> -->
            <img v-if="show_print" @click.stop="print(item.aggregateCode,item.handoverType)" class="images" src="@/components/warehouse/personallist/prints.png" alt="">
            <img v-else-if="!show_print" class="images" src="@/components/warehouse/personallist/prints_no.png" alt="">
            <img @click.stop="delete_list(item.handoverType, item.aggregateCode, index,1)" class="images" src="@/components/warehouse/personallist/delete.png" alt="">
          </div>
          </div>
      </div>
               </cube-scroll>
          </cube-slide-item>
         </cube-slide>
        </div>
     </div>
      <div class="personal_btn">
        <cube-button class="btn_style" :primary="true" @click="close">关闭</cube-button>
     </div>
     <div class="div_x"> </div>
    <div class="div_yes_text">{{personal_syes}} </div>
     <div class="div_no_text">{{personal_sno}} </div>
     <div class="div_l">
            <img  class="images" src="@/components/warehouse/personallist/double.png" alt="">
        </div>
     <div class="div_y">
            <img  class="images" src="@/components/warehouse/personallist/single.png" alt="">
        </div>
  </div>
</template>
<script>
import VHeader from 'base/warehouseheader/Header'
import { findIndex } from 'common/helpers/util'
import { getquerypersonalhandoverinfo, getprintsobjbyaggregatecodelist, getPrintmrjlbyaggregatecodelist, getdeleteaggregate } from 'common/js/httpConnection'
export default {
  data () {
    return {
      msg: '个人交接记录',
      add_number: '', // 缓存code
      aggregateCode: '', // 集料单
      personal_syes: '', // 仓库未交接数量
      personal_sno: '', // 生产未交接数量
      handoverType: '', // 类型
      show_print: true,
      personal_syes_list: [], // 仓库未交接展示列表集合
      personal_sno_list: [], // 生产未交接展示列表集合
      personal_list: [], 
      selectedLabel: '仓库未交接',
      tabLabels: [{
        label: '仓库未交接'
      }, {
        label: '生产未交接'
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
  components: {
    VHeader
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
      this.selectedLabel = this.tabLabels[current].label
      if (current === 1) {
       
      } else {
        
      }
    },
     // 组合数据
    _foreachdata(list,type){
      let listdata = []
      list.forEach(item => {
        if(item.confirmationStatus === type){
          listdata.push(item)
        }
      });
      return listdata
    },
    // 请求数据
    getrequst () {
      this.add_number = sessionStorage.getItem('usercode')
      this.showIndicator(this)
      // var datas = {'nfccode': this.add_number}
      getquerypersonalhandoverinfo().then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.personal_list = response.result
        this.personal_syes_list=this._foreachdata(this.personal_list,0)
        this.personal_sno_list=this._foreachdata(this.personal_list,1)
        let yes=this.personal_syes_list.length
        // if(this.personal_syes_list.length!=0) {
          this.personal_syes='（'+this.personal_syes_list.length+'）'
        // }
        // if(this.personal_sno_lis.length!=0){
          this.personal_sno='（'+this.personal_sno_list.length+'）'
        // }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 跳转界面
    router(data, type) {
      let routers = ''
      if (type === 2) {
        routers = 'MRHandover'
      } else if (type === 1) {
        routers = 'SOHandover'
      }
      this.$router.push({
        name: routers,
        params: {
          datas: data
        }
      })
    },
    // 打印数据
    print(data, type) {
      this.aggregateCode = data
      this.handoverType = type
      this.show_print = false
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission)
      this.timeout_Submission = setTimeout(() => {
        this.show_print = true
      }, 5000)
    },
    // 补打MR集料标签
    _getPrintmrjlbyaggregatecodelist (data) {
      this.showIndicator(this)
      let datas = []
      datas.push(data)
      getPrintmrjlbyaggregatecodelist(datas).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          this.getclose()
          return
        }
        if (response.status === 1) {
          this.getstartPrint(response.result)
        }
      }).catch((error) => {
        this.getclose()
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 补打SO集料标签
    _getprintsobjbyaggregatecodelist (data) {
      let datas = []
      datas.push(data)
      this.showIndicator(this)
      getprintsobjbyaggregatecodelist(datas).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          this.getclose()
          return
        }
        if (response.status === 1) {
          this.getstartPrint(response.result)
        }
      }).catch((error) => {
        this.getclose()
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 删除数据
    delete_list (type, data, index, types) {
      this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否确定删除',
        confirmBtn: {
          text: '确定',
          active: true,
          disabled: false,
        },
        cancelBtn: {
          text: '取消',
          active: false,
          disabled: false,
        },
        onConfirm: () => {
          let datas = []
          datas.push(data)
          this.showIndicator(this)
          getdeleteaggregate(type, datas).then((response) => {
            this.closeIndicator()
            this.showToast(this, response.errorMsg)
            if (response.status === 0) {
              return
            }
            if (types === 0) {
              this.$delete(this.personal_syes_list, index)
            } else {
              this.$delete(this.personal_sno_list, index)
            }
          }).catch((error) => {
            this.closeIndicator()
            console.log(error)
            if (error=== 307 || error=== 900 || error=== 403) return
            this.showToast(this, '请求数据失败')
          })
        }
      }).show()
    },
    // 关闭
    close () {
      this.$router.back()
    },
    // 调打印机
    getstartPrint(data) {
      clearTimeout(this.timeout_pint)
      this.timeout_pint = setTimeout(() => {
        $App.callPrint(data)
      }, 500)
    },
    // 关闭打印连接
    getclose() {
      clearTimeout(this.timeoutclose)
      this.timeoutclose = setTimeout(() => {
        $App.callcolsePrint()
      }, 500)
    },
    beCalledBLSuccess(data) {
      if (this.handoverType === 2) {
        this._getPrintmrjlbyaggregatecodelist(this.aggregateCode)
      } else if (this.handoverType === 1) {
        this._getprintsobjbyaggregatecodelist(this.aggregateCode)
      }
    }
  },
  mounted () {
    window.beCalledBLSuccess = this.beCalledBLSuccess
    this.getrequst()
  }
}
</script>
<style lang="stylus" scoped>
.cube_tab_bar
 height 45px
 margin-left 10px
 margin-right 10px
 margin-top 5px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 background #9acafb
.div_x
 position absolute
 top 55px
 left 50%
 width 1px
 height 25px
 background #eeeeee
.div_yes_text
 position absolute
 top 60px
 left 35%
 width 30px
 height 25px
.div_no_text
 position absolute
 top 60px
 left 82%
 width 30px
 height 25px
.div_l
 position absolute
 top 55px
 left 8%
 width 25px
 height 25px
.div_y
 position absolute
 top 55px
 left 55%
 width 25px
 height 25px
.scroll-wrapper
  height: 490px
.personal_for
 margin-left 10px
 margin-right 10px
 margin-top 5px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius 5px 5px  0 0
 height auto
 padding-bottom 4px
 background #ecf8ff
.div_text
  margin-top 0px
  border-radius 0 0 5px 5px
  background #ffffff
  padding-bottom 4px
.personal_item
  display flex
  align-items center
  margin-left 10px
  margin-right 10px
  margin-top 5px
  font-size 12px
  overflow hidden
  .personal_sp
   padding-top 2px
   overflow hidden
   text-overflow ellipsis
   white-space nowrap
   width 50%
  .personal_sp1
   padding-top 2px
.personal_btn
  position absolute
  top 590px
  left 10px
  right 10px
  .btn_style
   height 10px
   line-height 1px
.personallist
 position relative
.img_div
 position absolute
 top 0px
 right 40px
 .image
  width 25px
  height 25px

.div_cilck
 display flex
 margin-left 10px
 margin-right 1px
 justify-content flex-end
.images
  width 25px
  height 25px
  margin-right 10px
</style>
