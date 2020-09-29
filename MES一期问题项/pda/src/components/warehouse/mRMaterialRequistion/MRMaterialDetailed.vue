<template>
  <div >
    <VHeader :title="msg"></VHeader>
    <cube-scroll class="scroll-wrapper" >
      <div class="mr_detail" v-for="(item,index) in mr_detail_list" v-bind:key="item.id" @click="click_item(index)" :class="{ bg_rowColorStatus: item.rowColorStatus }">
        <ul>
        <li class="mr_detail_item">
          <span class="mr_sp">
          <span class="sp_text_bold">零件号:</span>
          <span class="sp_bold">{{item.materialCode}}</span>
          </span>
          <span class="mr_sp">
          <span class="sp_text_bold">库位:</span>
          <span class="sp_bold">{{item.locationCode}}</span>
          </span>
        </li>
        <li class="mr_detail_item">
          <span class="mr_sp1">零件描述:{{item.materialName}}</span>
        </li>
        <li class="mr_detail_item">
          <span class="mr_sp">
          <span class="sp_text_bold">数量({{item.unitCode}}):</span>
          <span class="sp_bold">{{item.demandQuantity}}/{{item.allowDispatchesQuantity}}</span>
          </span>
          <span class="mr_sp" @click.stop="">发料数量:
            <span><input 
            class="sp_input mr_sp_input" 
            :disabled="item.isDisabled"
            v-on:input="change(index, item.dispatchesQuantity, item.allowDispatchesQuantity)"
            v-model="item.dispatchesQuantity"/></span>
            <span><img class="img_edit" src="static/edit@2x.png" @click.stop="get_edit(index)"></span>
          </span>
        </li>
        <li class="mr_detail_item">
          <span class="mr_sp">批次号:{{item.snBatch}}</span>
          <span class="mr_sp">序列号:{{item.snCode}}</span>
        </li>
         <li class="mr_detail_item">
          <span class="mr_sp">条件代码:{{item.conditional}}</span>
        </li>
        </ul>
        <div class="div_image">
          <img v-if="item.itemChecked" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
        </div>
        <div class="div_text_s" v-if="item.printMateriallabStatus == 1" >已</div>
        <div class="div_index"> {{index+1}}</div>
      </div>
    </cube-scroll>
    <div class="mr_el">
     <span class="mr_span"> <cube-button class="btnstyle" :primary="true" :disabled="btn_disable" @click="print">打印物料标签</cube-button></span>
     <span class="mr_span"> <cube-button class="btnstyle" :primary="true" :disabled="btn_disable" @click="yes">打印集料标签</cube-button></span>
    </div>
  <VToastp ref="showp"></VToastp>
  </div>
