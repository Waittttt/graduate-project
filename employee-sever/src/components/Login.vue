<template>
  <!-- <div class="login">
    <div class="login_box">
      <div class="avtar-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <a-form
      ref="formRef"
        :model="form"
        name="basic"
        :label-col="{ span: 4 }"
        :wrapperCol="{span:16}"
        autocomplete="off"
        class="login_form"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="username"
          :rules="[{ required: true, message: '请输入用户名' }]"
        >
          <a-input v-model:value="form.username" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: '请输入密码' }]"
        >
          <a-input-password v-model:value="form.password"  />
        </a-form-item>
        <a-form-item class="btn">
          <a-button type="primary" html-type="submit" @click="login">登录</a-button>
          <a-button style="margin-left:10px" @click="reset">重置</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div> -->
  <div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">员工自助后台</h2>
    </div>
    <div class="mt-8 space-y-6" >
      <input type="hidden" name="remember" value="true">
      <div class="rounded-md shadow-sm -space-y-px">
        <div>
          <input v-model="form.username"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="请输入用户名">
        </div>
        <div>
          <input v-model="form.password" type="password"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="请输入密码">
        </div>
      </div>

      <div>
        <button @click="login"  class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="absolute left-0 inset-y-0 flex items-center pl-3">
            <!-- Heroicon name: solid/lock-closed -->
            <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
            </svg>
          </span>
          登录
        </button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'
import { baseURL } from '../utils/constant.js'
import { useRouter } from 'vue-router'
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'

export default defineComponent({
  setup () {
    const router = useRouter()
    const formRef = ref(null)
    const form = ref({
      username: '',
      password: ''
    })

    function checkForm (form) {
      if (!form.username) {
        return '请输入用户名'
      }
      if (!form.password) {
        return '请输入密码'
      }
      return true
    }

    async function login () {
      const params = {
        ...form.value
      }

      const validate = checkForm(params)
      if (validate !== true) {
        message.error(validate)
        return
      }

      try {
        const { data } = await axios.post(`${baseURL}/login`, {
          ...params
        })
        if (data.code !== 200) {
          message.error(data.msg)
          return
        }
        message.success(data.msg)
        const userInfo = data.data
        localStorage.setItem('username', userInfo.username)
        localStorage.setItem('department', userInfo.department)
        localStorage.setItem('userid', userInfo.id)
        localStorage.setItem('auth', userInfo.auth)
        router.push('/welcome')
      } catch (error) {

      }
    }

    function reset () {
      formRef.value.resetFields()
    }

    return {
      formRef,
      form,
      reset,
      login
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  background: #ff6700;
}
.login_box {
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avtar-box {
    width: 130px;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #eee;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}
.login_form{
  position:absolute;
  bottom: 0;
  width: 100%;
  padding: 0 30px;
  box-sizing: border-box;
}

.btn{
  display: flex;
  justify-content: end;
}
</style>
