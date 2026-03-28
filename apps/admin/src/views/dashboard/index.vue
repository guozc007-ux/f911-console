<template>
  <div class="dashboard">
    <!-- 顶部标题栏 -->
    <div class="header">
      <div class="header-left">
        <h2>数据看板</h2>
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

    <!-- 8个统计卡片 -->
    <div class="stats-grid">
      <div class="stat-card stat-card--blue">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">客户总数</div>
          <div class="stat-card__value">{{ overview.userTotal || overview.bossTotal || 0 }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--green">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">订单总数</div>
          <div class="stat-card__value">{{ overview.reportTotal || overview.orderTotal || 0 }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--orange">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">给推荐人总数</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.totalReferrerCommission || 0) }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--purple">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">充值金额总数</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.totalDeposit || 0) }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--cyan">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zM9 4c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76l1-1.36 1 1.36L15.38 12 17 10.83 14.92 8H20v6z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">赠送金额总数</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.totalGift || 0) }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--red">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">流水总额（含赠送）</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.totalFlow || 0) }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--yellow">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">余额总数</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.totalBalance || overview.totalShopMoney || 0) }}</div>
        </div>
      </div>

      <div class="stat-card stat-card--pink">
        <div class="stat-card__icon">
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z"/></svg>
        </div>
        <div class="stat-card__content">
          <div class="stat-card__label">俱乐部总利润</div>
          <div class="stat-card__value">¥{{ formatMoney(overview.clubProfit || overview.totalPlayerCommission || 0) }}</div>
        </div>
      </div>
    </div>

    <!-- 图表区域 -->
    <!-- 近30天流水总额 - 单独一行 -->
    <div class="charts-section">
      <div class="chart-panel chart-panel--full">
        <div class="chart-panel__header">
          <span class="chart-panel__title">近{{ timeRangeText }}流水总额</span>
          <span class="chart-panel__value">¥{{ formatMoney(totalFlowAmount) }}</span>
        </div>
        <div class="chart-panel__body">
          <div ref="flowChartRef" class="chart"></div>
        </div>
      </div>
    </div>

    <!-- 新增客户 和 复购数据 - 并列一行 -->
    <div class="charts-grid">
      <div class="chart-panel">
        <div class="chart-panel__header">
          <span class="chart-panel__title">近{{ timeRangeText }}新增客户</span>
        </div>
        <div class="chart-panel__body">
          <div ref="customerChartRef" class="chart"></div>
        </div>
      </div>

      <div class="chart-panel">
        <div class="chart-panel__header">
          <span class="chart-panel__title">近{{ timeRangeText }}客户复购</span>
        </div>
        <div class="chart-panel__body">
          <div ref="repurchaseChartRef" class="chart"></div>
        </div>
      </div>
    </div>

    <!-- 两个排行榜 - 并列一行 -->
    <div class="rankings-grid">
      <div class="ranking-panel">
        <div class="ranking-panel__header">
          <div class="ranking-panel__header-left">
            <span class="ranking-panel__icon">🏆</span>
            <span class="ranking-panel__title">客户消费排行榜</span>
            <span class="ranking-panel__badge">Top10</span>
          </div>
          <el-button class="more-btn" size="small" @click="showMoreConsume = !showMoreConsume">
            <el-icon><ArrowRight /></el-icon>
            {{ showMoreConsume ? '收起' : '更多' }}
          </el-button>
        </div>
        <div class="ranking-panel__body">
          <div class="ranking-list" v-if="consumeRanking.length">
            <div class="ranking-item" v-for="(item, index) in (showMoreConsume ? consumeRankingFull : consumeRanking)" :key="index">
              <span class="ranking-item__rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
              <span class="ranking-item__name">{{ item.name }}</span>
              <span class="ranking-item__value">¥{{ formatMoney(item.amount) }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" :image-size="60" />
        </div>
      </div>

      <div class="ranking-panel">
        <div class="ranking-panel__header">
          <div class="ranking-panel__header-left">
            <span class="ranking-panel__icon">💰</span>
            <span class="ranking-panel__title">客户充值排行榜</span>
            <span class="ranking-panel__badge">Top10</span>
          </div>
          <el-button class="more-btn" size="small" @click="showMoreRecharge = !showMoreRecharge">
            <el-icon><ArrowRight /></el-icon>
            {{ showMoreRecharge ? '收起' : '更多' }}
          </el-button>
        </div>
        <div class="ranking-panel__body">
          <div class="ranking-list" v-if="rechargeRanking.length">
            <div class="ranking-item" v-for="(item, index) in (showMoreRecharge ? rechargeRankingFull : rechargeRanking)" :key="index">
              <span class="ranking-item__rank" :class="'rank-' + (index + 1)">{{ index + 1 }}</span>
              <span class="ranking-item__name">{{ item.name }}</span>
              <span class="ranking-item__value">¥{{ formatMoney(item.amount) }}</span>
            </div>
          </div>
          <el-empty v-else description="暂无数据" :image-size="60" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import * as echarts from 'echarts'
import { getOverview, getPlayerOverview } from '../../api/data-panel'

const overview = ref({})
const playerOverview = ref({})
const timeRange = ref('30')
const customDateRange = ref(null)
const chartLoading = ref(false)

const flowChartRef = ref(null)
const customerChartRef = ref(null)
const repurchaseChartRef = ref(null)
let flowChart = null
let customerChart = null
let repurchaseChart = null

const dateLabels = ref([])
const flowData = ref([])
const customerData = ref([])
const repurchaseData = ref([])
const totalFlowAmount = ref(0)

// 模拟排行榜数据
const consumeRanking = ref([
  { name: '张**', amount: 12800 },
  { name: '李**', amount: 9800 },
  { name: '王**', amount: 8600 },
  { name: '赵**', amount: 7200 },
  { name: '陈**', amount: 6500 },
  { name: '刘**', amount: 5800 },
  { name: '周**', amount: 5200 },
  { name: '吴**', amount: 4600 },
  { name: '郑**', amount: 3900 },
  { name: '孙**', amount: 3200 },
])

const consumeRankingFull = ref([
  { name: '张**', amount: 12800 }, { name: '李**', amount: 9800 }, { name: '王**', amount: 8600 },
  { name: '赵**', amount: 7200 }, { name: '陈**', amount: 6500 }, { name: '刘**', amount: 5800 },
  { name: '周**', amount: 5200 }, { name: '吴**', amount: 4600 }, { name: '郑**', amount: 3900 },
  { name: '孙**', amount: 3200 }, { name: '钱**', amount: 2800 }, { name: '沈**', amount: 2500 },
  { name: '韩**', amount: 2200 }, { name: '杨**', amount: 2000 }, { name: '朱**', amount: 1800 },
  { name: '秦**', amount: 1600 }, { name: '许**', amount: 1400 }, { name: '何**', amount: 1200 },
  { name: '吕**', amount: 1000 }, { name: '施**', amount: 900 },
])

const rechargeRanking = ref([
  { name: '钱**', amount: 15800 },
  { name: '沈**', amount: 12500 },
  { name: '韩**', amount: 10200 },
  { name: '杨**', amount: 8900 },
  { name: '朱**', amount: 7600 },
  { name: '秦**', amount: 6800 },
  { name: '许**', amount: 5900 },
  { name: '何**', amount: 5100 },
  { name: '吕**', amount: 4300 },
  { name: '施**', amount: 3600 },
])

const rechargeRankingFull = ref([
  { name: '钱**', amount: 15800 }, { name: '沈**', amount: 12500 }, { name: '韩**', amount: 10200 },
  { name: '杨**', amount: 8900 }, { name: '朱**', amount: 7600 }, { name: '秦**', amount: 6800 },
  { name: '许**', amount: 5900 }, { name: '何**', amount: 5100 }, { name: '吕**', amount: 4300 },
  { name: '施**', amount: 3600 }, { name: '张**', amount: 3200 }, { name: '李**', amount: 2800 },
  { name: '王**', amount: 2500 }, { name: '赵**', amount: 2200 }, { name: '陈**', amount: 2000 },
  { name: '刘**', amount: 1800 }, { name: '周**', amount: 1600 }, { name: '吴**', amount: 1400 },
  { name: '郑**', amount: 1200 }, { name: '孙**', amount: 1000 },
])

const showMoreConsume = ref(false)
const showMoreRecharge = ref(false)

const currentTime = computed(() => {
  const now = new Date()
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
})

const timeRangeText = computed(() => {
  const map = { '7': '一周', '30': '一个月', '365': '一年' }
  return map[timeRange.value] || '自定义'
})

const formatMoney = (value) => {
  if (!value && value !== 0) return '0.00'
  return Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const generateMockData = () => {
  const days = parseInt(timeRange.value) || 30
  const dates = []
  const flows = []
  const customers = []
  const repurchases = []

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(`${date.getMonth() + 1}-${String(date.getDate()).padStart(2, '0')}`)
    flows.push(Math.floor(Math.random() * 15000) + 3000)
    customers.push(Math.floor(Math.random() * 15) + 3)
    repurchases.push(Math.floor(Math.random() * 8) + 1)
  }

  dateLabels.value = dates
  flowData.value = flows
  customerData.value = customers
  repurchaseData.value = repurchases
  totalFlowAmount.value = flows.reduce((a, b) => a + b, 0)
}

const initFlowChart = () => {
  if (!flowChartRef.value) return
  flowChart = echarts.init(flowChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      textStyle: { color: '#333' },
      formatter: (params) => {
        const data = params[0]
        return `<div style="padding: 8px 12px;">
          <div style="color: #666; font-size: 12px; margin-bottom: 4px;">${data.name}</div>
          <div style="color: #4facfe; font-size: 18px; font-weight: bold;">¥${Number(data.value).toLocaleString()}</div>
        </div>`
      }
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '10%', containLabel: true },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: dateLabels.value,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#999', fontSize: 11, interval: Math.floor(dateLabels.value.length / 10) }
    },
    yAxis: {
      type: 'value',
      name: '金额(元)',
      nameTextStyle: { color: '#999', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f5f5f5' } },
      axisLabel: { color: '#999', fontSize: 11 }
    },
    series: [{
      type: 'line',
      smooth: true,
      symbol: 'circle',
      symbolSize: 6,
      data: flowData.value,
      lineStyle: { color: '#4facfe', width: 3 },
      itemStyle: { color: '#4facfe' },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(79, 172, 254, 0.3)' },
          { offset: 1, color: 'rgba(79, 172, 254, 0.02)' }
        ])
      }
    }]
  }
  flowChart.setOption(option)
}

