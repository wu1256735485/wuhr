<template>
  <div>
    <VHeader :title="'现场call料'"></VHeader>
    <div class="call_c">
      <div class="call_parent">
        <div class="call_child_text">班&nbsp;&nbsp;&nbsp;&nbsp;组:</div>
        <div class="call_child">
        <span class="call_sp"><div class="call_p">{{teamGroupName}}</div></span>
        <div class="call_sp_text">工&nbsp;&nbsp;&nbsp;&nbsp;区:</div>
            <span class="call_sp">
              <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="workarea"
                @change="changeworkarea(workarea)"
                :title="'工区'"
                :options="optionsworkarea"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
            </span> 
        </div>
      </div>
      <div class="call_parent">
        <div class="call_child_text">项目号:</div>
        <div class="call_child">
           <span class="call_sp">
                <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="project_ub"
                @change="changeproject_ub(project_ub)"
                :title="'项目号'"
                :options="optionsproject_ub"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
            </span>
            <div class="call_sp_text">列&nbsp;&nbsp;&nbsp;&nbsp;号:</div>
            <span class="call_sp">
                <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="column_nb"
                @change="changecolumn_nb(column_nb)"
                :title="'列号'"
                :options="optionscolumn_nb"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
            </span>
        </div>
      </div>
      <div class="call_parent">
        <div class="call_child_text">车&nbsp;&nbsp;&nbsp;&nbsp;号:</div>
        <div class="call_child">
            <span class="call_sp">
                <cube-select
                class="cube_put"
                :style="input_Image"
                v-model="car_nb"
                @change="changecar_nb(car_nb)"
                :title="'车号'"
                :options="optionscar_nb"
                :auto-pop="false"
                :disabled="false"
                ></cube-select>
            </span>
            <div class="call_sp_text">活动号:</div>
            <span class="call_sp">
              <cube-input class="cube_put" :readonly='true' v-model="activityNo" ></cube-input>
            </span>
        </div>
      </div>
      <div class="call_parent">
        <div class="call_child_text">备&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
        <div class="call_child">
           <span class="call_input">
             <textarea class="sp_input" v-model="remark" />
             </span>
           <span class="call_sp_button">
             <cube-button class="btn_styles" :inline="true" :primary="true" @click="apply()">选件</cube-button>
           </span>
        </div>
      </div>
    </div>
    <div class="div_body">
        <cube-scroll class="scroll_wrapper" :data="call_list" ref="scroll">
        <div class="div_for" v-for="(item, index) in call_list" v-bind:key="item.id">
          <div class="div_image" @click.stop="itemdelete(index)">
            <img class="image_items" src="@/components/warehouse/personallist/delete.png"/>
          </div>
        <ul>
          <li class="call_item">
            <span class="li_sp">件号:{{item.materialCode}}</span>
            <span class="li_sp">最小包装数:{{item.packSize}}</span>
          </li>
           <li class="call_item">
            <span class="li_sp" @click.stop="showmaterial('件描述',item.materialName)">件描述:{{item.materialName}}</span>
          </li>
           <li class="call_item">
            <span class="li_sp">单位:{{item.unitCode}}</span>
            <span class="li_sp">数量:
              <input
                class="sp_input"
                style="width:50px; height: 18px;"
                v-on:input="change(index,item.applyAmount)"
                :disabled="item.isDisabled"
                v-model="item.applyAmount"/>
                <span>
                <img class="img_edit" src="static/edit@2x.png" @click.stop="get_edit(index)" />
              </span>
            </span>
          </li>
        </ul>
        </div>
        </cube-scroll>
    </div>
    <div class="call_btn">
      <cube-button class="btn_style" :primary="true" @click="getapply()">提交申请</cube-button>
    </div>
    <VCallpopup ref="call_popup"></VCallpopup>
    <VCallquery ref="call_query"></VCallquery>
    <div class="call_header">
       <div class="call_back" @click.stop="showquery()"></div>
     </div>
  </div>
