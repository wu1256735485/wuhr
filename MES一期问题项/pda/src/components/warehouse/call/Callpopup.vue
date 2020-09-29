<template>
  <div>
    <div class="call_popup" v-show="show">
     <div class="call_header">
       <div class="call_back" @click.stop="back"></div>
     </div>
     <div class="call_bodys">
      <span class="call_sp">
        <input
          class="sp_input"
          style="width:100%; height: 25px;"
          v-model="data_text"
         />
      </span>
      <span class="call_sp1">
        <cube-button class="btn_styles" :inline="true" :primary="true" @click="getapply()">查询</cube-button>
        </span>
     </div>
     <div class="div_body">
        <cube-scroll class="scroll_wrapper" :data="listdata" ref="scroll">
        <div class="div_for" v-for="(item,index) in listdata" v-bind:key="item.id"  @click.stop="click_item(index)">
          <div class="div_image">
            <img class="image_items" v-show="item.itemChecked" src="@/components/warehouse/pOstorage/yes.png"/>
          </div>
        <ul>
          <li class="call_item">
            <span class="li_sp">件号:{{item.materialCode}}</span>
            <span class="li_sp">公司:{{item.unitName}}</span>
          </li>
          <li class="call_item">
            <span class="li_sp">最小包装:{{item.packSize}}</span>
            <span class="li_sp">单位:{{item.unitCode}}</span>
          </li>
           <li class="call_item">
            <span class="li_sp" @click.stop="showmaterial('件描述',item.materialName)">件描述:{{item.materialName}}</span>
          </li>
        </ul>
        </div>
        </cube-scroll>
      </div>
       <div class="call_btn">
       <cube-button class="btn_style" :primary="true" @click="getyes()">确定</cube-button>
      </div>
      </div>
  </div>
</template>
<script>
import { selectByPartMes } from 'api/call'
export default {
   data () {
      return {
        show: false,
        data_text: '',
        project_ub:'',
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
    callshow (data) {
     this.project_ub = data
     this.show=true
    },
    // 判断选中
    click_item(index) {
      if (this.listdata[index].itemChecked) {
        this.listdata[index].itemChecked = false
      } else {
        this.listdata[index].itemChecked = true
      }
    },
    // 选中数据
    _filter (list) {
      let selectRows = []
      selectRows= list.filter(item => {
       return item.itemChecked
      })
      return selectRows
    },
    getyes() {
      this.show = false
      let newlist = this._filter(this.listdata)
      this.$parent.combination(newlist)
    },
    getapply () {
      this._projectdata(this.data_text)
    },
    // 组合数据
    _foreachdata(list) {
      let newlist = []
      list.forEach( item => {
        let obj = {}
        obj.materialCode = item.partNo
        obj.materialName = item.partName
        obj.unitName = item.companyCode
        obj.unitCode = item.unitCode
        obj.packSize = item.packSize
        obj.itemChecked = false
        obj.isDisabled = true
        newlist.push(obj)
      })
      return newlist
    },
    // 获取数据
    _projectdata (data) {
      this.showIndicator(this)
      var datas = {projectId: this.project_ub, partNo: data }
      selectByPartMes(datas).then(response => {
          this.closeIndicator()
          if (response.start !== 200) {
            this.showToast(this, '请求数据失败')
            return
          }
          // this.listdata=response.list
          this.listdata=this._foreachdata(response.list)
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
  .call_sp
   margin-left 10px
   margin-right 10px
   width 85%
  .call_sp1
   width 15%
   margin-left 10px
   margin-right 10px

 .div_body
  background #fff
  position absolute
  top 82px
  right 10px
  left 10px
  bottom 45px
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
      padding-top 2px
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