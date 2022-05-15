<template>
  <a-layout class="home-container">
    <a-layout-header class="header">
      <div>
        <span>员工自助后台</span>
      </div>
      <a-button type="primary" @click="loginOut">退出</a-button>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="sider">
        <div>
          <a-menu
            v-model:openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            mode="inline"
            theme="dark"
            :inline-collapsed="collapsed"
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
import { defineComponent } from 'vue'
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

    function loginOut () {
      router.push('/login')
    }
    return {
      loginOut
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
