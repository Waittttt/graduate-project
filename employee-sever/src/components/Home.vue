<template>
  <a-layout class="home-container">
    <a-layout-header class="header">
      <div>
        <span>员工自助后台</span>
      </div>
      <a-button type="primary">退出</a-button>
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
              <span>考勤异常</span>
            </a-menu-item>
            <a-menu-item key="2">
              <template #icon>
                <DesktopOutlined />
              </template>
              <span>节假日加班</span>
            </a-menu-item>
            <a-menu-item key="3">
              <template #icon>
                <InboxOutlined />
              </template>
              <span>IT资产申请</span>
            </a-menu-item>
          </a-menu>
        </div>
      </a-layout-sider>
      <a-layout-content>Content</a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    return {}
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
</style>
