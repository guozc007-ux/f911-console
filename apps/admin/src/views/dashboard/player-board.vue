<template>
  <div class="dashboard">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="header-left">
        <h2>陪玩数据看板</h2>
        <span class="update-time">更新时间：{{ currentTime }}</span>
      </div>
      <div class="header-right">
        <el-radio-group v-model="timeRange" @change="handleTimeRangeChange">
          <el-radio-button value="7">近一周</el-radio-button>
          <el-radio-button value="30">近一个月</el-radio-button>
          <el-radio-button value="365">近一年</el-radio-button>
          <el-radio-button value="custom">自定义</el-radio-button>
        </el-radio-group>
        <el-date-picker
          v-if="timeRange === 'custom'"
          v-model="customDateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="default"
          style="margin-left: 8px;"
          @change="handleTimeRangeChange"
        />
      </div>
    </div>

    <!-- 三个统计卡片 -->
    <div class="stats-cards-row">
      <!-- 卡片1：总接单额 -->
      <div class="big-stat-card">
        <div class="big-stat-card__header">
          <span class="big-stat-card__title">总接单额</span>
        </div>
        <div class="big-stat-card__body">
          <div class="stat-item">
            <span class="stat-item__label">总接单额</span>
            <span class="stat-item__value primary">¥{{ formatMoney(stats.totalOrderAmount) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">游戏单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.gameOrderAmount) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">礼物单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.giftOrderAmount) }}</span>
          </div>
        </div>
      </div>

      <!-- 卡片2：游戏单 -->
      <div class="big-stat-card">
        <div class="big-stat-card__header">
          <span class="big-stat-card__title">游戏单</span>
        </div>
        <div class="big-stat-card__body">
          <div class="stat-item">
            <span class="stat-item__label">游戏单</span>
            <span class="stat-item__value primary">¥{{ formatMoney(stats.gameOrderAmount) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">男陪游戏单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.maleGameOrder) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">女陪游戏单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.femaleGameOrder) }}</span>
          </div>
        </div>
      </div>

      <!-- 卡片3：礼物单 -->
      <div class="big-stat-card">
        <div class="big-stat-card__header">
          <span class="big-stat-card__title">礼物单</span>
        </div>
        <div class="big-stat-card__body">
          <div class="stat-item">
            <span class="stat-item__label">礼物单</span>
            <span class="stat-item__value primary">¥{{ formatMoney(stats.giftOrderAmount) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">男陪礼物单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.maleGiftOrder) }}</span>
          </div>
          <div class="stat-item">
            <span class="stat-item__label">女陪礼物单</span>
            <span class="stat-item__value">¥{{ formatMoney(stats.femaleGiftOrder) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 三个饼图 -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-card__title">总结单额占比</div>
        <div ref="pieTotalRef" class="pie-chart"></div>
        <div class="pie-labels">
          <div class="pie-label"><span class="dot blue"></span>游戏单 {{ stats.gameOrderPercent }}%</div>
          <div class="pie-label"><span class="dot green"></span>礼物单 {{ stats.giftOrderPercent }}%</div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card__title">游戏单占比</div>
        <div ref="pieGameRef" class="pie-chart"></div>
        <div class="pie-labels">
          <div class="pie-label"><span class="dot blue"></span>男陪游戏单 {{ stats.maleGamePercent }}%</div>
          <div class="pie-label"><span class="dot pink"></span>女陪游戏单 {{ stats.femaleGamePercent }}%</div>
        </div>
      </div>
      <div class="chart-card">
        <div class="chart-card__title">礼物单占比</div>
        <div ref="pieGiftRef" class="pie-chart"></div>
        <div class="pie-labels">
          <div class="pie-label"><span class="dot green"></span>男陪礼物单 {{ stats.maleGiftPercent }}%</div>
          <div class="pie-label"><span class="dot orange"></span>女陪礼物单 {{ stats.femaleGiftPercent }}%</div>
        </div>
      </div>
    </div>

    <!-- 四个统计卡片 -->
    <div class="stats-grid-4">
      <div class="stat-mini-card">
        <div class="stat-mini-card__icon blue"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div>
        <div class="stat-mini-card__content">
          <div class="stat-mini-card__label">陪玩押金总额</div>
          <div class="stat-mini-card__value">¥{{ formatMoney(stats.totalDeposit) }}</div>
        </div>
      </div>
      <div class="stat-mini-card">
        <div class="stat-mini-card__icon red"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg></div>
        <div class="stat-mini-card__content">
          <div class="stat-mini-card__label">陪玩罚款总额</div>
          <div class="stat-mini-card__value">¥{{ formatMoney(stats.totalFine) }}</div>
        </div>
      </div>
      <div class="stat-mini-card">
        <div class="stat-mini-card__icon green"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg></div>
        <div class="stat-mini-card__content">
          <div class="stat-mini-card__label">陪玩奖励总额</div>
          <div class="stat-mini-card__value">¥{{ formatMoney(stats.totalReward) }}</div>
        </div>
      </div>
      <div class="stat-mini-card">
        <div class="stat-mini-card__icon purple"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg></div>
        <div class="stat-mini-card__content">
          <div class="stat-mini-card__label">陪玩钱包总余额</div>
          <div class="stat-mini-card__value">¥{{ formatMoney(stats.totalBalance) }}</div>
        </div>
      </div>
    </div>

    <!-- 两个排行榜 -->
    <div class="rankings-row">
      <!-- 陪玩接单排行榜 -->
      <div class="ranking-panel">
        <div class="ranking-panel__header">
          <div class="ranking-panel__header-left">
            <span class="ranking-panel__icon">🏆</span>
            <span class="ranking-panel__title">陪玩接单排行榜</span>
            <span class="ranking-panel__badge">Top10</span>
          </div>
          <el-button class="more-btn" size="small" @click="showMoreOrder = !showMoreOrder">
            <el-icon><ArrowRight /></el-icon>
            {{ showMoreOrder ? '收起' : '更多' }}
          </el-button>
        </div>
        <div class="ranking-panel__body">
          <el-table :data="showMoreOrder ? orderRankingFull : orderRanking" stripe style="width: 100%" size="small" max-height="400">
            <el-table-column prop="rank" label="排名" width="60" align="center">
              <template #default="scope">
                <span class="rank-badge" :class="'rank-' + scope.row.rank">{{ scope.row.rank }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" min-width="100" />
            <el-table-column prop="code" label="编号" width="90" align="center" />
            <el-table-column prop="gender" label="性别" width="60" align="center">
              <template #default="scope">
                <el-tag size="small" :type="scope.row.gender === '男' ? '' : 'danger'" effect="plain">{{ scope.row.gender }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="orderAmount" label="接单金额" width="110" align="right">
              <template #default="scope">
                <span class="amount">¥{{ formatMoney(scope.row.orderAmount) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- 陪玩收入排行榜 -->
      <div class="ranking-panel">
        <div class="ranking-panel__header">
          <div class="ranking-panel__header-left">
            <span class="ranking-panel__icon">💰</span>
            <span class="ranking-panel__title">陪玩收入排行榜</span>
            <span class="ranking-panel__badge">Top10</span>
          </div>
          <el-button class="more-btn" size="small" @click="showMoreIncome = !showMoreIncome">
            <el-icon><ArrowRight /></el-icon>
            {{ showMoreIncome ? '收起' : '更多' }}
          </el-button>
        </div>
        <div class="ranking-panel__body">
          <el-table :data="showMoreIncome ? incomeRankingFull : incomeRanking" stripe style="width: 100%" size="small" max-height="400">
            <el-table-column prop="rank" label="排名" width="60" align="center">
              <template #default="scope">
                <span class="rank-badge" :class="'rank-' + scope.row.rank">{{ scope.row.rank }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="nickname" label="昵称" min-width="100" />
            <el-table-column prop="code" label="编号" width="90" align="center" />
            <el-table-column prop="gender" label="性别" width="60" align="center">
              <template #default="scope">
                <el-tag size="small" :type="scope.row.gender === '男' ? '' : 'danger'" effect="plain">{{ scope.row.gender }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="income" label="收入金额" width="110" align="right">
              <template #default="scope">
                <span class="amount">¥{{ formatMoney(scope.row.income) }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import * as echarts from 'echarts'

const timeRange = ref('30')
const customDateRange = ref(null)
const showMoreOrder = ref(false)
const showMoreIncome = ref(false)

const stats = ref({
  totalOrderAmount: 0,
  gameOrderAmount: 0,
  giftOrderAmount: 0,
  maleGameOrder: 0,
  femaleGameOrder: 0,
  maleGiftOrder: 0,
  femaleGiftOrder: 0,
  gameOrderPercent: 0,
  giftOrderPercent: 0,
  maleGamePercent: 0,
  femaleGamePercent: 0,
  maleGiftPercent: 0,
  femaleGiftPercent: 0,
  totalDeposit: 0,
  totalFine: 0,
  totalReward: 0,
  totalBalance: 0,
})

const orderRanking = ref([])
const orderRankingFull = ref([])
const incomeRanking = ref([])
const incomeRankingFull = ref([])

const pieTotalRef = ref(null)
const pieGameRef = ref(null)
const pieGiftRef = ref(null)
let pieTotal = null, pieGame = null, pieGift = null

const currentTime = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
})

const formatMoney = (value) => {
  if (!value && value !== 0) return '0.00'
  return Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const generateMockData = () => {
  const genders = ['男', '女']
  const nicknames = ['小可爱', '游戏达人', '萌萌哒', '大神', '快乐陪玩', '星星眼', '甜蜜', '酷玩', '快乐星', '小天使', '幸运星', '阳光', '月亮', '星星', '彩虹']
  
  const totalOrder = Math.floor(Math.random() * 50000) + 30000
  const gameRatio = 0.6 + Math.random() * 0.2
  const gameOrder = Math.floor(totalOrder * gameRatio)
  const giftOrder = totalOrder - gameOrder
  const maleGame = Math.floor(gameOrder * 0.55)
  const femaleGame = gameOrder - maleGame
  const maleGift = Math.floor(giftOrder * 0.45)
  const femaleGift = giftOrder - maleGift

  stats.value.totalOrderAmount = totalOrder
  stats.value.gameOrderAmount = gameOrder
  stats.value.giftOrderAmount = giftOrder
  stats.value.maleGameOrder = maleGame
  stats.value.femaleGameOrder = femaleGame
  stats.value.maleGiftOrder = maleGift
  stats.value.femaleGiftOrder = femaleGift
  stats.value.gameOrderPercent = Math.round(gameRatio * 100)
  stats.value.giftOrderPercent = 100 - stats.value.gameOrderPercent
  stats.value.maleGamePercent = Math.round((maleGame / gameOrder) * 100) || 60
  stats.value.femaleGamePercent = 100 - stats.value.maleGamePercent
  stats.value.maleGiftPercent = Math.round((maleGift / giftOrder) * 100) || 45
  stats.value.femaleGiftPercent = 100 - stats.value.maleGiftPercent
  stats.value.totalDeposit = Math.floor(Math.random() * 20000) + 10000
  stats.value.totalFine = Math.floor(Math.random() * 5000) + 1000
  stats.value.totalReward = Math.floor(Math.random() * 10000) + 5000
  stats.value.totalBalance = Math.floor(Math.random() * 50000) + 20000

  // 接单排行榜 - Top10
  orderRanking.value = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    nickname: nicknames[i],
    code: `AW${String(900 + Math.floor(Math.random() * 100)).padStart(3, '0')}`,
    gender: genders[Math.floor(Math.random() * 2)],
    orderAmount: Math.floor(Math.random() * 8000) + 3000,
  })).sort((a, b) => b.orderAmount - a.orderAmount).map((item, i) => ({ ...item, rank: i + 1 }))

  // 接单排行榜 - 完整
  orderRankingFull.value = Array.from({ length: 30 }, (_, i) => ({
    rank: i + 1,
    nickname: nicknames[i % nicknames.length] + (i > 14 ? (i - 14) : ''),
    code: `AW${String(900 + Math.floor(Math.random() * 100)).padStart(3, '0')}`,
    gender: genders[Math.floor(Math.random() * 2)],
    orderAmount: Math.floor(Math.random() * 8000) + 1000,
  })).sort((a, b) => b.orderAmount - a.orderAmount).map((item, i) => ({ ...item, rank: i + 1 }))

  // 收入排行榜 - Top10
  incomeRanking.value = Array.from({ length: 10 }, (_, i) => ({
    rank: i + 1,
    nickname: nicknames[(i + 3) % nicknames.length],
    code: `AM${String(600 + Math.floor(Math.random() * 100)).padStart(3, '0')}`,
    gender: genders[Math.floor(Math.random() * 2)],
    income: Math.floor(Math.random() * 7000) + 2000,
  })).sort((a, b) => b.income - a.income).map((item, i) => ({ ...item, rank: i + 1 }))

  // 收入排行榜 - 完整
  incomeRankingFull.value = Array.from({ length: 30 }, (_, i) => ({
    rank: i + 1,
    nickname: nicknames[(i + 3) % nicknames.length] + (i > 14 ? (i - 14) : ''),
    code: `AM${String(600 + Math.floor(Math.random() * 100)).padStart(3, '0')}`,
    gender: genders[Math.floor(Math.random() * 2)],
    income: Math.floor(Math.random() * 7000) + 1000,
  })).sort((a, b) => b.income - a.income).map((item, i) => ({ ...item, rank: i + 1 }))
}

const initPieCharts = () => {
  const commonOptions = {
    tooltip: { trigger: 'item', formatter: '{b}: {c} ({d}%)' },
    legend: { show: false },
    series: [{ type: 'pie', radius: ['50%', '75%'], center: ['50%', '50%'], itemStyle: { borderRadius: 8, borderColor: '#fff', borderWidth: 3 }, label: { show: false }, emphasis: { label: { show: true, fontSize: 14, fontWeight: 'bold' } } }]
  }

  if (pieTotalRef.value) {
    pieTotal = echarts.init(pieTotalRef.value)
    pieTotal.setOption({
      ...commonOptions,
      series: [{ ...commonOptions.series[0], data: [
        { value: stats.value.gameOrderPercent, name: '游戏单', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#4facfe' }, { offset: 1, color: '#00f2fe' }]) } },
        { value: stats.value.giftOrderPercent, name: '礼物单', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#43e97b' }, { offset: 1, color: '#38f9d7' }]) } },
      ]}]
    })
  }

  if (pieGameRef.value) {
    pieGame = echarts.init(pieGameRef.value)
    pieGame.setOption({
      ...commonOptions,
      series: [{ ...commonOptions.series[0], data: [
        { value: stats.value.maleGamePercent, name: '男陪', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#4facfe' }, { offset: 1, color: '#00f2fe' }]) } },
        { value: stats.value.femaleGamePercent, name: '女陪', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#ff9a9e' }, { offset: 1, color: '#fecfef' }]) } },
      ]}]
    })
  }

  if (pieGiftRef.value) {
    pieGift = echarts.init(pieGiftRef.value)
    pieGift.setOption({
      ...commonOptions,
      series: [{ ...commonOptions.series[0], data: [
        { value: stats.value.maleGiftPercent, name: '男陪', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#43e97b' }, { offset: 1, color: '#38f9d7' }]) } },
        { value: stats.value.femaleGiftPercent, name: '女陪', itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: '#fa709a' }, { offset: 1, color: '#fee140' }]) } },
      ]}]
    })
  }
}

const handleResize = () => {
  pieTotal?.resize()
  pieGame?.resize()
  pieGift?.resize()
}

const handleTimeRangeChange = () => {
  generateMockData()
  initPieCharts()
}

onMounted(() => {
  generateMockData()
  nextTick(() => { initPieCharts() })
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  pieTotal?.dispose()
  pieGame?.dispose()
  pieGift?.dispose()
})
</script>

<style scoped>
.dashboard { padding: 16px; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%); height: auto; }

.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; padding: 20px 24px; background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); flex-wrap: wrap; gap: 12px; }
.header-left { display: flex; align-items: center; gap: 16px; }
.header h2 { margin: 0; font-size: 22px; font-weight: 600; color: #1a1a2e; }
.update-time { font-size: 12px; color: #999; padding: 4px 12px; background: #f5f5f5; border-radius: 20px; }
.header-right { display: flex; align-items: center; gap: 8px; }

/* 三个统计卡片 */
.stats-cards-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.big-stat-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); overflow: hidden; }
.big-stat-card__header { padding: 18px 24px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
.big-stat-card__title { font-size: 16px; font-weight: 600; color: #fff; }
.big-stat-card__body { padding: 8px 0; }
.stat-item { display: flex; justify-content: space-between; align-items: center; padding: 14px 24px; border-bottom: 1px solid #f5f5f5; }
.stat-item:last-child { border-bottom: none; }
.stat-item__label { font-size: 14px; color: #666; }
.stat-item__value { font-size: 16px; font-weight: 600; color: #333; }
.stat-item__value.primary { font-size: 20px; color: #667eea; }

/* 三个饼图 */
.charts-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
.chart-card { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); padding: 20px; }
.chart-card__title { font-size: 15px; font-weight: 600; color: #1a1a2e; text-align: center; margin-bottom: 12px; }
.pie-chart { height: 180px; width: 100%; }
.pie-labels { display: flex; justify-content: center; gap: 20px; margin-top: 12px; }
.pie-label { display: flex; align-items: center; gap: 6px; font-size: 13px; color: #666; }
.dot { width: 10px; height: 10px; border-radius: 3px; }
.dot.blue { background: linear-gradient(135deg, #4facfe, #00f2fe); }
.dot.green { background: linear-gradient(135deg, #43e97b, #38f9d7); }
.dot.pink { background: linear-gradient(135deg, #ff9a9e, #fecfef); }
.dot.orange { background: linear-gradient(135deg, #fa709a, #fee140); }

/* 四个统计卡片 */
.stats-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 24px; }
.stat-mini-card { background: #fff; border-radius: 12px; padding: 20px; display: flex; align-items: center; gap: 16px; box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06); }
.stat-mini-card__icon { width: 48px; height: 48px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.stat-mini-card__icon svg { width: 24px; height: 24px; }
.stat-mini-card__icon.blue { background: linear-gradient(135deg, #e6f2ff, #b3d9ff); color: #4facfe; }
.stat-mini-card__icon.red { background: linear-gradient(135deg, #ffe6ea, #ffb3bf); color: #f5576c; }
.stat-mini-card__icon.green { background: linear-gradient(135deg, #e6f7ed, #b3e6c4); color: #43e97b; }
.stat-mini-card__icon.purple { background: linear-gradient(135deg, #f5efff, #e6d9f7); color: #a18cd1; }
.stat-mini-card__label { font-size: 13px; color: #8c8c8c; margin-bottom: 4px; }
.stat-mini-card__value { font-size: 20px; font-weight: 700; color: #1a1a2e; }

/* 两个排行榜 */
.rankings-row { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.ranking-panel { background: #fff; border-radius: 16px; box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06); overflow: hidden; }
.ranking-panel__header { padding: 16px 20px; border-bottom: 1px solid #f0f0f0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; justify-content: space-between; align-items: center; }
.ranking-panel__header-left { display: flex; align-items: center; gap: 10px; }
.ranking-panel__icon { font-size: 18px; }
.ranking-panel__title { font-size: 15px; font-weight: 600; color: #fff; }
.ranking-panel__badge { font-size: 11px; padding: 2px 8px; background: rgba(255, 255, 255, 0.25); border-radius: 10px; color: #fff; font-weight: 500; }
.ranking-panel__body { padding: 12px; }
.more-btn { background: rgba(255, 255, 255, 0.2) !important; border: 1px solid rgba(255, 255, 255, 0.3) !important; color: #fff !important; border-radius: 20px !important; padding: 6px 14px !important; font-size: 12px !important; display: flex; align-items: center; gap: 4px; transition: all 0.3s; }
.more-btn:hover { background: rgba(255, 255, 255, 0.35) !important; transform: translateX(2px); }
.more-btn .el-icon { font-size: 12px; }
.rank-badge { display: inline-flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; font-size: 12px; font-weight: 700; background: #e8e8e8; color: #666; }
.rank-badge.rank-1 { background: linear-gradient(135deg, #ffd700, #ffb347); color: #fff; }
.rank-badge.rank-2 { background: linear-gradient(135deg, #c0c0c0, #a8a8a8); color: #fff; }
.rank-badge.rank-3 { background: linear-gradient(135deg, #cd7f32, #b87333); color: #fff; }
.amount { color: #667eea; font-weight: 600; }

:deep(.el-table) { font-size: 13px; }
:deep(.el-table th) { background-color: #f8f9fa !important; color: #666; font-weight: 600; }
:deep(.el-table td) { border-bottom: 1px solid #f5f5f5; }
:deep(.el-radio-button__inner) { border-radius: 8px; border: none; box-shadow: none; }
:deep(.el-radio-button:first-child .el-radio-button__inner) { border-radius: 8px 0 0 8px; }
:deep(.el-radio-button:last-child .el-radio-button__inner) { border-radius: 0 8px 8px 0; }
:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) { background: linear-gradient(135deg, #667eea, #764ba2); border-color: #667eea; box-shadow: none; }

@media (max-width: 1400px) {
  .stats-cards-row, .charts-row, .stats-grid-4, .rankings-row { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .dashboard { padding: 16px; }
  .header { flex-direction: column; align-items: flex-start; }
  .stats-cards-row, .charts-row, .stats-grid-4, .rankings-row { grid-template-columns: 1fr; }
}
</style>