</template>
<script>
import VToastp from 'base/popup/Toastp'
import VHeader from 'base/warehouseheader/Header'
import { getquerymrpickingdetaillist, getprintmrwl, getvalidhasprintedmrwl, getsubmitaggregate } from 'common/js/httpConnection'
export default {
  data () {
    return {
      msg: '集料明细',
      mr_detail_list: [], // 列表数据
      paramsArray: [], // 路由数据
      btn_disable: false, // 按键禁止
      printflge: '0' // 打印标识
    }
  },
  components: {
    VHeader,
    VToastp
  },
  methods: {
    // 控制输入框可编辑
    get_edit (index) {
      console.log(this.mr_detail_list[index].isDisabled)
      if (this.mr_detail_list[index].isDisabled) {
        this.mr_detail_list[index].isDisabled = false
      } else {
        this.mr_detail_list[index].isDisabled = true
      }
    },
    change(index, dispatchesQuantity, qtyAssigned) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if ((dispatchesQuantity + '').match(/[^\d.]/g, '')) {
          this.mr_detail_list[index].dispatchesQuantity = qtyAssigned
        }
        if (dispatchesQuantity > qtyAssigned) {
          this.showToast(this, '数量不能超过预留数量')
          this.mr_detail_list[index].dispatchesQuantity = qtyAssigned
        }
      }, 300);
    },
    click_item (index) {
      if (this.mr_detail_list[index].itemChecked === false) {
        this.mr_detail_list[index].itemChecked = true
      } else {
        this.mr_detail_list[index].itemChecked = false
      }
    },
    // 获取跳转数据
    getRuterData () {
      console.log(this.$route.params.paramsArray)
      this.paramsArray = []
      this.paramsArray = this.$route.params.paramsArray
    },
    // 组合选中
    getcollect () {
      var newArray = []
      newArray = this.mr_detail_list
      var selectRows = newArray.filter(function (item) {
        return item.itemChecked;
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 打印集料标签
    yes () {
      if (this.mr_detail_list.length === 0) {
        this.showToast(this, '暂无数据')
        return
      }
      this.btn_disable = true
      this.printflge = '1'
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission);
      this.timeout_Submission = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 打印提交集料
    getAggregate () {
      let newlists = this.getcollect()
      this.showIndicator(this)
      getsubmitaggregate(newlists).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
            this.$refs.showp.toastshow(15000, response.errorMsg)
            this.getclose()
            return
          }
        if (response.status === 1) {
          this.getstartPrint(response.result)
          this.getrequest()
        } else if (response.status === 2) {
          this.$refs.showp.toastshow(15000, response.errorMsg)
          this.mr_detail_list = response.result
          this.getclose()
        }
      }).catch((error) => {
        this.getclose()
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 打印物料标签
    print () {
      if (this.mr_detail_list.length === 0) {
        this.showToast(this, '暂无数据')
        return
      }
      this.btn_disable = true
      this.printflge = '2'
      $App.callconntBluetooth()
      clearTimeout(this.timeouts);
      this.timeouts = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 物料提示
    getmateriel () {
      let newlists = this.getcollect()
      if (newlists.length === 0) {
        this.showToast(this, '请选择数据')
        this.getclose()
        return
      }
      if (newlists.length === this.mr_detail_list.length) {
        this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否全部打印?',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
            this.setvalidhasprintedmrwl(newlists)
          },
          onCancel: () => {
            this.getclose()
          }
        }).show()
      } else {
        this.setvalidhasprintedmrwl(newlists)
      }
    },
    // 验证是否已经打印过物料标签
    setvalidhasprintedmrwl (newlists) {
      this.showIndicator(this)
      getvalidhasprintedmrwl(newlists).then((response) => {
        this.closeIndicator(this)
        if (response.status === 2) {
          this.$createDialog({
            type: 'confirm',
            title: '提示',
            content: response.errorMsg,
            confirmBtn: {
              text: '确定',
              active: true
            },
            cancelBtn: {
              text: '取消',
              active: false
            },
            onConfirm: () => {
              this.getrequstprint(newlists)
            },
            onCancel: () => {
              this.getclose()
            }
          }).show()
        } else {
          this.getrequstprint(newlists)
        }
      }).catch((error) => {
        this.closeIndicator()
        this.getclose()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 物料请求打印
    getrequstprint (newlists) {
      this.showIndicator(this)
      getprintmrwl(newlists).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.getclose()
          this.showToast(this, response.errorMsg)
          return
        }
        if (response.status === 1) {
          this.getrequest()
          this.getstartPrint(response.result)
        } else {
          this.getclose()
        }
      }).catch((error) => {
        this.getclose()
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 请求明细
    getrequest () {
      this.showIndicator(this)
      getquerymrpickingdetaillist(this.paramsArray).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.mr_detail_list=[]
        var result = response.result
        this.mr_detail_list = result
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 调打印机
    getstartPrint (data) {
      clearTimeout(this.timeout_pint);
      this.timeout_pint = setTimeout(() => {
        $App.callPrint(data)
      }, 500)
    },
    // 关闭打印连接
    getclose () {
      clearTimeout(this.timeoutclose);
      this.timeoutclose = setTimeout(() => {
        $App.callcolsePrint()
      }, 500)
    },
    beCalledBLSuccess (data) {
      if (this.printflge === '1') {
        this.getAggregate()
      } else if (this.printflge === '2') {
        this.getmateriel()
      }
    }
  },
  created () {
    this.getRuterData()
  },
  mounted () {
    window.beCalledBLSuccess = this.beCalledBLSuccess
    this.getrequest()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/style/warehouse.styl'
.scroll-wrapper
  height 540px
.mr_detail
  border 1px solid rgba(0, 0, 0, 0.1)
  border-radius 5px
  margin-top 5px
  margin-left 10px
  margin-right 10px
  font-size 14px
  padding-bottom 3px
  position relative
.div_image
 position absolute
 top 5px
 right 5px
 .image_items
  width 20px
  height 20px
.mr_detail_item 
  display flex
  align-items center
  margin-left 10px
  margin-right 10px
  margin-top 5px
  .mr_sp
   display flex
   align-items center
   width 50%
   .mr_sp_input
    width 70px 
    height 18px
  .mr_sp1
    padding-top 2px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
.mr_el
  margin-top 10px
  display flex
  justify-content space-between
  margin-left 10px
  margin-right 10px
  .mr_span
   text-align center
   width 45%
   .btnstyle
    height 10px
    line-height 1px
.bg_rowColorStatus
  background RED
.img_edit
 width 15px
 height 15px
 margin-left 5px
</style>
