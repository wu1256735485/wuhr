<template>
  <div class="tt">
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
          :allow-vertical="true"
          :auto-play="autoPlay"
          :show-dots="showDots"
          :options="slideOptions"
          :initial-index="initialIndex"
          @change="changePage"
         >
          <cube-slide-item >
               <div class="scroll-wrapper" v-if="show" :options="scrollOptions">
                 <div style="margin-top: 5px" v-for="(item1,index1) in tt_list" v-bind:key="item1.id">
                    <div class="ttput_title" @click="set_item_selected(index1)">
                      <div class="ttput_item">
                        <span class="ttput_sp">TT号:{{item1.ttMoveLibrary}}</span>
                        <span class="ttput_sp">创建日期:{{item1.createTime}}</span>
                      </div>
                    <div class="div_images" >
                      <img v-if="item1.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                    </div>
                    </div>
                    <div class="ttput_wrappers">
                      <div v-for="(item,index) in item1.ttmoveLibraryDetailList" v-bind:key="item.id" >
                        <div v-if="item1.item_show" class="ul_item">
                          <ul @click="set_listitem_selected(index1,index)">
                          <!-- <ul> -->
                            <li class="ttput_item">
                              <span class="ttput_sp">From:{{item.fromLocation}}</span>
                              <span class="ttput_sp">
                              <span class="sp_text_bold">To:</span>
                              <span class="sp_bold">{{item.toLocation}}</span></span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp">项目号:{{item.projectCode}}</span>
                            </li>
                             <li class="ttput_item">
                               <span class="ttput_sp1">
                              <span class="sp_text_bold">零件号:</span>
                              <span class="sp_bold">{{item.materialCode}}</span></span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp1" @click.stop="showmaterial('零件描述', item.materialName)">零件描述:{{item.materialName}}</span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp">条件代码:{{item.conditionalCode}}</span>
                              <span class="ttput_sp">
                              <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                              <span class="sp_bold">{{item.transferQuantity}}</span></span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp3" @click.stop="showmaterial('序列号', item.sncode)">序列号:{{item.sncode}}</span>
                              <span class="ttput_sp">批次号:{{item.snbatch}}</span>
                            </li>
                          </ul>
                          <div class="div_image" >
                          <img v-if="item.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                          </div>
                        </div>
                      </div>
                        <div class="ttput_item2"  @click="item_shows(index1)">
                          <img  v-if="item1.item_show" class="image_items" src="@/components/warehouse/tt/shou.png" >
                          <img  v-else class="image_items" src="@/components/warehouse/tt/kai.png" >
                        </div>
                    </div>
                  </div>
               </div>
          </cube-slide-item>
          <cube-slide-item >
               <div class="scroll-wrapper" v-if="show" :options="scrollOptions" >
                 <div style="margin-top: 5px" v-for="(item1,index1) in ttup_list" v-bind:key="item1.id">
                    <!-- <div class="ttput_title" @click="set_item_selected(index1)"> -->
                    <div class="ttput_title">
                      <div  class="ttput_item">
                        <span class="ttput_sp">TT号:{{item1.ttMoveLibrary}}</span>
                        <span class="ttput_sp">创建日期:{{item1.createTime}}</span>
                      </div>
                    <!-- <div class="div_images" >
                      <img v-if="item1.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                    </div> -->
                    </div>
                    <div class="ttput_wrappers">
                      <div v-for="(item,index) in item1.ttmoveLibraryDetailList" v-bind:key="item.key">
                        <div v-if="item1.item_show" class="ul_item">
                          <ul @click="set_uplistitem_selected(index1,index)">
                          <!-- <ul> -->
                            <li class="ttput_item">
                              <span class="ttput_sp">From:{{item.fromLocation}}</span>
                              <span class="ttput_sp" >To:
                              <span><input class="sp_input" :disabled="true" style="width:90px; height: 18px;" type="text" v-model="item.toLocation"/></span>
                              <span @click.stop="item_click(index1,index)"><img class="img_edit" src="static/edit@2x.png"></span>
                              </span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp">项目号:{{item.projectCode}}</span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp1">
                              <span class="sp_text_bold">零件号:</span>
                              <span class="sp_bold">{{item.materialCode}}</span></span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp1" @click.stop="showmaterial('零件描述', item.materialName)">零件描述:{{item.materialName}}</span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp">条件代码:{{item.conditionalCode}}</span>
                              <span class="ttput_sp">
                              <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                              <span class="sp_bold">{{item.transferQuantity}}</span></span>
                            </li>
                            <li class="ttput_item">
                              <span class="ttput_sp3" @click.stop="showmaterial('序列号', item.sncode)">序列号:{{item.sncode}}</span>
                              <span class="ttput_sp">批次号:{{item.snbatch}}</span>
                            </li>
                          </ul>
                          <div class="div_image" >
                          <img v-if="item.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
                          </div>
                        </div>
                        </div>
                        <div class="ttput_item2"  @click="item_shows(index1)">
                          <img  v-if="item1.item_show" class="image_items" src="@/components/warehouse/tt/shou.png" >
                          <img  v-else class="image_items" src="@/components/warehouse/tt/kai.png" >
                        </div>
                    </div>
                  </div>
               </div>
          </cube-slide-item>
         </cube-slide>
        </div>
     </div>
     <VFooter @func="getadd_number" ref="ttshelf" :placeholdertext="imput_text"></VFooter>
     <div class="tt_btn_div" v-if="show_but">
        <div class="ttput_div">
            <span class="ttput_col">
              <cube-button class="but_style" :primary="true"  @click="Undercarriage">下架</cube-button>
            </span>
            <span class="ttput_col">
              <cube-button class="but_style" :primary="true" :disabled="btn_disable" @click="getprint">打印物料标签</cube-button>
            </span>
        </div>
      </div>
      <div class="tt_btn_div" v-else >
          <div class="ttput_div">
            <cube-button class="but_style" :primary="true" @click="Submission">提交</cube-button>
          </div>
        </div>
     <div class="div_x"> </div>
     <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
     <VToastp ref="showp"></VToastp>
  </div>
