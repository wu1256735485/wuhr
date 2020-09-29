<template>
  <div :key="keys">
    <v-header :title="'异常详情'"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
            <div class="common-ticket common-active">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">工票号:</span>
            <span class="desc">{{data.ticketCode,}}</span>
          </p>
          <p class="child">
            <span class="desc">项目号:</span>
            <span class="desc">{{data.projectId}}</span>
          </p>
          <p class="child">
            <span class="desc">列号:</span>
            <span class="desc">{{data.trainNo}}</span>
          </p>
          
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">车号:</span>
            <span class="desc">{{data.carNo}}</span>
          </p>
          <p class="child">
            <span class="desc">车间:</span>
            <span class="desc">{{data.workshopCode}}</span>
          </p>
          <p class="child">
            <span class="desc">工区:</span>
            <span class="desc">{{data.workCenterNo}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket">
      <div class="ticket-unit">
        <li class="unit content">
          <p class="child">
            <span class="desc span-box" style="width: 65px">异常名称:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 250px"
                disabled
                v-model="data.exceptionName"
              />
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常分类:</span>
            <!-- <div>
              
            </div> -->
            <span>
            <span style="display: flex">
              <span style="display: flex; ">
              <!-- <div style="display: flex;"> -->
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc" style="margin-left: 5px">
                  <input 
                  type="text" 
                  class="child-text"
                  disabled
                  style="width: 80px"
                  v-model="data.exceptionBigTypeName"
                 />
                </span>
              <!-- </div> -->
            </span>
            <span style="display: flex; margin-left: 5px;">
              <!-- <div style="display: flex;"> -->
                <!-- <cube-button @click="showCscadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <input 
                  type="text" 
                  class="child-text"
                  disabled
                  style="width: 80px"
                  v-model="data.exceptionSmallTypeName"
                 />
                 </span>
              <!-- </div> -->
            </span>
            <span style="display: flex; margin-left: 5px;">
              <!-- <div style="display: flex;"> -->
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc" style="width: 80px">
                  <input 
                  type="text" 
                  class="child-text"
                  disabled
                  style="width: 80px"
                  v-model="data.exceptionTypeName"
                 >
                 </span>
              <!-- </div> -->
            </span>
            </span>

            </span>
            
          </p>
        </li>
        <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常原因:</span>
            <span class="desc" style="margin-left: 5px">
              <input
                type="text"
                class="child-text"
                style="width: 250px"
                disabled
                v-model="data.exceptionReasonName"
              />
            </span>
          </p>
        </li>
              <!-- ticketCode,projectId,trainNo,carNo,workshopCode,workCenterNo,exceptionName,exceptionBigTypeName,exceptionSmallTypeName, exceptionSmallTypeName,exceptionTypeName, exceptionReasonName,startUser,teamGroupCode,location,exceptionExtent-->

        <li class="unit content">
          <p class="child">
            <span class="desc span-box" style="width: 65px">发起人:</span>
            <span class="desc">
              <input type="text" class="child-text" style="width: 80px" v-model="data.startUser" disabled/>
            </span>
          </p>
          <p class="child">
            <span class="desc span-box" style="width: 58px">班组:</span>
            <span class="desc">
              <input type="text" class="child-text" style="width: 80px" readonly disabled  v-model="data.teamGroupCode" />
            </span>
          </p>
          
        </li>
         <!-- <li class="unit content">
           
        </li> -->
        <li class="unit content">
          <p class="child">
            <span class="desc span-box" style="width: 65px">位置:</span>
            <span class="desc">
              <input type="text" class="child-text" :style="inputWidth" v-model="data.location" disabled/>
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">影响范围:</span>
            <span class="desc" style="margin-left: 5px">
              <textarea class="child-text" :style="inputWidth" rows="2" v-model="data.exceptionExtent" disabled />
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child" style="display: flex;">
            <span class="desc span-box">备注:</span>
            <span class="desc" style="margin-left: 5px">
              <textarea class="child-text" :style="inputWidth" rows="2" v-model="data.remark" disabled />
            </span>
          </p>
        </li>
        <li class="unit">
              <p class="child">
                <span class="desc">图片:</span>
                <img
                  v-for="(item,index) in imgs"
                  :key="index"
                  :src="item"
                  @click="handleImgsClick(index)"
                  style="width: 70px;height: 70px"
                />
              </p>
            </li>
      </div>
    </div>
        <div class="common-ticket">
          <div class="ticket-unit">
            <li v-if="action ==='4'" class="unit content">
              <p class="child">
                <span class="desc span-box">处理内容:</span>
                <span class="desc">
                  <input
                    type="text"
                    class="child-text"
                    style="width: 180px"
                    v-model="model.content"
                  />
                </span>
              </p>
            </li>
            <li v-if="action ==='4'" class="unit content">
              <p class="child"  style="display: flex">
                <span class="desc span-box">处理措施:</span>
                
                <span style="display: flex; ">
              <div style="display: flex;">
                <span class="desc">
                  <input
                    type="text"
                    class="child-text"
                    style="width: 180px"
                    v-model="data.exceptionMeasure"
                  />
                  <!-- <cube-select
                    v-model="data.exceptionMeasure"
                    :options="contentOptions"
                    :autoPop="false"
                    style="padding: 0;
                          height: 20px;
                          width: 180px;
                          margin-left: 5px"
                  ></cube-select> -->
                </span>
              </div>
            </span>
              </p>
            </li>
            <li v-if="action ==='5'" class="unit content">
            <p class="child" style="display: flex;padding-top: 5px;">
              <span class="desc span-box">处理意见:</span>
              <span style="display: flex; ">
                <div style="display: flex;">
                  <span class="desc">
                    <cube-select
                      v-model="data.doOpinion"
                      :options="doOptions"
                      :autoPop="false"
                      style="padding: 0;
                            height: 20px;
                            width: 250px;
                            "
                    ></cube-select>
                  </span>
                </div>
              </span>
            </p>
            </li>
            <li class="unit content" v-if="data.doOpinion === '1'">
              <p class="child" style="display: flex">
              <span class="desc span-box">原因:</span>
              <span style="display: flex; ">
                  <span class="desc">
                    <input
                      type="text"
                      class="child-text"
                      style="width: 250px"
                      v-model="data.doOpinionReason"
                    />
                  </span>
              </span>
            </p>
            </li>
          <li class="unit content" v-if="action ==='1'">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常分类:</span>
            <!-- <div>
              
            </div> -->
            <span style="display: flex">
              <span style="display: flex; ">
              <div style="display: flex;">
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionBigTypeCode"
                    class="cubeSelect"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    :options="firstOptions"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            <span style="display: flex; margin-left: 5px;">
              <div style="display: flex;">
                <!-- <cube-button @click="showCscadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionSmallTypeCode"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    class="cubeSelect"
                    :options="secendOptions"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            <span style="display: flex; margin-left: 5px;">
              <div style="display: flex;">
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionTypeCode"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    class="cubeSelect"
                    :options="options"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            </span>
            
          </p>
        </li>

          </div>
        </div>
      </div>
    </div>
    <!-- <Footer> -->
    <div class="footer-btn">
      <div class="btn" @click="handleSend()">{{this.actionText}}</div>
      <!-- <cube-select v-model="value" :options="options">转发</cube-select> -->
      <div class="btn" @click="showAssign" v-if="action ==='1'">指派</div>
      <div class="btn" @click="handleSendForward" v-if="action ==='1'">转发</div>
    </div>
    <!-- </Footer> -->
  </div>
</template>

<script>
import VHeader from '../v-header/v-header';
import { getexception, handleException, getRoleByExceptionName, getUserByExceptionCode, getMeasureListByExceptionCode, getGroupUserListByGroupCode, getDeptGroupListByDeptCode, getTypeDeptList, getTypeList, getReasonListByExceptionCode, getUserByNfc, getExceptionTypeByParentId } from 'api/exception';

import { log } from 'common/js/dialog';
// import VFooter from "base/footer/footer";

const PRIORITY = {
  0: '一般',
  1: '紧急'
};
const ACTIONTYPE = {
  1: '响应',
  2: '指派',
  4: '处理',
  5: '关闭'
};
const DOOPTIONS = [{
  value: '0',
  text: '同意'
}, {
  value: '1',
  text: '不同意'
}]
export default {
  data() {
    return {
      id: '',
      model: {

      },
      actionText: '',
      data: {},
      businesskey: '',
      action: '',
      doOptions: DOOPTIONS,
      contentOptions: [],
      selectData: [],
      assignData: [],
      options: [],
      firstOptions: [],
      secendOptions: [],
      transRoleStr: '',
      inputWidth: {
        width: '250px'
      },
      imgs: [
      ]
      // model: {}
    };
  },
  created() {
    this.businesskey = this.$route.query.id;
    this.action = this.$route.query.action;
    this.taskid = this.$route.query.taskid;
    this.keys = this.$route.query.key
    this.actionText = ACTIONTYPE[this.$route.query.action];

    this.$nextTick(() => {
      this.getExceptionTypeList(undefined, 'firstOptions')
      // this.
      // getRoleByExceptionName().then(res => {
      //   if (res.data.msg === '操作成功') {
      //     this.selectData = res.data.data
      //     this.$createDialog({
      //       content: this.selectData
      //     }).show()
      //     this.selectData.forEach(item => {
      //       // this.$createDialog({
      //     //   content: this.keys
      //     // }).show()
      //       for (const key in item) {
      //         if (key === 'roleName') {
      //           item.content = item[key]
      //         }
      //       }
      //     })
      //     // try {

      //     // } catch (err) {
      //     //   this.$createDialog({
      //     //     content: err
      //     //   }).show()
      //     // }
      //   }
      // })

        // .catch(error => {
        //   this.$message.error('请检查网络');
        //   this.$createDialog({
        //     content: '11111'
        //   }).show()
        // });
    });
  },
  mounted() {
    // this.$createDialog({
    //   content: this.businesskey
    // }).show()
    this.getList()
        .then(res => {
          if (res.msg === '操作成功') {
            let { data } = res;
            delete data.id;
            if (data.photoPaths) {
              this.imgs = data.photoPaths.split(';')
            }

            // console.log(photoPaths)
            // this.imgs = data.base64FileName
            for (let key in data) {
              if (key === 'priority') {
                const value = data[key];
                data[key] = PRIORITY[value];
              }
            }
            this.data = data;
            console.log(data)
            // this.$createDialog({
            //   content: data
            // }).show()
            this.getContentOptions(data.exceptionTypeCode)
            getGroupUserListByGroupCode({exceptionGroupCode: data.exceptionTypeCode}).then(res => {
              this.assignData = res.data.data
              this.assignData.forEach(item => {
                for (const key in item) {
                  if (key === 'name') {
                    item.content = item[key]
                  }
                }
              })
            })
          }
        })
        .catch(err => {
          // this.$createDialog({
          //   content: err
          // }).show()
        })
  },
  destroyed() {
    this.model = {}
    this.data = {}
  },
  watch: {
    'data.doOpinion': function(nextValue, oldValue) {
      console.log(nextValue, '----', oldValue)
    },
    'model.exceptionBigTypeCode': function(nextValue, oldValue) {
      // this.getExceptionTypeList(nextValue, 'secendOptions');
      if (nextValue !== '') {
        console.log(this.firstOptions)
        // const data = this.firstOptions.filter(item => {
        //   return item.exceptionTypeCode === nextValue
        // })
        // console.log(data)
        // this.formData.exceptionBigName = data[0].exceptionTypeName || ''
        getTypeDeptList({ exceptionTypeCode: nextValue }).then(res => {
          console.log(res)
          let data = []
          res.data.data.rows.forEach(item => {
            // data = {
            //   value: item.exceptionDeptCode,
            //   text: item.exceptionDeptName
            // }
            data.push({
              value: item.exceptionDeptCode,
              text: item.exceptionDeptName
            })
          })
          this.secendOptions.push(...data)
          // this.secendOptions = res.data.data.rows
          // let data = {
          //     value: item.exceptionTypeCode,
          //     text: item.exceptionTypeName
          //   }

            // this[optionData].push(data)
        })
      }
    },
    'model.exceptionSmallTypeCode': function(nextValue, oldValue) {
      if (nextValue !== '') {
        getDeptGroupListByDeptCode({ exceptionDeptCode: nextValue }).then(res => {
          let data = []
          console.log(res.data)
          res.data.data.forEach(item => {
            data.push({
              value: item.exceptionGroupCode,
              text: item.exceptionGroupName
            })
          })
          console.log(data)
          this.options.push(...data)
        })
      }
      // this.getExceptionTypeList(nextValue, 'options');
      // this.$createDialog({
      //   content: '11111',
      //   type: 'confirm'
      // }).show()
    },
    'model.exceptionTypeCode': function(nextValue, oldValue) {
      const data = this.options.filter(item => {
        return item.exceptionTypeCode === nextValue
      })
      console.log(data)
      // this.model.exceptionTypeName = data[0].exceptionTypeName
      getReasonListByExceptionCode({ exceptionTypeCode: nextValue }).then(
        res => {
          if (res.data.msg === '操作成功') {
            const resultData = res.data.data
            resultData.forEach(item => {
              item.text = item.exceptionReason
              item.value = item.id
            })
            this.reasonOptions = resultData
          }
        }
      )
    }

  },
  methods: {
    handleSendForward() {
      this.transRoleStr = this.model.exceptionTypeCode
      this.handleSend('3').then(res => {
        log(this, res);
      })
    },
    // 查看照片
    handleImgsClick(index) {
      this.initialIndex = index
      const params = {
        $props: {
          imgs: this.imgs,
          initialIndex: 'initialIndex', // 响应式数据的key名
          loop: false
        },
        $events: {
          change: (i) => {
            // 必须更新 initialIndex
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },
    getExceptionTypeList(id = 0, optionData) {
      // console.log(optionData)
      getTypeList({ parentCode: id }).then(res => {
        // console.log(res);console.log(1111)
        if (res.data.code === 0) {
          // log(this, optionData)

          if (optionData === 'secendOptions') {
            this[optionData] = []
            this.options = []
          } else {
            this[optionData] = []
          }

          // console.log(res.data.data)
          res.data.data.rows.forEach(item => {
            let data = {
              value: item.exceptionTypeCode,
              text: item.exceptionTypeName
            }

            this[optionData].push(data)
          })
        }
      });
    },

    // 点击指派的下拉框
    showAssign() {
      const data = this.assignData
      this.$createActionSheet({
        title: '指派',
        data,
        onSelect: (item, index) => {
          this.assignUserId = item.userId
          this.handleSend('2').then(res => {
            log(this, res);
          })
          .catch(err => {
            console.log(err)
          })
        },
        onCancel: () => {
          this.$createToast({
            txt: `取消`,
            type: 'warn',
            time: 1000
          }).show()
        }
      }).show()
    },
    // 点击显示转发下拉框
    showActive() {
      const data = this.selectData
      // console.log(this.selectData)
      this.$createActionSheet({
        title: '转发',
        // active: 0,
        data,
        onSelect: (item, index) => {
          this.transRoleStr = item.roleId
          // console.log(item.roleId)
          this.handleSend('3').then(res => {
            log(this, res);
          })
          .catch(err => {
            console.log(err)
          })
        },
        onCancel: () => {
          this.$createToast({
            txt: `取消`,
            type: 'warn',
            time: 1000
          }).show()
        }
      }).show()
    },
    // 根据异常类型获取异常原因
    getContentOptions(exceptionTypeCode) {
      getMeasureListByExceptionCode({
        exceptionTypeCode
      }).then(res => {
        if (res.data.msg === '操作成功') {
          let resultData = res.data.data
          if (Array.isArray(resultData)) {
            resultData.forEach(item => {
              item.text = item.exceptionMeasure
              item.value = item.id
            })
          }
          this.contentOptions = res.data.data
        }
      })
    },
    // 提交表单 点击指派或者转发时接收action
    // 指派 action 2
    // 转发 action 3
    handleSend(action) {
      const model = Object.assign({}, this.data, {
        id: this.businesskey.replace(/^\s+|\s+$/g, ''),
        action: action || this.action,
        preTaskid: this.taskid.replace(/^\s+|\s+$/g, ''),
        transRoleStr: this.transRoleStr,
        assignUserId: this.assignUserId
      });
      // 过滤数据 null的时候改为''
      Object.keys(model).forEach(key => {
        if (model[key] == null) {
          model[key] = ''
        }
      })
      // console.log(model)
      const userId = sessionStorage.getItem('userInfo')
      delete model.createTime
      delete model.doBeginTime
      delete model.activitiEntity
      delete model.base64FileName
      delete model.closedTime
      delete model.nowNodeTime
      // model.createTime = Date.now()
      const promise = new Promise((resolve, reject) => {
        handleException(model).then(res => {
          // log(this, res)
          if (res.data.code === 500) {
            reject(res.data.msg)
            // this.$createDialog({
            //   type: 'confirm',
            //   content: res.data.msg
            // }).show()
          } else {
            resolve(res.data.msg)
            this.$createDialog({
              type: 'confirm',
              content: res.data.msg,
              onConfirm: () => {
                this.$router.go(-1)
              }
            }).show()
            return;
          }
        });
      })
      return promise
    },
    // 根据id获取异常详情信息
    getList() {
      let id = this.businesskey === '' ? undefined : this.businesskey;
      // this.$createDialog({
      //   content: id
      // }).show()
      const promise = new Promise((resolve, reject) => {
        // this.businesskey

        getexception(id).then(res => {
          if (res.data.code === 0) {
            // console.log(res.data)

            resolve(res.data);
          } else {
            reject(res.data);
          }
        });
      });
      return promise;
    }
  },
  components: {
    VHeader
    // VFooter
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.cube-my-popup {
  .cube-popup-message {
    color: #fff;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
  }
}

.inspect_div {
  padding: 5px;
  padding-left: 15px;
}

.inspect_div > div {
  display: flex;
  // display: -webkit-box;
  // display: -moz-box;
  // flex-wrap: wrap;
  // flex: 1;
  margin-bottom: 10px;
}

.inspect_div > div > li {
  margin-left: 10px;
}

.inspect_div > div > span {
  display: inline-block;
  width: 100px;
}

.inspect_div {
  margin-bottom: 10px;
}
.child .cubeSelect {
  padding: 0;
  height: 20px;
  width: 80px;
  margin-left: 1px;
}
.span-box {
  display: inline-block;
  width: 80px;
}
</style>

