<template>
<div>
  <div class="wrapper" @click.stop="handleXlh" v-show="matchXlhStatus">
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
  <ul class="list"  v-show="matchXlhStatus">
    <h1 class="title"><p style="margin-right:10px" @click="changeShow">取消</p>搜索序列号<p style="margin-right:10px" @click="checkXlh(query)">确定</p></h1>
    <cube-input v-model="query" class="search" :clearable="true" :placeholder="'请输入序列号'"></cube-input>
    <cube-scroll :data="result" ref="scroll" class="cube-hi">
      <li 
        class="list-match" 
        v-for="(item) in result" 
        @click.stop="checkXlh(item)">{{item}}</li>
    </cube-scroll>
  </ul>
</div>
  
</template>

<script>
import { mapGetters, mapMutations } from 'vuex';
import { searchMatch } from 'api/match';

let task;

export default {
  props: {
    list: {
      type: Array,
      default: () => []
    },
    matchCode: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      query: '',
      message: '',
      matchObj: {
        partNo: '', // 物料编码
        partName: '' // 序列号名称
      },
      result: []
    };
  },
  computed: {
    ...mapGetters(['matchXlhStatus'])
  },
  mounted() {
    console.log(this.$refs.scroll)
  },
  methods: {
    handleXlh() {
      this.setMatchXlhStatus(false)
    },
    //点击取消弹框
    changeShow() {
      this.setMatchXlhStatus(false);
    },
    // 序列号模糊查询
    search() {
      this.result = [];
      this.list.findIndex(item => {
        if (item.XLH.indexOf(this.query) >= 0) {
          this.result.push(item);
        }
      });
    },
    // 序列号选中
    checkXlh(item) {
      this.$emit('xlh', { snCode: item });
      this.setMatchXlhStatus(false);
    },
    // 搜索序列号
    _searchMatch(data) {
      data.partNo = this.matchCode;
      searchMatch(data)
        .then(res => {
          if (res.result.start == 200) {
            this.result = res.result.mes;
          } else {
            this.showPopup('myPopup', '获取数据失败');
            return;
          }
        })
        .catch(err => {
          console.log(err);
          this.showPopup("myPopup", process.env.WARNING_INFO);
          return;
        });
    },
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 2000);
    },
    ...mapMutations({
      setMatchXlhStatus: 'SET_MATCHXLH_STATUS'
    })
  },
  watch: {
    query(newVal) {
      if (!newVal) {
        return;
      }
      if (task) {
        clearTimeout(task);
      }
      task = setTimeout(() => {
        this.matchObj.partName = newVal;
        this._searchMatch(this.matchObj);
      }, 300);
    }
  }
};
</script>

<style lang="stylus" scoped>
.wrapper
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index 1

  .cube-my-popup
    .cube-popup-message
      color: #fff;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);

.list 
  width: 65%;
  height: 200px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #ecf8ff;
  position: fixed;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -40%);
  border-radius: 6px;
  overflow-y: scroll;
  z-index 6
  .title
    line-height: 35px;
    color: #3b85e6;
    font-size: 16px;
    font-weight: bolder;
    text-align: center;
    p
      float:right
  .search
    width: 80%;
    height: 30px;
    margin-left: 10%;
    margin-top: 5px;
    overflow: hidden;
  .cube-hi
    height 65%;
    .list-match
      line-height: 30px;
      font-size: 14px;
      box-sizing: border-box;
      text-align: center;
</style>