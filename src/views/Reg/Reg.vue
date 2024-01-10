<template>
  <!-- 注册页面的整体盒子 -->
  <div class="reg-container">
    <!-- 注册的盒子 -->
    <div class="reg-box">
      <!-- 标题的盒子 -->
      <div class="title-box"></div>
      <!-- 注册的表单区域 -->
      <el-form
          :model="loginForm"
          :rules="loginRules"
          ref="loginForm"
          class="reg-form"
        >
          <el-form-item prop="username">
            <el-input prefix-icon="el-icon-user" placeholder="请输入用户名" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input prefix-icon="el-icon-lock" placeholder="请输入密码" type="password" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="password2">
            <el-input prefix-icon="el-icon-lock" placeholder="请确认密码" type="password" v-model="loginForm.password2"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button style="width: 100%" type="primary" @click="submitForm('loginForm')">注册</el-button>
            <el-link @click="resetForm('loginForm')">去登陆</el-link>
          </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Reg',
  data () {
    const checkPassword = (rule, value, callback) => {
      if (value !== this.loginForm.password) {
        callback(new Error('两次输入的密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: '',
        password2: ''
      },
      loginRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { pattern: /^[a-zA-Z0-9]{5,20}$/, message: '请输入 5 ~ 20 位的数字或字母', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { pattern: /^\S{6,20}$/, message: '请输入 6 ~ 20 位的非空字符', trigger: 'blur' }
        ],
        password2: [
          { required: true, message: '请再次输入密码', trigger: 'blur' },
          { pattern: /^\S{6,20}$/, message: '请输入 6 ~ 20 位的非空字符', trigger: 'blur' },
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$axios.post('/api/reg', {
          username: this.loginForm.username,
          password: this.loginForm.password,
          repassword: this.loginForm.password2
        })
        if (res.code !== 0) return this.$message.error(res.message)
        this.$message.success(res.message)
        this.$router.push('/login')
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;
  height: 100%;

  .reg-box {
    width: 400px;
    height: 335px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }

    .reg-form {
      padding: 0 20px;
    }
  }
}
</style>
