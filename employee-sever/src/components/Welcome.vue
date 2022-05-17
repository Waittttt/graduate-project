<template>
  <a-row class="home" :gutter="20">
    <a-col :span="8">
      <a-card hoverable style="height: 452px">
        <div class="user">
          <img src="../assets/icon.webp" />
          <div class="userinfo">
            <p class="name">{{applyData.username}}</p>
            <!-- <p class="access">管理员</p> -->
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>{{dayjs(new Date()).format('YYYY-MM-DD')}}</span></p>
        </div>
      </a-card>
    </a-col>
    <a-col :span="16">
      <div class="num">
        <a-card
          style="width: 32%; margin-bottom: 20px; padding: 0"
          :bodyStyle="{ padding: 0, display: 'flex' }"
          hoverable
        >
          <div class="icon" style="background: #ffb980">
            <PieChartOutlined />
          </div>
          <div class="detail">
            <p class="number">{{applyData.attendance}}</p>
            <p class="text">考勤补签申请</p>
          </div>
        </a-card>
        <a-card
          style="width: 32%; margin-bottom: 20px"
          :bodyStyle="{ padding: 0, display: 'flex' }"
          hoverable
        >
          <div class="icon" style="background: #5ab1ef">
            <InboxOutlined />
          </div>
          <div class="detail">
            <p class="number">{{applyData.work}}</p>
            <p class="text">加班申请</p>
          </div>
        </a-card>
        <a-card
          style="width: 32%; margin-bottom: 20px"
          :bodyStyle="{ padding: 0, display: 'flex' }"
          hoverable
        >
          <div class="icon" style="background: #2ec7c9">
            <DesktopOutlined />
          </div>
          <div class="detail">
            <p class="number">{{applyData.device}}</p>
            <p class="text">资产设备申请</p>
          </div>
        </a-card>
      </div>
      <a-card hoverable>
        <!-- <Echart style="height: 280px" /> -->
        <div  id="main" style="height:280px"></div>
      </a-card>
    </a-col>
  </a-row>
</template>

<script>
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'
import axios from 'axios'
import { baseURL } from '../utils/constant'
// import Echart from '../components/Echarts.vue'
import * as echarts from 'echarts'
import {
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined

} from '@ant-design/icons-vue'
export default {
  components: {
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined
  },
  setup () {
    const applyData = ref({
      username: localStorage.getItem('username'),
      attendance: 0,
      work: 0,
      device: 0
    })
    async function getData () {
      const params = {
        id: localStorage.getItem('userid')
      }
      try {
        const { data } = await axios.get(`${baseURL}/welcome`, { params })
        applyData.value = { ...applyData.value, ...data.data }
      } catch (error) {}
    }

    onMounted(async () => {
      await getData()
      const myChart = echarts.init(document.getElementById('main'))

      const axisOption = ref({
        // xAxis: { type: 'category', data: ['考勤异常', '加班申请', '资产申请'] },
        // yAxis: { type: 'value' },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        tooltip: {
          show: true,
          trigger: 'item'
        },
        series: [
          {
            radius: ['30%', '80%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: applyData.value.attendance, name: '考勤异常' },
              { value: applyData.value.work, name: '加班申请' },
              { value: applyData.value.device, name: '资产申请' }
              ],
            type: 'pie'
          }
        ]
      })
      console.log(applyData.value.attendance, applyData.value.work)
      myChart.setOption(axisOption.value)
    })
    return {
      applyData,
      dayjs
    }
  }
}
</script>

<style scoped>
.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.graph {
  display: flex;
  justify-content: space-between;
}
.user {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #ccc;
}

.user img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 40px;
}
.userinfo .name {
  font-size: 32px;
  margin-bottom: 10px;
}
.userinfo .access {
  color: #999999;
}

.login-info {
}
.login-info p {
  line-height: 28px;
  font-size: 14px;
  color: #999999;
}
.login-info span {
  color: #666666;
  margin-left: 60px;
}
.icon {
  font-size: 30px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}
.detail {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.number {
  font-size: 30px;
  margin-bottom: 10px;
}
.text {
  font-size: 14px;
  text-align: center;
  color: #999999;
}
</style>
