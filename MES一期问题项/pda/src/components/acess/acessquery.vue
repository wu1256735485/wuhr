<template>
  <div>
    <div class="acessquery_popup" v-show="show">
     <div class="acessquery_header">
       <div class="acessquery_back" @click.stop="back"></div>
     </div>
     <div class="acessquery_bodys">
      <span class="acessquery_sp">订单号:
        <input
          class="sp_input"
          style="width:75%; height: 25px;"
          v-model="data_text"
         />
      </span>
      <span class="acessquery_sp1">
        <cube-button class="btn_styles" :inline="true" :primary="true" @click="getapply()">查询</cube-button>
        </span>
     </div>
     <div class="div_body">
        <cube-scroll class="scroll_wrapper" :data="listdata" ref="scroll">
        <div class="div_for" v-for="(item,index) in listdata" v-bind:key="item.id"  @click.stop="click_item(index)">
          <div class="div_image">
            <img class="image_items" v-show="item.Checkeds" src="@/components/warehouse/pOstorage/yes.png"/>
          </div>
        <ul>
          <li class="acessquery_item">
            <span class="li_sp">零件号:{{item.partNo}}</span>
            <span class="li_sp">类型:{{item.ifsType}}</span>
          </li>
           <li class="acessquery_item">
            <span class="li_sp" @click.stop="showmaterial('件描述',item.materialName)">零件描述:{{item.partDescribe}}</span>
          </li>
          <li class="acessquery_item">
            <span class="li_sp">入库数量({{item.finishQty}}/{{item.requiredQty}}):{{item.qtyReceived}}</span>
            <span class="li_sp">库位:{{item.locationCode}}</span>
          </li>
          <li class="acessquery_item">
            <span class="li_sp">条件代码:{{item.conditionCode}}</span>
            <span class="li_sp">里程数:{{item.operationalData}}</span>
          </li>
          <li class="acessquery_item">
            <span class="li_sp">处置代码:{{item.dispositionCode}}</span>
            <span class="li_sp">报废原因:{{item.scrapReasonName}}</span>
          </li>
           <li class="acessquery_item">
            <span class="li_sp">序列号:{{item.serialNo}}</span>
          </li>
           <li class="acessquery_item">
            <span class="li_sp">批次号:{{item.lotBatchNo}}</span>
          </li>
        </ul>
        </div>
        </cube-scroll>
      </div>
       <div class="acessquery_btn">
       <cube-button class="btn_style" :disabled="btn_disable" :primary="true" @click="getyes()">打印收料标签</cube-button>
      </div>
      </div>
  </div>
</template>
<script>
import { queryworkorderinstockrecordlist } from 'api/acess'
export default {
   data () {
      return {
        show: false,
        data_text: '',
        btn_disable: false, // 禁用按键
        listdata: []
      }
   },
   methods: {
     showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    back () {
      this.show = false
    },
    acessqueryshow (data) {
     this.data_text = ''
     this.listdata=[]
     this.show=true
     if (!data) return
     this.listdata=this._foreachdata(data)
    },
    // 判断选中
    click_item(index) {
      if (this.listdata[index].Checkeds) {
        this.listdata[index].Checkeds = false
      } else {
        this.listdata[index].Checkeds = true
      }
    },
    // 选中数据
    _filter (list) {
      let selectRows = []
      selectRows= list.filter(item => {
       return item.Checkeds
      })
      if (selectRows.length === 0) {
        selectRows = list
      }
      return selectRows
    },
    getyes() {
      this.btn_disable = true
      let newlist = this._filter(this.listdata)
      this.$parent._getprint(newlist)
    },
    _setdisable() {
       this.btn_disable = false
    },
    getapply () {
      this._projectdata(this.data_text)
    },
    // 组合数据
    _foreachdata(list) {
      list.forEach( item => {
        // item.Checkeds = false
        this.$set(item, 'Checkeds', false)
      })
      return list
    },
    // 获取数据
    _projectdata (data) {
      if (!data) {
       this.showToast(this, '请输入订单号')
       return
      }
      this.listdata=[]
      this.showIndicator(this)
      var datas = { workno: data }
      queryworkorderinstockrecordlist(datas).then(response => {
        this.closeIndicator()
        if (response.status !== 1) {
          this.showToast(this, response.errorMsg)
          return
        }
        if (response.result.length === 0) {
          this.showToast(this, '无数据')
          return
        }
        // this.listdata=response.result
        console.log(response.result)
        this.listdata=this._foreachdata(response.result)
      })
      .catch(error => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
   }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.acessquery_popup
 position absolute
 top 0px
 bottom 0px
 right 0px
 left 0px
 z-index 99
 .acessquery_header
  width 100%
  height 45px
  .acessquery_back
   height 40px
   width 70px
 .acessquery_bodys
  display flex
  justify-content start
  align-items center
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
  .acessquery_sp
   margin-left 10px
   margin-right 10px
   width 85%
  .acessquery_sp1
   width 15%
   margin-left 10px
   margin-right 10px

 .div_body
  background #fff
  position absolute
  top 87px
  right 10px
  left 10px
  bottom 44px
  font-size 14px
  .scroll_wrapper
   height 100%
   width 100%
   .div_for
    margin-top 5px
    position relative
    height auto
    padding-bottom 5px 
    border 1px solid rgba(0,0,0,0.1)
    border-radius 5px
    .acessquery_item
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
      padding-top 2px
      overflow hidden
      text-overflow ellipsis
      white-space nowrap

.acessquery_btn
 position absolute
 right 10px
 left 10px
 bottom 5px
 .btn_style 
  width 100%
  height: 10px
  line-height: 1px


.img_edit 
  width: 15px
  height: 15px
  margin-left: 5px

.btn_styles 
 background: #3A85E6

 height: 25px
 line-height: 1px

.div_image 
  position absolute
  top 5px
  right 5px
  .image_items 
   width 20px
   height 20px
</style>