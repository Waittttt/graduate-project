<template>
  <!-- <a-descriptions
    title="个人信息"
    bordered
    :column="{ xxl: 4, xl: 1, lg: 1, md: 1, sm: 2, xs: 1 }"
  >
    <a-descriptions-item label="姓名">{{userInfo.username}}</a-descriptions-item>
    <a-descriptions-item label="性别">{{userInfo.sex}}</a-descriptions-item>
    <a-descriptions-item label="年龄">{{userInfo.age}}</a-descriptions-item>
    <a-descriptions-item label="职位">{{userInfo.job}}</a-descriptions-item>
    <a-descriptions-item label="办公地点">{{userInfo.position}}</a-descriptions-item>
    <a-descriptions-item label="部门">{{userInfo.department}}</a-descriptions-item>
    <a-descriptions-item label="电话号码">{{userInfo.phone}}</a-descriptions-item>
    <a-descriptions-item label="邮箱地址">{{userInfo.email}}</a-descriptions-item>
    <a-descriptions-item label="家庭住址">{{userInfo.address}}</a-descriptions-item>
  </a-descriptions> -->
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        个人信息
      </h3>
    </div>
    <div class="border-t border-gray-200">
      <dl>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">姓名</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
           {{userInfo.username}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">性别</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.sex}}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">年龄</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
           {{userInfo.age}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">职位</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.job}}
          </dd>
        </div>
        <div
          class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
        >
          <dt class="text-sm font-medium text-gray-500">办公地点</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.position}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">部门</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.department}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">电话号码</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.phone}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">邮箱地址</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.email}}
          </dd>
        </div>
        <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">家庭住址</dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{userInfo.address}}
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'
import { baseURL } from '../../utils/constant'
export default {
  setup () {
    const userInfo = ref({
      username: '',
      job: '',
      department: '',
      phone: '',
      email: '',
      age: '',
      sex: ''
    })
    async function getUser () {
      try {
        const { data } = await axios.get(
          `${baseURL}/user/${localStorage.getItem('userid')}`
        )
        console.log(data)
        userInfo.value = data.data[0]
      } catch (error) {}
    }

    getUser()
    return {
      userInfo
    }
  }
}
</script>
