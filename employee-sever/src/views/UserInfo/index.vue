<template>
  <a-descriptions
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
  </a-descriptions>

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
