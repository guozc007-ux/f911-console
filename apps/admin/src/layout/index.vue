<template>
  <div class="layout-container">
    <!-- 侧边栏 -->
    <aside class="sidebar">
      <!-- Logo区域 -->
      <div class="sidebar-header">
        <div class="logo">
          <span class="logo-main">F911电竞</span>
        </div>
      </div>

      <!-- 菜单 -->
      <el-menu
        :default-active="activeMenu"
        router
        class="sidebar-menu"
        background-color="#1a1a2e"
        text-color="#8c8c9a"
        active-text-color="#fff"
      >
        <div class="menu-title">平台数据看板</div>

        <el-menu-item index="/data_board">
          <el-icon><DataLine /></el-icon>
          <span>平台数据看板</span>
        </el-menu-item>

        <el-menu-item index="/player_board">
          <el-icon><TrendCharts /></el-icon>
          <span>陪玩数据看板</span>
        </el-menu-item>

        <div class="menu-title">老板管理</div>

        <el-sub-menu index="/boss">
          <template #title>
            <el-icon><UserFilled /></el-icon>
            <span>老板信息</span>
          </template>
          <el-menu-item index="/boss_consume">老板消费记录</el-menu-item>
          <el-menu-item index="/boss_list">老板信息管理</el-menu-item>
          <el-menu-item index="/boss_recharge">老板充值记录</el-menu-item>
          <el-menu-item index="/boss_type_list">老板类型管理</el-menu-item>
        </el-sub-menu>

        <div class="menu-title">陪玩管理</div>

        <el-sub-menu index="/player">
          <template #title>
            <el-icon><Service /></el-icon>
            <span>陪玩信息</span>
          </template>
          <el-menu-item index="/player_list">陪玩信息管理</el-menu-item>
          <el-menu-item index="/player_order">陪玩派单管理</el-menu-item>
          <el-menu-item index="/player_bill">陪玩报单审核</el-menu-item>
          <el-menu-item index="/player_withdraw">陪玩提现审核</el-menu-item>
        </el-sub-menu>

        <div class="menu-title">基础数据</div>

        <el-menu-item index="/game_category">
          <el-icon><Game /></el-icon>
          <span>游戏分类管理</span>
        </el-menu-item>

        <el-menu-item index="/order_customer">
          <el-icon><ChatDotRound /></el-icon>
          <span>客服信息管理</span>
        </el-menu-item>

        <div class="menu-title">系统管理</div>

        <el-menu-item index="/role_list">
          <el-icon><Lock /></el-icon>
          <span>职位权限管理</span>
        </el-menu-item>
      </el-menu>

      <!-- 底部广告 -->
      <div class="sidebar-footer">
        <span>志多星云管系统</span>
      </div>
    </aside>

    <!-- 主内容区 -->
    <div class="main-wrapper">
      <header class="header">
        <div class="header-right">
          <el-dropdown @command="handleCommand">
            <span class="user-info">
              <el-icon><Avatar /></el-icon>
              {{ authStore.userInfo?.account || '管理员' }}
              <el-icon><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="logout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </header>

      <main class="main-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const activeMenu = computed(() => route.path)

const handleCommand = (command) => {
  if (command === 'logout') {
    authStore.logout()
    router.push('/login')
  }
}
</script>

<style scoped>
.layout-container {
  display: flex;
  height: 100vh;
  background-color: #f5f7fa;
  overflow: hidden;
}

/* 侧边栏 */
.sidebar {
  width: 220px;
  background-color: #1a1a2e;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.sidebar-header {
  padding: 20px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-main {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  letter-spacing: 2px;
}

.logo-sub {
  font-size: 12px;
  color: #4facfe;
  margin-left: 8px;
}

/* 菜单 */
.sidebar-menu {
  flex: 1;
  border-right: none;
  padding: 12px 0;
}

.sidebar-menu::-webkit-scrollbar {
  width: 4px;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
}

.menu-title {
  padding: 16px 20px 8px;
  font-size: 12px;
  color: #4a4a5a;
  text-transform: uppercase;
  letter-spacing: 1px;
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
  height: 48px;
  line-height: 48px;
  padding-left: 20px !important;
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.3s;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
  background-color: rgba(79, 172, 254, 0.15) !important;
  color: #fff !important;
}

:deep(.el-menu-item.is-active) {
  background: linear-gradient(90deg, #4facfe, #00f2fe) !important;
  color: #fff !important;
}

:deep(.el-sub-menu .el-menu-item) {
  padding-left: 48px !important;
  height: 42px;
  line-height: 42px;
}

:deep(.el-sub-menu .el-menu-item.is-active) {
  background: rgba(79, 172, 254, 0.2) !important;
}

:deep(.el-icon) {
  margin-right: 12px;
  font-size: 18px;
}

/* 底部广告 */
.sidebar-footer {
  padding: 16px;
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(79, 172, 254, 0.1);
}

.sidebar-footer span {
  font-size: 12px;
  color: #4facfe;
  letter-spacing: 1px;
}

/* 主内容区 */
.main-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 24px;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.3s;
}

.user-info:hover {
  background-color: #f5f7fa;
}

.main-content {
  flex: 1;
  overflow-y: auto;
  padding: 0;
  position: relative;
}
</style>
