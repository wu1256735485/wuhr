<template>
  <div>
    <div class="common-ticket common-back" 
      v-for="(item, index) in list" 
      :key="item.tbpId"
    >
      <div class="ticket-unit">
        <li class="unit border">
          <p class="child">
            <span class="desc">批次号:</span>
            <span class="desc" @click.stop="handleContent(item.snbatch,'批次号')">{{item.snbatch}}</span>
          </p>
          <p class="child">
            <span class="desc">物料编码:</span>
            <span class="desc">{{item.materialCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">供应商名称:</span>
            <span class="desc" @click.stop="handleContent(item.supplierName,'供应商名称')">
              {{item.supplierName}}
            </span>
          </p>
          <p class="child">
            <span class="desc">是否绑定:</span>
            <span class="desc">{{item.isBindCriticalPart == '0' ? '未绑定' : '已绑定'}}</span>
          </p>
        </li>
        <li class="unit">
          <p 
            class="child" 
            v-show="item.childBind"
            @click.stop="handleChildIndex(index)"
          >
            <span class="desc" style="color:red" >子关键件</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">位置信息:</span>
            <span class="desc">
              <input type="text" v-model="item.position"
                style="width:200px"
                :disabled="true"
                class="child-text">
              <img src="static/edit@2x.png" alt="" 
                @click.stop="showPicker(item, index)">
            </span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">序列号:</span>
            <span class="desc">
              <input class="child-text"
                style="width:200px"
                v-model="item.sncode"
              />
            </span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">物料名称:</span>
            <span class="desc" @click.stop="handleContent(item.materialName,'物料名称')">{{item.materialName}}</span>
          </p>
        </li>
      </div>
      <div class="ticket-status" v-show="checked(item.tbpId)">
        <img src="static/yes.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { promptInfo } from 'common/js/dialog'
export default {
  props: {
    list: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      checkList: [],
      sncodeList: {},
      status: false,
      checkVal: '',
      currentIndex: -1  // 记录第几条数据被操作了
    }
  },
  computed: {
    ...mapGetters([
      'isSelect'
    ])
  },
  methods: {
    handleContent(content,name) {
      promptInfo(this, name, content)
    },
    handleChildIndex(index) {
      this.$emit('child-index', index)
    },
    // picker组件
    showPicker(data, index) {
      if (!data.positionlist.length) {
        return
      }
      this.currentIndex = index
      // if (!this.picker) {
        this.picker = this.$createPicker({
          title: '位置信息',
          alias: {value: 'value', text: 'value'},
          data: [data.positionlist],
          selectedIndex: [0],
          onSelect: this.selectHandle
        })
      // }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.$createDialog({
        type: 'warn',
        content: `位置信息:${selectedText}`,
        icon: 'cubeic-alert'
      }).show()
      this.$emit('poschange', this.currentIndex, selectedText)
      this.$forceUpdate()
    },
    checked(id) {
      return this.checkList.indexOf(id) < 0 ? this.status : !this.status
    }
  },
  watch: {
    isSelect(newVal) {
      if (!newVal) {
        return
      }
      this.checkList = []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
.scroll
  height calc(100% - 155px)
</style>