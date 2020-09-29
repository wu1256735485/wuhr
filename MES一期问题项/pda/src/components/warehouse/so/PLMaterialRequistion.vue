<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <div class="pl" v-if="show">
      <div class="pl_select">
        <span class="pl_select_sp">仓库</span>
        <span class="pl_select_sp1">
          <cube-select
            class="pl_cube_select"
            :style="cube_input_Image"
            v-model="value"
            placeholder="请选择"
            @change="changeValue(value)"
            :title="select_title"
            :options="options"
            :auto-pop="false"
            :disabled="false"
          ></cube-select>
        </span>
      </div>
      <cube-scroll class="scroll-wrapper">
        <div
          class="pl_item_ul"
          v-for="(item,index) in pl_list"
          v-bind:key="item.id"
          @click="click_item(index)"
        >
          <ul>
            <li class="pl_item">
              <span class="pl_sp">订单号:{{item.orderNo}}</span>
              <span class="pl_sp">合同号:{{item.projectCode}}</span>
            </li>
            <li class="pl_item">
              <span class="pl_sp">车号/列号:{{item.carNo}}/{{item.trainNo}}</span>
              <span class="pl_sp">预留种类:{{item.reservedCategoryCount}}</span>
            </li>
            <li class="pl_item">
              <span class="pl_sp">上级件:{{item.partDescribe}}</span>
              <span class="pl_sp">工区:{{item.workCenterNo}}</span>
            </li>
            <li class="pl_item">
              <span class="pl_sp1">交付日期:{{item.deliveryTime}}</span>
            </li>
          </ul>
          <div class="div_image">
            <img
              v-if="item.selected"
              class="image_items"
              src="@/components/warehouse/pOstorage/yes.png"
            />
          </div>
        </div>
      </cube-scroll>
    </div>
    <VFooter @func="getadd_number" :placeholdertext="imput_text"></VFooter>
    <VToastp ref="showp"></VToastp>
    <div class="pl_button">
      <cube-button class="btn_style" :primary="true" @click="submission">确定</cube-button>
    </div>
  </div>
</template>
<script>
import VFooter from 'base/footer/Footer'
import VToastp from 'base/popup/Toastp'
import VHeader from 'base/warehouseheader/Header'
import { getquerysoaggregatelist } from 'common/js/httpConnection'
export default {
  data() {
    return {
      msg: '生产订单领料',
      select_title: '仓库选择',
      imput_text: '输入订单号、扫描流转卡二维码',
      selecteddata: [], // 页面传值选中数据
      add_number: '',
      result: [], // 接口 返回数据
      show: false,
      btntext: '确定',
      options: [], // 下来框数据
      options_list: [], // 下来框数据
      value: '',
      pl_list: [], // 展示数据
      cube_input_Image: {
        backgroundImage:
          'url(' + require('@/components/warehouse/so/inputbg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  components: {
    VFooter,
    VHeader,
    VToastp
  },
  methods: {
    changeValue(value) {
      console.log(value)
      this.pl_list = []
      for (var i = 0; i < this.result.length; i++) {
        if (value === this.result[i].warehouseCode) {
          this.pl_list.push(this.result[i])
        }
      }
    },
    click_item(index) {
      // item 判断是否选中换背景颜色
      if (this.pl_list[index].selected === false) {
        this.pl_list[index].selected = true
      } else {
        this.pl_list[index].selected = false
      }
    },
    getSOid(data) {
      return (
        data.orderNo +
        data.releaseNo +
        data.sequenceNo +
        data.warehouseCode +
        data.workCenterNo
      )
    },
    getadd_number(data) {
      console.log(data)
      this.add_number = data
      this.showIndicator(this)
      var datas = { qccode: this.add_number }
      getquerysoaggregatelist(datas)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0) {
            this.$refs.showp.toastshow(6000, response.errorMsg)
            return
          }
          if (response.result.length === 0) {
            return
          }
          this.show = true
          if (this.result.length === 0) {
            this.result = response.result
          } else {
            // 去掉重复数据
            for (let k = 0; k < response.result.length; k++) {
              let flage = true
              for (let h = 0; h < this.result.length; h++) {
                if (
                  this.getSOid(this.result[h]) + '' ===
                  this.getSOid(response.result[k]) + ''
                ) {
                  flage = false
                }
              }
              if (flage) {
                this.result.push(response.result[k])
              }
            }
          }
          if (this.result.length === 0) {
            return
          }
          console.log(this.result)
          // 组合仓库类型下拉框数组
          this.options_list = []
          for (var i = 0; i < this.result.length; i++) {
            let warehouseCode = this.result[i].warehouseCode
            var findCount = this.options_list.filter(function(ob) {
              return ob.value === warehouseCode
            }).length
            if (findCount === 0) {
              var obj = {}
              obj.value = this.result[i].warehouseCode
              obj.label = this.result[i].warehouseName
              this.options_list.push(obj)
            }
          }
          // 赋值选项数据
          this.options = []
          for (var s = 0; s < this.options_list.length; s++) {
            this.options.push(this.options_list[s].value)
          }
          // 设置默认下拉框选项
          this.value = this.options[0]
          this.pl_list = []
          // 填充默认仓库展示数据
          for (var k = 0; k < this.result.length; k++) {
            if (this.result[k].warehouseCode === this.options[0]) {
              this.pl_list.push(this.result[k])
            }
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    submission() {
      this.selecteddata = []
      for (var i = 0; i < this.pl_list.length; i++) {
        if (this.pl_list[i].selected === true) {
          this.selecteddata.push(this.pl_list[i])
        }
      }
      if (this.selecteddata.length === 0) {
        this.showToast(this, '请选择数据')
        return
      }
      this.$router.push({
        name: 'PLMaterialRequistionDetail',
        params: {
          data: this.selecteddata
        }
      })
    }
  }
}
</script>
<style lang='stylus' scoped>
.pl_select 
  display: flex
  justify-content: start
  align-items: center
  margin-left: 10px
  margin-top: 5px
  margin-right: 10px
  height: 45px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  background: #9acafb
  .pl_select_sp 
    margin-left: 10px
    width: 20%
  .pl_select_sp1 
    width: 60%
    .pl_cube_select 
      line-height: 7px
      height: 25px
      background: none

.scroll-wrapper 
  margin-left: 10px
  margin-right: 10px
  height: 440px

.pl_item_ul 
  margin-top: 5px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  height: auto
  padding-bottom: 3px
  position: relative
.div_image 
  position: absolute
  top: 5px
  right: 5px
  .image_items 
    width: 20px
    height: 20px
.pl_item 
  display: flex
  justify-content: start
  align-items: center
  margin-left: 10px
  margin-right: 10px
  margin-top: 5px
  font-size: 13px
  .pl_sp 
    width: 50%
    padding-top: 2px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
  .pl_sp1 
    width: 100%
  .pl_sp2 
    width: 20%

.bg 
  background: #ecf8ff

.pl_button 
  position: absolute
  top: 590px
  left: 10px
  right: 10px
  .btn_style 
    height: 10px
    line-height: 1px
</style>
