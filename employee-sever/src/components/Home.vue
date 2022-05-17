<template>
  <a-layout class="home-container">
    <a-layout-header class="header">
      <div>
        <span>员工自助后台</span>
      </div>
      <div>
        <span style="margin-right:5px">你好,{{username}}</span>
        <a-button type="primary" danger @click="loginOut">退出</a-button>
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
          <a-menu-item key="0">
              <template #icon>
                  <HomeOutlined />
                </template>
              <router-link to="/welcome">
                <span>首页</span>
              </router-link>
            </a-menu-item>
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
                <span>加班申请</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="3">
              <template #icon>
                <DesktopOutlined />
              </template>
              <router-link to="/applydevice">
                <span>资产申请</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="4">
              <template #icon>
                <UserDeleteOutlined />
              </template>
              <router-link to="/usermng">
                <span>用户管理</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="5">
              <template #icon>
                <UserDeleteOutlined />
              </template>
              <router-link to="/userinfo">
                <span>个人中心</span>
              </router-link>
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
  InboxOutlined,
  HomeOutlined,
  UserDeleteOutlined
} from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    HomeOutlined,
    PieChartOutlined,
    DesktopOutlined,
    InboxOutlined,
    UserDeleteOutlined
  },
  setup () {
    const router = useRouter()
    const selectedKeys = ref(['0'])
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
  background-color: rgba(79, 70, 229);
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
