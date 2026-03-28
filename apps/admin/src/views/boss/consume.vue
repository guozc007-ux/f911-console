<template>
  <div class="page-container">
    <!-- 顶部标题 -->
    <div class="page-header">
      <h2>老板消费记录</h2>
    </div>

    <!-- 筛选区域 - 单行 -->
    <div class="filter-section">
      <el-form :model="filterForm" inline class="filter-form">
        <el-form-item label="订单日期">
          <el-date-picker
            v-model="filterForm.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始"
            end-placeholder="结束"
            value-format="YYYY-MM-DD"
            style="width: 220px;"
          />
        </el-form-item>

        <el-form-item label="项目">
          <el-cascader
            v-model="filterForm.projectType"
            :options="projectOptions"
            :props="{ checkStrictly: true, emitPath: false }"
            placeholder="请选"
            clearable
            style="width: 140px;"
          />
        </el-form-item>

        <el-form-item label="老板">
          <el-select v-model="filterForm.bossId" placeholder="请选" clearable filterable style="width: 120px;">
            <el-option label="散户" value="retail" />
            <el-option v-for="item in bossList" :key="item.id" :label="item.nickname" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="陪玩">
          <el-select v-model="filterForm.playerId" placeholder="请选" clearable filterable style="width: 120px;">
            <el-option v-for="item in playerList" :key="item.id" :label="item.nickname" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="客服">
          <el-select v-model="filterForm.serviceId" placeholder="请选" clearable filterable style="width: 100px;">
            <el-option v-for="item in serviceList" :key="item.id" :label="item.nickname" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="推荐人">
          <el-select v-model="filterForm.referrerId" placeholder="请选" clearable filterable style="width: 120px;">
            <el-option v-for="item in playerList" :key="item.id" :label="item.nickname" :value="item.id" />
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-select v-model="filterForm.status" placeholder="请选" clearable style="width: 100px;">
            <el-option label="待审核" value="pending" />
            <el-option label="已通过" value="passed" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>

        <el-form-item label="订单号">
          <el-input v-model="filterForm.orderNo" placeholder="请输入" clearable style="width: 130px;" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleFilterChange">
            <el-icon><Search /></el-icon>查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 数据表格 -->
    <div class="table-section">
      <el-table :data="tableData" border stripe v-loading="loading" class="data-table" show-summary :summary-method="getSummaries" height="400">
        <el-table-column prop="id" label="ID" width="55" align="center" fixed />
        <el-table-column prop="orderNo" label="订单编号" width="110" align="center">
          <template #default="{ row }">
            <span class="order-no">{{ row.orderNo }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="orderDate" label="订单日期" width="130" align="center" />
        <el-table-column prop="customerService" label="客服" width="60" align="center" />
        <el-table-column prop="projectName" label="项目" min-width="120" align="center" show-overflow-tooltip />
        <el-table-column prop="bossName" label="老板" width="80" align="center">
          <template #default="{ row }">
            <span :class="row.bossType === 'retail' ? 'retail-tag' : 'vip-tag'">{{ row.bossName }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="playerName" label="陪玩" width="80" align="center" />
        <el-table-column prop="remark" label="备注" width="80" align="center" show-overflow-tooltip />
        <el-table-column prop="quantity" label="数量" width="50" align="center" />
        <el-table-column prop="orderAmount" label="金额" width="90" align="center">
          <template #default="{ row }">
            <span class="amount">{{ formatMoney(row.orderAmount) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="commissionRate" label="比例" width="55" align="center">
          <template #default="{ row }">
            <span class="rate">{{ row.commissionRate }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="playerIncome" label="陪玩收入" width="90" align="center">
          <template #default="{ row }">
            <span class="income">{{ formatMoney(row.playerIncome) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="bossReferrer" label="老板推荐人" width="85" align="center" />
        <el-table-column prop="bossCommission" label="推荐人佣金" width="90" align="center">
          <template #default="{ row }">
            <span class="commission">{{ formatMoney(row.bossCommission) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="shopIncome" label="店铺收入" width="90" align="center">
          <template #default="{ row }">
            <span class="shop-income">{{ formatMoney(row.shopIncome) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="70" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)" size="small" effect="dark">{{ row.statusText }}</el-tag>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <div class="pagination-info">
          共 <span class="total">{{ pagination.total }}</span> 条，每页
          <el-select v-model="pagination.pageSize" size="small" @change="handleSizeChange" style="width: 70px;">
            <el-option :value="10" label="10条" />
            <el-option :value="20" label="20条" />
            <el-option :value="30" label="30条" />
            <el-option :value="50" label="50条" />
          </el-select>
        </div>
        <el-pagination
          v-model:current-page="pagination.page"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          layout="prev, pager, next"
          background
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const loading = ref(false)
const tableData = ref([])
const tableHeight = ref('auto') // 表格高度自适应

// 项目类型选项（两级层级）
const projectOptions = [
  {
    value: 'game',
    label: '游戏单',
    children: [
      { value: 'game_simple', label: '趣味单1.0-工艺' },
      { value: 'game_gold', label: '趣味单1.0-全金版' },
      { value: 'game_fill', label: '填填乐-红金混合版' },
      { value: 'game_experience', label: '+陪玩-体验单' },
    ]
  },
  {
    value: 'gift',
    label: '礼物单',
    children: [
      { value: 'gift_simple', label: 'B-散户' },
      { value: 'gift_vip', label: 'B-会员' },
    ]
  },
]

// 老板列表
const bossList = ref([
  { id: 1, nickname: '黑羽' },
  { id: 2, nickname: '健儿宝宝' },
  { id: 3, nickname: '趣味单' },
  { id: 4, nickname: 'KF' },
  { id: 5, nickname: '红金' },
])

// 陪玩列表
const playerList = ref([
  { id: 1, nickname: '小可爱' },
  { id: 2, nickname: '游戏达人' },
  { id: 3, nickname: '萌萌哒' },
  { id: 4, nickname: '大神' },
  { id: 5, nickname: '快乐陪玩' },
])

// 客服列表
const serviceList = ref([
  { id: 1, nickname: '小雨' },
  { id: 2, nickname: 'ANS' },
  { id: 3, nickname: '小美' },
  { id: 4, nickname: '小雪' },
])

const filterForm = reactive({
  dateRange: null,
  projectType: '',
  bossId: '',
  playerId: '',
  serviceId: '',
  referrerId: '',
  status: '',
  orderNo: '',
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const summaryData = reactive({
  totalAmount: 0,
  totalBossCommission: 0,
  totalShopIncome: 0,
})

const formatMoney = (value) => {
  if (!value && value !== 0) return '0.00'
  return Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const getStatusType = (status) => {
  const map = { passed: 'success', pending: 'warning', rejected: 'danger' }
  return map[status] || 'info'
}

const getSummaries = () => {
  return [
    '', '', '', '', '', '', '', '', '汇总',
    `¥${formatMoney(summaryData.totalAmount)}`, '',
    '', '', `¥${formatMoney(summaryData.totalBossCommission)}`,
    `¥${formatMoney(summaryData.totalShopIncome)}`, ''
  ]
}

const generateMockData = () => {
  const statuses = [
    { status: 'passed', statusText: '已通过' },
    { status: 'pending', statusText: '待审核' },
    { status: 'rejected', statusText: '已拒绝' },
  ]
  const games = [
    { name: '趣味单1.0-工艺', rate: 80 },
    { name: '趣味单1.0-全金版', rate: 99 },
    { name: '填填乐-红金混合版', rate: 80 },
    { name: '+陪玩-体验单', rate: 99 },
  ]
  const gifts = [
    { name: 'B-散户', rate: 80 },
    { name: 'B-会员', rate: 99 },
  ]
  const services = ['小雨', 'ANS', '小美', '小雪']
  const bosses = [
    { name: '黑羽', type: 'vip' },
    { name: '散户', type: 'retail' },
    { name: '健儿宝宝', type: 'retail' },
  ]
  const players = ['小可爱', '游戏达人', '萌萌哒', '大神', '快乐陪玩']
  const referrers = ['散户', '推荐1', '推荐2', '']

  const data = Array.from({ length: pagination.pageSize }, (_, i) => {
    const isGame = Math.random() > 0.4
    const project = isGame ? games[Math.floor(Math.random() * games.length)] : gifts[Math.floor(Math.random() * gifts.length)]
    const boss = bosses[Math.floor(Math.random() * bosses.length)]
    const orderAmount = Math.floor(Math.random() * 500) + 50
    const commission = orderAmount * (project.rate / 100)
    const playerIncome = Math.floor(orderAmount * 0.3)
    const shopIncome = orderAmount - commission
    const statusIdx = Math.floor(Math.random() * 3)

    return {
      id: 3300 - ((pagination.page - 1) * pagination.pageSize + i),
      orderNo: `XKFB${9000 + Math.floor(Math.random() * 1000)}`,
      orderDate: `2026-03-${String(28 - i).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
      customerService: services[Math.floor(Math.random() * services.length)],
      projectName: project.name,
      bossName: boss.name,
      bossType: boss.type,
      playerName: players[Math.floor(Math.random() * players.length)],
      remark: '',
      quantity: 1,
      orderAmount,
      commissionRate: project.rate,
      playerIncome,
      bossReferrer: referrers[Math.floor(Math.random() * referrers.length)],
      bossCommission: commission.toFixed(2),
      shopIncome: shopIncome.toFixed(2),
      ...statuses[statusIdx],
    }
  })

  summaryData.totalAmount = data.reduce((sum, item) => sum + item.orderAmount, 0)
  summaryData.totalBossCommission = data.reduce((sum, item) => sum + parseFloat(item.bossCommission), 0)
  summaryData.totalShopIncome = data.reduce((sum, item) => sum + parseFloat(item.shopIncome), 0)

  return data
}

const loadData = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    tableData.value = generateMockData()
    pagination.total = 156
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

const handleFilterChange = () => {
  pagination.page = 1
  loadData()
}

const handleReset = () => {
  filterForm.dateRange = null
  filterForm.projectType = ''
  filterForm.bossId = ''
  filterForm.playerId = ''
  filterForm.serviceId = ''
  filterForm.referrerId = ''
  filterForm.status = ''
  filterForm.orderNo = ''
  handleFilterChange()
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
  pagination.page = 1
  loadData()
}

const handlePageChange = (val) => {
  pagination.page = val
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  padding: 16px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}

.page-header {
  margin-bottom: 16px;
}

.page-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
  color: #1a1a2e;
}

/* 筛选区域 - 单行紧凑 */
.filter-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.filter-form {
  display: flex;
  flex-wrap: nowrap;
  gap: 12px;
  align-items: center;
}

:deep(.el-form-item) {
  margin-bottom: 0;
  margin-right: 0;
}

:deep(.el-form-item__label) {
  padding-right: 6px;
  font-size: 13px;
}

/* 数据表格 */
.table-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  flex: 1;
  display: flex;
  flex-direction: column;
  flex: 1; min-height: 0;
}

.data-table {
  border-radius: 8px;
  overflow: hidden;
  flex: 1;
}

:deep(.el-table__body-wrapper) {
  overflow-y: auto;
}

:deep(.el-table__body) {
  width: 100% !important;
}

:deep(.el-table th) {
  background-color: #f8f9fa !important;
  color: #666;
  font-weight: 600;
  font-size: 12px;
  padding: 8px 0;
  height: 40px;
}

:deep(.el-table td) {
  padding: 0;
  font-size: 12px;
  height: 40px;
}

:deep(.el-table .cell) {
  padding-left: 4px;
  padding-right: 4px;
}

.order-no {
  color: #667eea;
  font-weight: 500;
  font-size: 11px;
}

.retail-tag {
  color: #909399;
}

.vip-tag {
  color: #667eea;
  font-weight: 500;
}

.amount {
  color: #409EFF;
  font-weight: 700;
}

.rate {
  color: #666;
}

.income {
  color: #67C23A;
  font-weight: 700;
}

.commission {
  color: #E6A23C;
  font-weight: 700;
}

.shop-income {
  color: #F56C6C;
  font-weight: 700;
}

/* 汇总行 */
:deep(.el-table__footer) {
  background-color: #f0f4ff;
}

:deep(.el-table__footer .cell) {
  font-weight: 600;
  color: #333;
  font-size: 12px;
  height: 36px;
  line-height: 36px;
}

/* 分页 */
.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
  flex-shrink: 0;
}

.pagination-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #666;
}

.pagination-info .total {
  color: #667eea;
  font-weight: 600;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled).is-active) {
  background: linear-gradient(135deg, #667eea, #764ba2);
}
</style>
