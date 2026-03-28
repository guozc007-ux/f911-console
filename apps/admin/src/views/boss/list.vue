<template>
  <div class="page-container">
    <!-- 顶部标题 -->
    <div class="page-header">
      <el-button type="primary" @click="showAddDialog">
        <el-icon><Plus /></el-icon>添加老板
      </el-button>
      <div class="search-box">
        <el-input v-model="searchKeyword" placeholder="搜索老板昵称/编号" clearable @keyup.enter="handleSearch" style="width: 200px;" />
        <el-button type="primary" @click="handleSearch">
          <el-icon><Search /></el-icon>搜索
        </el-button>
      </div>
    </div>

    <!-- 数据表格 -->
    <div class="table-section">
      <el-table :data="tableData" border stripe v-loading="loading" class="data-table" height="500">
        <el-table-column prop="id" label="ID" width="60" align="center" />
        <el-table-column prop="code" label="老板编号" width="100" align="center" />
        <el-table-column prop="nickname" label="老板昵称" min-width="120" align="center" />
        <el-table-column prop="totalDeposit" label="累计充值" width="100" align="center">
          <template #default="{ row }">
            <span class="money blue">{{ formatMoney(row.totalDeposit) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalGift" label="累计赠送" width="90" align="center">
          <template #default="{ row }">
            <span class="money orange">{{ row.totalGift || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="totalConsume" label="累计消费" width="100" align="center">
          <template #default="{ row }">
            <span class="money green">{{ formatMoney(row.totalConsume) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balance" label="剩余余额" width="100" align="center">
          <template #default="{ row }">
            <span class="money purple">{{ formatMoney(row.balance) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="referrer" label="推荐人" width="80" align="center" />
        <el-table-column prop="referrerRate" label="推荐人抽成" width="100" align="center">
          <template #default="{ row }">
            <span>{{ row.referrerRate || 0 }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="bossType" label="老板类型" width="90" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.bossType" size="small" type="warning">{{ row.bossType }}</el-tag>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="注册日期" width="160" align="center" />
        <el-table-column label="操作" width="280" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleCopy(row)">复制</el-button>
            <el-button type="success" size="small" @click="showRechargeDialog(row)">充值</el-button>
            <el-button type="warning" size="small" @click="showEditDialog(row)">编辑</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
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

    <!-- 添加老板弹窗 -->
    <el-dialog v-model="addDialogVisible" title="添加老板" width="600px">
      <el-form :model="addForm" label-width="100px" class="form-row">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="老板昵称" required>
              <el-input v-model="addForm.nickname" placeholder="请输入老板昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户类型" required>
              <el-select v-model="addForm.bossType" placeholder="请选择VIP等级" style="width: 100%;">
                <el-option label="vip1" value="vip1" />
                <el-option label="vip2" value="vip2" />
                <el-option label="vip3" value="vip3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="微信">
              <el-input v-model="addForm.wechat" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="addForm.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="推荐人">
              <el-select v-model="addForm.referrerId" placeholder="请选择推荐人" clearable style="width: 100%;">
                <el-option v-for="item in playerList" :key="item.id" :label="item.nickname" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="推荐人抽成">
              <el-input-number v-model="addForm.referrerRate" :min="0" :max="100" placeholder="请输入百分比" style="width: 100%;" />
              <span style="margin-left: 8px; color: #999;">%</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="addDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleAdd">确定</el-button>
      </template>
    </el-dialog>

    <!-- 充值弹窗 -->
    <el-dialog v-model="rechargeDialogVisible" title="老板充值" width="500px">
      <el-form :model="rechargeForm" label-width="100px">
        <el-form-item label="老板昵称">
          <el-input v-model="rechargeForm.nickname" disabled />
        </el-form-item>
        <el-form-item label="充值金额" required>
          <el-input-number v-model="rechargeForm.amount" :min="0" :precision="2" placeholder="请输入充值金额" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="赠送金额">
          <el-input-number v-model="rechargeForm.giftAmount" :min="0" :precision="2" placeholder="请输入赠送金额" style="width: 100%;" />
        </el-form-item>
        <el-form-item label="充值方式" required>
          <el-select v-model="rechargeForm.method" placeholder="请选择充值方式" style="width: 100%;">
            <el-option label="微信" value="wechat" />
            <el-option label="支付宝" value="alipay" />
            <el-option label="其他" value="other" />
          </el-select>
        </el-form-item>
        <el-form-item label="付款截图">
          <el-upload action="#" :auto-upload="false">
            <el-button>上传截图</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="rechargeForm.remark" type="textarea" :rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="rechargeDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRecharge">确定</el-button>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="editDialogVisible" title="编辑老板" width="600px">
      <el-form :model="editForm" label-width="100px" class="form-row">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="老板昵称" required>
              <el-input v-model="editForm.nickname" placeholder="请输入老板昵称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="客户类型" required>
              <el-select v-model="editForm.bossType" placeholder="请选择VIP等级" style="width: 100%;">
                <el-option label="vip1" value="vip1" />
                <el-option label="vip2" value="vip2" />
                <el-option label="vip3" value="vip3" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="微信">
              <el-input v-model="editForm.wechat" placeholder="请输入微信号" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号">
              <el-input v-model="editForm.phone" placeholder="请输入手机号" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="推荐人">
              <el-select v-model="editForm.referrerId" placeholder="默认不设置" clearable style="width: 100%;">
                <el-option v-for="item in playerList" :key="item.id" :label="item.nickname" :value="item.id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="推荐人抽成">
              <el-input-number v-model="editForm.referrerRate" :min="0" :max="100" :precision="0" placeholder="默认0" style="width: 100%;" />
              <span style="margin-left: 8px; color: #999;">%</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <el-button @click="editDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleEdit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
const loading = ref(false)
const tableData = ref([])
const searchKeyword = ref('')

// 陪玩列表（推荐人用）
const playerList = ref([
  { id: 1, nickname: '小可爱' },
  { id: 2, nickname: '游戏达人' },
  { id: 3, nickname: '萌萌哒' },
  { id: 4, nickname: '大神' },
])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

// 添加弹窗
const addDialogVisible = ref(false)
const addForm = reactive({
  nickname: '',
  bossType: '',
  wechat: '',
  phone: '',
  referrerId: '',
  referrerRate: 0,
})

// 充值弹窗
const rechargeDialogVisible = ref(false)
const rechargeForm = reactive({
  id: '',
  nickname: '',
  amount: 0,
  giftAmount: 0,
  method: '',
  remark: '',
})

// 编辑弹窗
const editDialogVisible = ref(false)
const editForm = reactive({
  id: '',
  nickname: '',
  bossType: '',
  wechat: '',
  phone: '',
  referrerId: '',
  referrerRate: 0,
})

const formatMoney = (value) => {
  if (!value && value !== 0) return '0.00'
  return Number(value).toLocaleString('zh-CN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

// 模拟数据
const generateMockData = () => {
  const bossTypes = ['vip1', 'vip2', 'vip3', '']
  const referrers = ['蛋神', '散户', '']
  const nicknames = ['饲养员', '茉莉ovo', 'melody', 'a (HR)', '江南', 'kaco', 'Be', 'RBA', 'yolo白衣', '蛋神']

  return Array.from({ length: pagination.pageSize }, (_, i) => ({
    id: 37 - ((pagination.page - 1) * pagination.pageSize + i),
    code: `RTS${400 + Math.floor(Math.random() * 500)}`,
    nickname: nicknames[i % nicknames.length],
    totalDeposit: Math.floor(Math.random() * 10000) + 2000,
    totalGift: Math.floor(Math.random() * 1000),
    totalConsume: Math.floor(Math.random() * 8000) + 1000,
    balance: Math.floor(Math.random() * 5000) + 500,
    referrer: referrers[Math.floor(Math.random() * referrers.length)],
    referrerRate: 0,
    bossType: bossTypes[Math.floor(Math.random() * bossTypes.length)],
    createdAt: `2026-03-${String(28 - i).padStart(2, '0')} ${String(Math.floor(Math.random() * 24)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')}`,
  }))
}

const loadData = async () => {
  loading.value = true
  try {
    await new Promise(resolve => setTimeout(resolve, 300))
    tableData.value = generateMockData()
    pagination.total = 22
  } catch (error) {
    ElMessage.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.page = 1
  loadData()
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

// 添加老板
const showAddDialog = () => {
  addForm.nickname = ''
  addForm.bossType = ''
  addForm.wechat = ''
  addForm.phone = ''
  addForm.referrerId = ''
  addForm.referrerRate = 0
  addDialogVisible.value = true
}

const handleAdd = () => {
  if (!addForm.nickname) {
    ElMessage.warning('请输入老板昵称')
    return
  }
  if (!addForm.bossType) {
    ElMessage.warning('请选择客户类型')
    return
  }
  ElMessage.success('添加成功')
  addDialogVisible.value = false
  loadData()
}

// 复制
const handleCopy = (row) => {
  const text = `${row.code}@${row.nickname}，${row.bossType || '普通'}，派单客服：${authStore.userInfo?.account || '管理员'}`
  navigator.clipboard.writeText(text)
  ElMessage.success('已复制到剪贴板')
}

// 充值
const showRechargeDialog = (row) => {
  rechargeForm.id = row.id
  rechargeForm.nickname = row.nickname
  rechargeForm.amount = 0
  rechargeForm.giftAmount = 0
  rechargeForm.method = ''
  rechargeForm.remark = ''
  rechargeDialogVisible.value = true
}

const handleRecharge = () => {
  if (!rechargeForm.amount) {
    ElMessage.warning('请输入充值金额')
    return
  }
  if (!rechargeForm.method) {
    ElMessage.warning('请选择充值方式')
    return
  }
  ElMessage.success('充值成功')
  rechargeDialogVisible.value = false
  loadData()
}

// 编辑
const showEditDialog = (row) => {
  editForm.id = row.id
  editForm.nickname = row.nickname
  editForm.bossType = row.bossType
  editForm.wechat = ''
  editForm.phone = ''
  editForm.referrerId = ''
  editForm.referrerRate = 0
  editDialogVisible.value = true
}

const handleEdit = () => {
  if (!editForm.nickname) {
    ElMessage.warning('请输入老板昵称')
    return
  }
  if (!editForm.bossType) {
    ElMessage.warning('请选择客户类型')
    return
  }
  ElMessage.success('编辑成功')
  editDialogVisible.value = false
  loadData()
}

// 删除
const handleDelete = (row) => {
  ElMessageBox.confirm(`确定删除老板"${row.nickname}"吗？`, '提示', {
    type: 'warning',
  }).then(() => {
    ElMessage.success('删除成功')
    loadData()
  }).catch(() => {})
}

onMounted(() => {
  loadData()
})
</script>

<style scoped>
.page-container {
  padding: 20px;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ed 100%);
  height: 100%;
  box-sizing: border-box;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.search-box {
  display: flex;
  gap: 8px;
  align-items: center;
}

.table-section {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
}

.data-table {
  border-radius: 8px;
  overflow: hidden;
}

:deep(.el-table th) {
  background-color: #f8f9fa !important;
  color: #666;
  font-weight: 600;
  font-size: 12px;
  padding: 10px 0;
}

:deep(.el-table td) {
  padding: 10px 0;
  font-size: 12px;
}

:deep(.el-table .cell) {
  padding-left: 4px;
  padding-right: 4px;
}

.money {
  font-weight: 600;
}
.money.blue { color: #409EFF; }
.money.orange { color: #E6A23C; }
.money.green { color: #67C23A; }
.money.purple { color: #9c27b0; }

.pagination-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f0f0f0;
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

:deep(.form-row .el-form-item) {
  margin-bottom: 18px;
}

:deep(.el-dialog__body) {
  padding: 20px 24px;
}
</style>
