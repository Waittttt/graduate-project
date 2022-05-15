<template>
  <div class="login">
    <div class="login_box">
      <!--头像-->
      <div class="avtar-box">
        <img src="../assets/logo.png" alt="" />
      </div>
      <!--登录区域-->
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

    async function login () {
      const params = {
        ...form.value
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
        console.log(data)
        const userInfo = data.data
        localStorage.setItem('username', userInfo.username)
        localStorage.setItem('department', userInfo.department)
        localStorage.setItem('userid', userInfo.id)
        router.push('/attendance')
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