const initCustomerChart = () => {
  if (!customerChartRef.value) return
  customerChart = echarts.init(customerChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      textStyle: { color: '#333' },
      formatter: (params) => {
        const data = params[0]
        return `<div style="padding: 8px 12px;">
          <div style="color: #666; font-size: 12px; margin-bottom: 4px;">${data.name}</div>
          <div style="color: #43e97b; font-size: 18px; font-weight: bold;">${data.value} 人</div>
        </div>`
      }
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dateLabels.value,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#999', fontSize: 10, interval: Math.floor(dateLabels.value.length / 8), rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: '人数',
      nameTextStyle: { color: '#999', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f5f5f5' } },
      axisLabel: { color: '#999', fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: customerData.value,
      barWidth: '50%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#43e97b' },
          { offset: 1, color: '#38f9d7' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  }
  customerChart.setOption(option)
}

const initRepurchaseChart = () => {
  if (!repurchaseChartRef.value) return
  repurchaseChart = echarts.init(repurchaseChartRef.value)
  
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e8e8e8',
      borderWidth: 1,
      textStyle: { color: '#333' },
      formatter: (params) => {
        const data = params[0]
        return `<div style="padding: 8px 12px;">
          <div style="color: #666; font-size: 12px; margin-bottom: 4px;">${data.name}</div>
          <div style="color: #fa709a; font-size: 18px; font-weight: bold;">${data.value} 次</div>
        </div>`
      }
    },
    grid: { left: '3%', right: '4%', bottom: '8%', top: '8%', containLabel: true },
    xAxis: {
      type: 'category',
      data: dateLabels.value,
      axisLine: { lineStyle: { color: '#e8e8e8' } },
      axisLabel: { color: '#999', fontSize: 10, interval: Math.floor(dateLabels.value.length / 8), rotate: 45 }
    },
    yAxis: {
      type: 'value',
      name: '次数',
      nameTextStyle: { color: '#999', fontSize: 11 },
      axisLine: { show: false },
      splitLine: { lineStyle: { color: '#f5f5f5' } },
      axisLabel: { color: '#999', fontSize: 11 }
    },
    series: [{
      type: 'bar',
      data: repurchaseData.value,
      barWidth: '50%',
      itemStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: '#fa709a' },
          { offset: 1, color: '#fee140' }
        ]),
        borderRadius: [4, 4, 0, 0]
      }
    }]
  }
  repurchaseChart.setOption(option)
}