</template>
<script>
import VFooter from 'base/footer/Footer'
import VToastp from 'base/popup/Toastp'
import VPopup from 'base/popup/Popup'
import VHeader from 'base/warehouseheader/Header'
import { getTTmovelibrary, getttmovelowershelflist, getttmoveonshelflist, getttmovelibrarylist, getprintttwl, getttnolowershelflibrarylist } from 'common/js/httpConnection'
import { findIndex } from 'common/helpers/util'
export default {
  data () {
    return {
      msg: 'TT移库',
      disabled: false,
      show: false,
      show_but: true,
      add_number: '',
      imput_text: '输入TT号或扫描TT移库单二维码',
      selectedLabel: 'TT下架',
      listdata: [], // 下架缓存数组
      listdataup: [], // 上架缓存数组
      tt_list: [], // 下架展示数组
      ttup_list: [], // 上架展示数组
      shelflist: [], // 上架提交数组
      // stringttmove: '',
      ttup_list_index: '', // 展示数据主item标识
      queryType: 1,
      ttmoveLibraryDetailList_index: '', // 展示数据子item标识
      SelectList: [],
      btn_disable: false,
      tabLabels: [{
        label: 'TT下架'
      }, {
        label: 'TT上架'
      }],
      loop: false,
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
    VToastp,
    VFooter,
    VPopup,
    VHeader
  },
  methods: {
    // 显示描述数据
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    changePage (current) {
      this.selectedLabel = this.tabLabels[current].label
      if (current === 1) {
        this.add_number = ''
        this.currents = current
        this.show_but = false
        this.queryType = 2
        if (this.ttup_list.length === 0) {
          this.show = false
        }
        this.get_ttup()
      } else {
        this.currents = current
        this.show_but = true
        this.add_number = ''
        this.queryType = 1
        if (this.tt_list.length === 0) {
          this.show = false
        }
        this._downttup()
      }
    },
    item_shows (index) {
      if (this.currents === 0) {
        if (this.tt_list[index].item_show) {
          this.tt_list[index].item_show = false
        } else {
          this.tt_list[index].item_show = true
        }
      } else {
        if (this.ttup_list[index].item_show) {
          this.ttup_list[index].item_show = false
        } else {
          this.ttup_list[index].item_show = true
        }
      }
    },
    // 整条数据提交选中
    set_item_selected (index1) {
      if (this.currents === 0) {
        let flage = this.tt_list[index1].selected
        if (flage) {
          this.tt_list[index1].selected = false
        } else {
          this.tt_list[index1].selected = true
        }
      } else {
        // let flage = this.ttup_list[index1].selected
        // if (flage) {
        //   this.ttup_list[index1].selected = false
        // } else {
        //   this.ttup_list[index1].selected = true
        // }
      }
      //  if (this.currents === 0) {
      //   let flage = this.tt_list[index1].ttmoveLibraryDetailList[index].selected
      //   if (flage) {
      //     this.tt_list[index1].ttmoveLibraryDetailList[index].selected = false
      //   } else {
      //     this.tt_list[index1].ttmoveLibraryDetailList[index].selected = true
      //   }
      // } else {
      //   let flage = this.ttup_list[index1].ttmoveLibraryDetailList[index].selected
      //   if (flage) {
      //     this.ttup_list[index1].ttmoveLibraryDetailList[index].selected = false
      //   } else {
      //     this.ttup_list[index1].ttmoveLibraryDetailList[index].selected = true
      //   }
      // }
    },
    // 上架选中
    set_uplistitem_selected (index1, index) {
      let flage = this.ttup_list[index1].ttmoveLibraryDetailList[index].selected
        if (flage) {
          this.ttup_list[index1].ttmoveLibraryDetailList[index].selected = false
        } else {
          this.ttup_list[index1].ttmoveLibraryDetailList[index].selected = true
        }
    },
    // 打印选中
    set_listitem_selected (index1, index) {
      let flage = this.tt_list[index1].ttmoveLibraryDetailList[index].selected
      if (flage) {
        this.tt_list[index1].ttmoveLibraryDetailList[index].selected = false
      } else {
        this.tt_list[index1].ttmoveLibraryDetailList[index].selected = true
      }
    },
    // 打开popup
    item_click (index1, index) {
      this.ttup_list_index = index1
      this.ttmoveLibraryDetailList_index = index
      this.$refs.showpopup.childClick()
    },
    getloction (data) {
      let nwelist = this.ttup_list[this.ttup_list_index]
      nwelist.ttmoveLibraryDetailList.forEach((item, index) => {
        if (this.ttmoveLibraryDetailList_index === index) {
          this.$set(item, 'toLocation', data)
        }
      })
    },
    // 得到扫码数据
    getadd_number (data) {
      this.add_number = data
      // if (this.stringttmove.indexOf(data) === -1) {
      //   this.stringttmove = this.stringttmove + data + ','
      // }
      this.getrequest()
    },
    getrequest () {
      this.showIndicator(this)
      var datas = {'moveLibraryCode': this.add_number, 'queryType': this.queryType}
       // 请求列表数据
      getTTmovelibrary(datas).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.$refs.showp.toastshow(3000, response.errorMsg)
          return
        }
        // if (index === 0) {
        //   this.showToast(this, response.errorMsg)
        // } else {
        this.tt_list = []
        this.listdata = []
        this.listdataup = []
        this.ttup_list = []
        // }
        console.log(response.result.length)
        // this.show = true
        if (this.currents === 0) {
          this.setdate(response.result)
        } else {
          this.setdateup(response.result)
        }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    getttdown () {
      if (this.tt_list.length === 0) {
        this.showToast(this, '暂无数据')
        return
      }
      let newlists = this.getcollect(this.tt_list)
        if (newlists.length === 0) {
          this.showToast(this, '请选择需要下架的数据')
          return
      }
      this.showIndicator(this)
      getttmovelowershelflist(newlists).then((response) => {
        this.closeIndicator()
        console.log(response)
        this.$refs.showp.toastshow(3000, response.errorMsg)
        if (response.status === 1) {
          // this.add_number = this.stringttmove
          // 1下架之后刷新拉取数据
          // this.getrequest(1)
          this._downttup()
        }
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 组合下架提交数据
    getcollect (list) {
      var newArray = []
      // for (var i = 0; i < list.length; i++) {
      //   let ttmoveLibraryDetailList = list[i].ttmoveLibraryDetailList
      //   for (var j = 0; j < ttmoveLibraryDetailList.length; j++) {
      //     newArray.push(ttmoveLibraryDetailList[j])
      //   }
      // }
      // newArray = list
      var selectRows = list.filter(function (item) {
        return item.selected;
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 组合上架提交数据
    _getupcollect (list) {
      var newArray = []
      for (var i = 0; i < list.length; i++) {
        let ttmoveLibraryDetailList = list[i].ttmoveLibraryDetailList
        for (var j = 0; j < ttmoveLibraryDetailList.length; j++) {
          newArray.push(ttmoveLibraryDetailList[j])
        }
      }
      // newArray = list
      var selectRows = newArray.filter(function (item) {
        return item.selected;
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 下架
    Undercarriage () {
      if (this.tt_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      this.getttdown()
    },
    // 打印
    getprint () {
      let newArray = []
      for (var i = 0; i < this.tt_list.length; i++) {
        let ttmoveLibraryDetailList = this.tt_list[i].ttmoveLibraryDetailList
        for (var j = 0; j < ttmoveLibraryDetailList.length; j++) {
          newArray.push(ttmoveLibraryDetailList[j])
        }
      }
      this.SelectList = newArray.filter(function (item) {
        return item.selected;
      })
      if (this.SelectList.length === 0) {
        this.showToast(this, '请选择数据')
        return
      }
      this.btn_disable = true
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission);
      this.timeout_Submission = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // tt打印请求
    getprintrequst () {
      this.showIndicator(this)
      getprintttwl(this.SelectList).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.$refs.showp.toastshow(3000, response.errorMsg)
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
    // 上架
    Submission () {
      if (this.ttup_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      let ttupdata = this._getupcollect(this.ttup_list)
      let ttuplength = 0
      for(var i=0;i<this.ttup_list.length;i++){
        ttuplength= ttuplength + this.ttup_list[i].ttmoveLibraryDetailList.length
      }
      if (ttupdata.length === ttuplength) {
      this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '请确认是否全部提交？',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
            this._getquest(ttupdata)
          }
        }).show()
       } else {
         this._getquest(ttupdata)
       }
    },
    _getquest (ttupdata) {
      this.showIndicator(this)
      getttmoveonshelflist(ttupdata).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.$refs.showp.toastshow(3000, response.errorMsg)
          return
        }
        this.ttup_list = []
        this.listdataup = []
        this.get_ttup()
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 去重 并组合下架列表数据
    setdate (list) {
      // for (var s = 0; s < list.length; s++) {
      //   let ttmoveLibraryDetailList = list[s].ttmoveLibraryDetailList
      //   for (var k = 0; k < ttmoveLibraryDetailList.length; k++) {
      //     let item = ttmoveLibraryDetailList[k]
      //     item.selected = false
      //   }
      // }
      if (this.listdata.length === 0) {
        this.listdata = list
        this.tt_list = this.listdata
        if (this.tt_list.length === 0) {
          this.show = false
        } else {
          this.show = true
        }
        return
      }
      for (var i = 0; i < list.length; i++) {
        let flage = true
        for (var j = 0; j < this.listdata.length; j++) {
          if (this.listdata[j].ttMoveLibrary + '' === list[i].ttMoveLibrary + '') {
            flage = false
          }
        }
        if (flage) {
          this.listdata.push(list[i])
        }
      }
      this.tt_list = this.listdata
      if (this.tt_list.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
    },
    // 去重 并组合上架列表数据
    setdateup (list) {
      // for (var s = 0; s < list.length; s++) {
      //   let ttmoveLibraryDetailList = list[s].ttmoveLibraryDetailList
      //   for (var k = 0; k < ttmoveLibraryDetailList.length; k++) {
      //     let item = ttmoveLibraryDetailList[k]
      //     item.selected = false
      //   }
      // }
      if (this.listdataup.length === 0) {
        this.listdataup = list
        this.ttup_list = this.listdataup
        if (this.ttup_list.length === 0) {
          this.show = false
        } else {
          this.show = true
        }
        return
      }
      for (var i = 0; i < list.length; i++) {
        let flage = true
        for (var j = 0; j < this.listdataup.length; j++) {
          if (this.listdataup[j].ttMoveLibrary + '' === list[i].ttMoveLibrary + '') {
            flage = false
          }
        }
        if (flage) {
          this.listdataup.push(list[i])
        }
      }
      this.ttup_list = this.listdataup
      if (this.ttup_list.length === 0) {
        this.show = false
      } else {
        this.show = true
      }
    },
    // 未上架数据
    get_ttup () {
      getttmovelibrarylist().then((response) => {
        if (response.status === 0) {
          this.$refs.showp.toastshow(3000, response.errorMsg)
          return
        }
        this.listdataup = []
        this.ttup_list = []
        this.setdateup(response.result)
      }).catch((error) => {
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 未下架数据
      _downttup () {
      getttnolowershelflibrarylist().then((response) => {
        if (response.status === 0) {
          this.$refs.showp.toastshow(3000, response.errorMsg)
          return
        }
        this.listdata = []
        this.tt_list = []
        this.setdate(response.result)
      }).catch((error) => {
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
      this.getprintrequst()
    }
  },
  computed: {
    initialIndex () {
      let index = 0
      index = findIndex(this.tabLabels, item => item.label === this.selectedLabel)
      return index
    }
  },
  mounted () {
    window.beCalledBLSuccess = this.beCalledBLSuccess
    this._downttup()
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
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
.scroll-wrapper
 overflow-x hidden
 overflow-y scroll
 padding-left 10px
 padding-right 10px
 height 440px
.tt_btn_div
 position absolute
 top 595px
 width 100%
 .ttput_div
  display flex
  justify-content space-between
  margin-left 10px
  margin-right 10px
  .ttput_col
      width 45%
.but_style
  height 10px
  line-height 1px

.ttput_title
  position relative
  padding-top 1px
  align-items center
  width 100%
  height 25px
  background #ecf8ff
  .div_images
   position absolute
   top 2px
   right 2px


.ttput_wrappers
 border 1px solid rgba(0, 0, 0, 0.1)
 border-radius 0 0 10px 10px
.ul_item
 height auto
 border-bottom:1px solid rgba(0, 0, 0, 0.1)
 position relative
 padding-bottom 3px
.div_image
 position absolute
 top 5px
 right 5px
.ttput_item
  display flex
  justify-content start
  margin-right 10px
  margin-left 10px
  font-size 13px
  .ttput_sp
    display flex
    justify-content start
    align-items center
    margin-top 5px
    width 50%
  .ttput_sp1
    margin-top 5px
    width 100%
    padding-top 2px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .ttput_sp3
    margin-top 5px
    width 50%
    padding-top 2px
    overflow hidden
    text-overflow ellipsis
    white-space nowrap
  .ttput_sp2
    margin-top 5px
    font-size 15px
    width 100%

.ttput_item2
 display flex
 align-items center
 width 100%
 height 26px
 margin-left 10px
 margin-right 10px   
.image_items
 width 20px
 height 20px
.img_edit
 width 15px
 height 15px
 margin-left 5px
</style>
