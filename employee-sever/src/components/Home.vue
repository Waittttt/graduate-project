<template>
  <a-layout class="home-container">
    <a-layout-header class="header">
      <div>
        <span>员工自助后台</span>
      </div>
      <div>
        <span style="margin-right:5px">你好,{{username}}</span>
        <a-button type="primary" @click="loginOut">退出</a-button>
      </div>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider">
        <div>
          <a-menu
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            theme="dark"

          >
            <a-menu-item key="1">
              <template #icon>
                  <PieChartOutlined />
                </template>
              <router-link to="/attendance">
                <span>考勤异常</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon>
                <InboxOutlined />
              </template>
              <router-link to="/applywork">
                <span>节假日加班申请</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <template #icon>
                <DesktopOutlined />
              </template>
              <span>IT资产申请</span>
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout-content class="content_area">
        <div class="content_box">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  PieChartOutlined,
  DesktopOutlined,
  InboxOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined
  },
  setup () {
    const router = useRouter()
    const selectedKeys = ref(['1'])
    const username = ref(localStorage.getItem('username'))

    function loginOut () {
      localStorage.removeItem('username')
      localStorage.removeItem('userid')
      router.push('/login')
    }
    return {
      loginOut,
      selectedKeys,
      username
    }
  }
})
</script>

<style lang="scss" scoped>
.home-container {
  height: 100%;
}
.header {
  background-color: #23ade5;
  font-size: 18px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sider {
  color: white;
}
.content_area{
  padding: 10px;
}
.content_box{
  border: 1px solid #fff;
  box-shadow: 0 0 10px #eee;
  height:100%;
}
</style>