const initCharts = () => {
  nextTick(() => {
    initFlowChart()
    initCustomerChart()
    initRepurchaseChart()
  })
}

const handleResize = () => {
  flowChart?.resize()
  customerChart?.resize()
  repurchaseChart?.resize()
}

const handleTimeRangeChange = () => {
  generateMockData()
  initCharts()
}

const loadData = async () => {
  chartLoading.value = true
  try {
    const [overviewRes, playerRes] = await Promise.all([getOverview(), getPlayerOverview()])
    if (overviewRes.code === 200) overview.value = overviewRes.data
    if (playerRes.code === 200) playerOverview.value = playerRes.data
    generateMockData()
    initCharts()
  } catch (error) {
    generateMockData()
    initCharts()
  } finally {
    chartLoading.value = false
  }
}

onMounted(() => {
  loadData()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  flowChart?.dispose()
  customerChart?.dispose()
  repurchaseChart?.dispose()
})
</script>

<style scoped>
.dashboard {
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  box-sizing: border-box;
}

/* 顶部标题栏 */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px 24px;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  flex-wrap: wrap;
  gap: 12px;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 600;
  color: #1a1a2e;
}

.update-time {
  font-size: 12px;
  color: #999;
  padding: 4px 12px;
  background: #f5f5f5;
  border-radius: 20px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 统计卡片网格 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

.stat-card {
  background: #fff;
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
}

.stat-card--blue::before { background: linear-gradient(90deg, #4facfe, #00f2fe); }
.stat-card--green::before { background: linear-gradient(90deg, #43e97b, #38f9d7); }
.stat-card--orange::before { background: linear-gradient(90deg, #fa709a, #fee140); }
.stat-card--purple::before { background: linear-gradient(90deg, #a18cd1, #fbc2eb); }
.stat-card--cyan::before { background: linear-gradient(90deg, #30cfd0, #330867); }
.stat-card--red::before { background: linear-gradient(90deg, #f093fb, #f5576c); }
.stat-card--yellow::before { background: linear-gradient(90deg, #fff720, #fa709a); }
.stat-card--pink::before { background: linear-gradient(90deg, #ff9a9e, #fecfef); }

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

.stat-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.stat-card--blue .stat-card__icon { background: linear-gradient(135deg, #e6f2ff, #b3d9ff); color: #4facfe; }
.stat-card--green .stat-card__icon { background: linear-gradient(135deg, #e6f7ed, #b3e6c4); color: #43e97b; }
.stat-card--orange .stat-card__icon { background: linear-gradient(135deg, #fff0f5, #ffe6eb); color: #fa709a; }
.stat-card--purple .stat-card__icon { background: linear-gradient(135deg, #f5efff, #e6d9f7); color: #a18cd1; }
.stat-card--cyan .stat-card__icon { background: linear-gradient(135deg, #e0f7f7, #b3eded); color: #30cfd0; }
.stat-card--red .stat-card__icon { background: linear-gradient(135deg, #ffe6f0, #ffb3d1); color: #f5576c; }
.stat-card--yellow .stat-card__icon { background: linear-gradient(135deg, #fffbe6, #fff5cc); color: #fa709a; }
.stat-card--pink .stat-card__icon { background: linear-gradient(135deg, #ffe6ea, #ffb3bf); color: #ff9a9e; }

.stat-card__icon svg {
  width: 26px;
  height: 26px;
}

.stat-card__content {
  flex: 1;
  min-width: 0;
}

.stat-card__label {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 6px;
  font-weight: 500;
}

.stat-card__value {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 图表区域 */
.charts-section {
  margin-bottom: 24px;
}

.chart-panel {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.chart-panel--full {
  grid-column: 1 / -1;
}

.chart-panel__header {
  padding: 18px 24px;
  border-bottom: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chart-panel__title {
  font-size: 16px;
  font-weight: 600;
  color: #1a1a2e;
}

.chart-panel__value {
  font-size: 24px;
  font-weight: 700;
  color: #4facfe;
}

.chart-panel__body {
  padding: 20px;
}

.chart {
  height: 300px;
  width: 100%;
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 24px;
}

/* 排行榜 */
.rankings-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.ranking-panel {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  overflow: hidden;
}

.ranking-panel__header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.ranking-panel__header-left {
  display: flex;
  align-items: center;
  gap: 10px;
}

.ranking-panel__icon {
  font-size: 18px;
}

.ranking-panel__title {
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.ranking-panel__badge {
  font-size: 11px;
  padding: 2px 8px;
  background: rgba(255, 255, 255, 0.25);
  border-radius: 10px;
  color: #fff;
  font-weight: 500;
}

.more-btn {
  background: rgba(255, 255, 255, 0.2) !important;
  border: 1px solid rgba(255, 255, 255, 0.3) !important;
  color: #fff !important;
  border-radius: 20px !important;
  padding: 6px 14px !important;
  font-size: 12px !important;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s;
}

.more-btn:hover {
  background: rgba(255, 255, 255, 0.35) !important;
  transform: translateX(2px);
}

.more-btn .el-icon {
  font-size: 12px;
}

.ranking-panel__body {
  padding: 16px 20px;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.ranking-item {
  display: flex;
  align-items: center;
  padding: 10px 12px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.2s;
}

.ranking-item:hover {
  background: #f0f4ff;
  transform: translateX(4px);
}

.ranking-item__rank {
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 700;
  margin-right: 12px;
  background: #e8e8e8;
  color: #666;
}

.ranking-item__rank.rank-1 { background: linear-gradient(135deg, #ffd700, #ffb347); color: #fff; }
.ranking-item__rank.rank-2 { background: linear-gradient(135deg, #c0c0c0, #a8a8a8); color: #fff; }
.ranking-item__rank.rank-3 { background: linear-gradient(135deg, #cd7f32, #b87333); color: #fff; }

.ranking-item__name {
  flex: 1;
  font-size: 14px;
  color: #333;
}

.ranking-item__value {
  font-size: 14px;
  font-weight: 600;
  color: #4facfe;
}

/* Element Plus 覆盖 */
:deep(.el-radio-button__inner) {
  border-radius: 8px;
  border: none;
  box-shadow: none;
}

:deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-radius: 8px 0 0 8px;
}

:deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 8px 8px 0;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: linear-gradient(135deg, #4facfe, #00f2fe);
  border-color: #4facfe;
  box-shadow: none;
}

:deep(.el-empty__description) {
  color: #999;
}

/* 响应式 */
@media (max-width: 1400px) {
  .stats-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 1200px) {
  .charts-grid, .rankings-grid { grid-template-columns: 1fr; }
}

@media (max-width: 768px) {
  .dashboard { padding: 16px; }
  .header { flex-direction: column; align-items: flex-start; padding: 16px; }
  .header-left { flex-direction: column; align-items: flex-start; gap: 8px; }
  .header-right { width: 100%; flex-wrap: wrap; }
  .stats-grid { grid-template-columns: 1fr; }
  .stat-card { padding: 16px; }
  .stat-card__value { font-size: 20px; }
}
</style>