</template>
<script>
import { getData } from 'common/helpers/util'
import VHeader from 'base/warehouseheader/Header'
import VCallpopup from 'components/warehouse/call/Callpopup'
import VCallquery from 'components/warehouse/call/Callquery'
import { 
  selectInitialization, 
  selectByMes,
  insertSubmission,
  getselectByCallMes
} from 'api/call'
export default {
   data () {
      return {
        time: Date.parse(new Date()),
        workarea: '', // 工区
        NFCCode: '', // nfc
        project_ub: '', // 项目号
        column_nb: '', // 列号
        car_nb: '', // 车号
        column_nb_index: 0, // 列号索引
        car_nb_index: 0, // 车号索引
        remark: '', // 备注
        activityNo: '', // 活动号
        optionsworkarea: [], // 工区数组
        optionsproject_ub: [], // 项目号数组
        optionscolumn_nb: [],
        optionscar_nb: [],
        call_list: [], // 展示数组
        apply_data_lists: '', // 提交数组
        teamGroupName: '', // 工区数组
        workCenterCode : '',
        workCenterName: '', // 工区名字
        data_list: [],
        activityNoList:[],//活动号
        input_Image: {
        backgroundImage:
          'url(' +
          require('@/components/warehouse/pOstorage/inputbg.png') +
          ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
      }
   },
   filters: {
    formatDate: getData
   },
   components:{
     VCallquery,
     VCallpopup,
     VHeader    
   },
   methods: {
     showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
     nfc (data) {
      this.NFCCode = data
      this._getquery()
      this._searcharea()
     },
     showquery() {
       this.$refs.call_query.callshow()
     },
    // 合并数据
    combination (list) {
      for (var i = 0; i < list.length; i++) {
        let flage = true
        for (var j = 0; j < this.call_list.length; j++) {
          if (this.call_list[j].materialCode === list[i].materialCode) {
            flage = false
          }
        }
        if (flage) {
          this.call_list.push(list[i])
        }
      }
    },
    // 控制输入框可编辑
    get_edit (index) {
      if (this.call_list[index].isDisabled) {
        this.call_list[index].isDisabled = false
      } else {
        this.call_list[index].isDisabled = true
      }
    },
    change(index, applyAmount) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if ((applyAmount + '').match(/[^\d.]/g, '')) {
          this.call_list[index].applyAmount = 1
        }
        if (applyAmount <= 0 ) {
          this.showToast(this, '数量必须大于0')
          this.call_list[index].applyAmount = 1
        }
      }, 300)
    },
    itemdelete (index) {
      this.$delete(this.call_list, index)
    },
    // 工区
    changeworkarea (value) {
      this.workarea = value
      this._getquery()
    },
    // 项目号
    changeproject_ub (value) {
      this.project_ub = value
      this._getselectByCallMes(this.project_ub)
    },
    // 列号
    changecolumn_nb (value) {
      var data = { projectId : this.project_ub,carNo : value}
      this.column_nb = value
      this.optionscar_nb = []
      this.data_list.forEach( (item,index) => {
        if (value === item.tranNo) {
          this.activityNo = item.activityNo ? item.activityNo : ''
          this.released = item.released
          this.column_nb_index = index
        }
      })
      getselectByCallMes(data).then((res) => {
        if (res.status !== 200) {
          this.showToast(this, '请求数据失败')
          return
        }
        if(res.result.start !== 200){
          this.showToast(this, response.result.mes)
          return
        }
        this.optionscar_nb = [];
        if(res.result.list[0].car[0].activityNo){ //活动号
          this.activityNoList = res.result.list[0].car
        }
        res.result.list[0].car.map((val) => {
          this.optionscar_nb.push(val.carNo)
        })
        this.car_nb=this.optionscar_nb[0]
        this.activityNo = res.result.list[0].car[0].activityNo ? res.result.list[0].car[0].activityNo  : ''
      })
    },
    // 车号
    changecar_nb (value) {
      this.car_nb = value
      if(this.activityNoList.length){
          this.activityNoList.map((val) => {
            if (value == val.carNo) {
              this.activityNo = val.activityNo
            }
          })
      }
      
    },
    apply () {
      // this.$refs.showpop.popushow(1)
      if (!this.project_ub) {
        this.showToast(this, '无项目号不能选件')
        return
      }
      this.$refs.call_popup.callshow(this.project_ub)
    },
    getapply () {
      this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否确认提交？',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
           this._quest()
          }
        }).show()
    },
    _quest(){
      var flagesgetapply = true
      if (!this.project_ub) {
        this.showToast(this, '无项目号不能申请')
        return
      }
      if (!this.workarea) {
        this.showToast(this, '无工区不能申请')
        return
      }
      if (!this.column_nb) {
        this.showToast(this, '无列号不能申请')
        return
      }
      if (this.call_list.length===0) {
        this.showToast(this, '无数据不能申请')
        return
      }
      if(this.released != 'Released'){
        this.showToast(this,'活动号没有released,不允许申请')
        return
      }
      this.call_list.forEach(item => {
        if (!item.applyAmount) {
          flagesgetapply = false
        }
        if (item.applyAmount <= 0) {
          flagesgetapply = false
        }
      })
      if (!flagesgetapply){
        this.showToast(this, '数量必须大于0')
        return
      }

//  "teamGroupName":"123班组",
//  "teamGroupCode":"123",
//  "workCenterCode":"工区",
//  "projectId":"项目号",
//  "trainNo":"列号",
//  "carNo":"车号",
//  "remark":"备注",
//  "workCenterName":"工区名字",
//  "callPoArrDetail"
      this.apply_data_lists.workCenterCode = this.workarea
      this.apply_data_lists.projectId = this.project_ub
      this.apply_data_lists.trainNo = this.column_nb
      this.apply_data_lists.carNo = this.car_nb
      this.apply_data_lists.remark = this.remark
      this.apply_data_lists.code = this.NFCCode
      this.apply_data_lists.activitySeq = this.activityNo
      this.apply_data_lists.callPoArrDetail = this.call_list
      if(!this.activityNo){
        this.showToast(this, '项目活动号不能为空')
          return
      }
      insertSubmission(this.apply_data_lists).then(response => {
        if(response.start == 201){
          this.showToast(this, response.mes)
          return
        }
        if (response.start !== 200) {
          this.showToast(this, '申请失败')
          return
        }
        this.showToast(this, '申请成功')
        this.showquery()
      })
      .catch(error => {
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 组合数据
    _foreachdata(list){
      let listdata = []
      list.forEach(item => {
        listdata.push(item.code)
      });
      return listdata
    },
    // 工区 项目号 检索 
    _searcharea () {
      selectInitialization().then(response => {
        if (response.start !== 200) {
          this.showToast(this, '请求数据失败')
          return
        }
        this.optionsworkarea=this._foreachdata(response.conter)
        this.optionsproject_ub=this._foreachdata(response.project)
        // this.workarea = this.optionsworkarea[0].value
        this.workarea = this.optionsworkarea[0]
        this.project_ub = this.optionsproject_ub[0]
        this._getselectByCallMes(this.project_ub)
      })
      .catch(error => {
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    _getquery() {
      this.showIndicator(this)
      var datas = { workCenterCode : this.workarea }
      selectByMes(datas).then(response => {
        this.closeIndicator()
        console.log(response)
        if (response.start !== 200) {
          this.showToast(this, '请求数据失败')
          return
        }
        this.teamGroupName = response.list.teamGroupName
        this.apply_data_lists = response.list
        var newlist = []
        this.apply_data_lists.callPoArrDetail.forEach( item => {
          let obj = {}
          obj.applyAmount = item.applyAmount
          obj.materialCode = item.materialCode
          obj.materialName = item.materialName
          if (!item.packSize) {
            obj.packSize = ''
          } else {
            obj.packSize = item.packSize
          }
          if (!item.packSize) {
            obj.unitCode = ''
          } else {
            obj.unitCode = item.unitCode
          }
          obj.isDisabled = true
          newlist.push(obj)
        })
        this.call_list = newlist
        console.log(this.call_list)
      })
      .catch(error => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    _getselectByCallMes(data) {
      this.showIndicator(this)
      var datas = { projectId  : data }
      getselectByCallMes(datas).then(response => {
        this.closeIndicator()
        if (response.status !== 200) {
          this.showToast(this, '请求数据失败')
          return
        }
        if(response.result.start !== 200){
          this.showToast(this, response.result.mes)
          return
        }
        this.data_list = []
        this.data_list=response.result.list
        if (this.data_list.length === 0) {
          // this.showToast(this, '无列号、车号数据')
          return
        }
        this.optionscolumn_nb = []
        this.data_list.forEach( item => {
          if(item.tranNo){
            this.optionscolumn_nb.push(item.tranNo)
          }
        })
        this.activityNo = this.data_list[0].activityNo ? this.data_list[0].activityNo : ''
        this.released = this.data_list[0].released
        if(this.optionscolumn_nb.length){
          this.column_nb = this.optionscolumn_nb[0]
          getselectByCallMes({projectId  : data , carNo: this.column_nb}).then((res) => {
            this.optionscar_nb = [];
            res.result.list[0].car.map((val) => {
              this.optionscar_nb.push(val.carNo)
            })
            this.car_nb=this.optionscar_nb[0]
            if(res.result.list[0].car[0].activityNo){
              this.activityNo = res.result.list[0].car[0].activityNo
              this.activityNoList = res.result.list[0].car
            }
            
          })
        }else {
          this.car_nb = ''
          this.column_nb = ''
          this.optionscolumn_nb = []
          this.optionscar_nb = []
        }
      })
      .catch(error => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    }
   }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.call_c
 margin-top 5px
 margin-left 10px
 margin-right 10px
 padding-bottom 5px
 border 1px solid rgba(0,0,0,0.1)
 border-radius 5px
 background #9acafb
 font-size 14px
 .call_parent
  height auto
  margin-top 3px
  margin-left 10px
  margin-right 10px
  display flex
  .call_child_text
   display flex 
   align-items center
   text-align center
   width 20%
  .call_child
   display flex
   justify-content space-between
   width 80%
   overflow hidden
   .call_text
    display flex 
    align-items center
   .call_sp
    width 38%
    display flex
    align-items center
    overflow hidden
    .call_p
     overflow hidden
     text-overflow ellipsis
     white-space nowrap
    .cube_put
     border-radius 10px
     width 85%
     height 22px
     line-height 2px
     overflow hidden
     text-overflow ellipsis
     white-space nowrap
   .call_sp_text
    display flex 
    align-items center
    text-align center
    width 24%
   .call_input
    width 80%
    display flex
    align-items center
    .sp_input
     width 100%
     height 40px
   .call_sp_button
    display flex
    align-items center
    justify-content flex-end

.btn_styles 
 background: #3A85E6
 height: 25px
 line-height: 1px

.div_body
 position absolute
 top 170px
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


.img_edit 
  width: 15px
  height: 15px
  margin-left: 5px

.div_image 
  position absolute
  top 5px
  right 5px
  .image_items 
   width 20px
   height 20px

.call_header
  position absolute
  top 0
  width 100%
  height 40px
  .call_back
   height 40px
   width 70px
</style>