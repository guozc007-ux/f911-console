<template>
  <div class="login-page">
    <div class="particles">
      <span v-for="i in 20" :key="i" class="particle"></span>
    </div>
    <div class="login-card">
      <div class="login-header">
        <el-icon class="user-icon"><UserFilled /></el-icon>
        <h2 class="title">欢迎登录</h2>
        <p class="subtitle">请输入您的账号和密码</p>
      </div>
      <el-form :model="form" class="login-form">
        <el-form-item>
          <el-input
            v-model="form.account"
            placeholder="请输入账号"
            size="large"
            :prefix-icon="User"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            show-password
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item class="captcha-item">
          <el-input
            v-model="form.captcha"
            placeholder="请输入验证码"
            size="large"
            :prefix-icon="CircleCheck"
            class="captcha-input"
          />
          <div class="captcha-image">
            <img v-if="captchaUrl" :src="captchaUrl" @click="refreshCaptcha" />
            <span v-else class="captcha-placeholder" @click="refreshCaptcha">
              点击获取
            </span>
          </div>
        </el-form-item>
        <el-button
          type="primary"
          size="large"
          class="login-btn"
          :loading="loading"
          @click="handleLogin"
        >
          <el-icon><Lock /></el-icon>
          登录
        </el-button>
      </el-form>
      <p class="footer-text">志多星云管系统</p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { User, Lock, CircleCheck, UserFilled } from '@element-plus/icons-vue'
import { useAuthStore } from '../../stores/auth'
import { getCaptcha, login } from '../../api/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)
const captchaUrl = ref('')
const captchaUniqId = ref('')

const form = reactive({
  account: '',
  password: '',
  captcha: '',
})

const refreshCaptcha = async () => {
  try {
    const res = await getCaptcha()
    if (res.code === 200) {
      captchaUrl.value = res.data.image
      captchaUniqId.value = res.data.uniqId
    }
  } catch (error) {
    ElMessage.error('获取验证码失败')
  }
}

const handleLogin = async () => {
  if (!form.account) {
    ElMessage.warning('请输入账号')
    return
  }
  if (!form.password) {
    ElMessage.warning('请输入密码')
    return
  }
  if (!form.captcha) {
    ElMessage.warning('请输入验证码')
    return
  }

  loading.value = true
  try {
    const res = await login({
      account: form.account,
      password: form.password,
      captcha: form.captcha,
      uniqId: captchaUniqId.value,
    })
    if (res.code === 200) {
      authStore.setToken(res.data.token)
      authStore.setUserInfo(res.data.user)
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error(res.msg || '登录失败')
      refreshCaptcha()
    }
  } catch (error) {
    ElMessage.error('登录失败')
    refreshCaptcha()
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  refreshCaptcha()
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;
}

.particles {
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  animation: float 15s infinite;
}

.particle:nth-child(1) { left: 10%; animation-delay: 0s; }
.particle:nth-child(2) { left: 20%; animation-delay: 1s; }
.particle:nth-child(3) { left: 30%; animation-delay: 2s; }
.particle:nth-child(4) { left: 40%; animation-delay: 3s; }
.particle:nth-child(5) { left: 50%; animation-delay: 4s; }
.particle:nth-child(6) { left: 60%; animation-delay: 5s; }
.particle:nth-child(7) { left: 70%; animation-delay: 6s; }
.particle:nth-child(8) { left: 80%; animation-delay: 7s; }
.particle:nth-child(9) { left: 90%; animation-delay: 8s; }
.particle:nth-child(10) { left: 15%; animation-delay: 9s; }
.particle:nth-child(11) { left: 25%; animation-delay: 10s; }
.particle:nth-child(12) { left: 35%; animation-delay: 11s; }
.particle:nth-child(13) { left: 45%; animation-delay: 12s; }
.particle:nth-child(14) { left: 55%; animation-delay: 13s; }
.particle:nth-child(15) { left: 65%; animation-delay: 0.5s; }
.particle:nth-child(16) { left: 75%; animation-delay: 1.5s; }
.particle:nth-child(17) { left: 85%; animation-delay: 2.5s; }
.particle:nth-child(18) { left: 5%; animation-delay: 3.5s; }
.particle:nth-child(19) { left: 95%; animation-delay: 4.5s; }
.particle:nth-child(20) { left: 50%; animation-delay: 5.5s; }

@keyframes float {
  0%, 100% {
    transform: translateY(100vh) scale(0);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-100vh) scale(1);
    opacity: 0;
  }
}

.login-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 40px;
  width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.18);
  z-index: 1;
}

.login-header {
  text-align: center;
  margin-bottom: 30px;
}

.user-icon {
  font-size: 48px;
  color: #fff;
  margin-bottom: 16px;
}

.title {
  font-size: 24px;
  color: #fff;
  margin: 0 0 8px 0;
  font-weight: 500;
}

.subtitle {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
}

.login-form :deep(.el-input__wrapper) {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  box-shadow: none;
}

.login-form :deep(.el-input__inner) {
  color: #fff;
}

.login-form :deep(.el-input__inner::placeholder) {
  color: rgba(255, 255, 255, 0.6);
}

.login-form :deep(.el-input__icon) {
  color: rgba(255, 255, 255, 0.7);
}

.captcha-item {
  display: flex;
  gap: 10px;
}

.captcha-input {
  flex: 1;
}

.captcha-image {
  width: 100px;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
}

.captcha-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.captcha-placeholder {
  color: rgba(255, 255, 255, 0.7);
  font-size: 12px;
}

.login-btn {
  width: 100%;
  margin-top: 10px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  height: 44px;
  font-size: 16px;
}

.login-btn:hover {
  background: linear-gradient(135deg, #7688f0 0%, #865bb8 100%);
}

.footer-text {
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 0;
}
</style>
