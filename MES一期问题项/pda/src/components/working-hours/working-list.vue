<template>
  <div>
    <div class="common-ticket common-active" v-show="mes.code">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">员工姓名:</span>
            <span class="desc">{{mes.name}}</span>
          </p>
          <p class="child">
            <span class="desc">工票总数:</span>
            <span class="desc">{{mes.tickCount}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">计划工时:</span>
            <span
              class="desc"
            >{{mes.plannedWorking ? mes.plannedWorking + '分钟' : mes.plannedWorking}}</span>
          </p>
          <p class="child">
            <span class="desc">实际工时:</span>
            <span
              class="desc"
            >{{mes.workingHoursCount ? mes.workingHoursCount + '分钟' : mes.workingHoursCount}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket" v-for="item in list">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{item.orderNo}}</span>
          </p>
          <p class="child" @click.stop="handleInfos('工票号',item.ticketCode)">
            <span class="desc">工票号:</span>
            <span class="desc">{{item.ticketCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{item.count}}</span>
          </p>
          <p class="child" @click.stop="handleInfos('首次开工时间',item.startTime)">
            <span class="desc">首次开工时间:</span>
            <span class="desc">{{item.startTime}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">实际工时:</span>
            <span class="desc">{{item.workingHours ? item.workingHours + '分钟' : item.workingHours}}</span>
          </p>
          <p class="child" @click.stop="handleInfos('零件名称',item.partName)">
            <span class="desc">零件名称:</span>
            <span class="desc">{{item.partName}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">报工时间:</span>
            <span class="desc">{{item.reportTime}}</span>
          </p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
import { promptInfo } from 'common/js/dialog'
export default {
  props: {
    mes: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods : {
    handleInfos(title, item) {
      promptInfo(this, title, item)
    },
  }
};
</script>

<style>
</style>