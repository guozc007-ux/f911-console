<template>
  <div class="page-container">
    <h2>充值列表</h2>
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="老板ID">
          <el-input-number v-model="searchForm.bossId" :min="1" placeholder="请输入老板ID" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="fundFlowId" label="ID" width="80" />
        <el-table-column prop="bossId" label="老板ID" width="100" />
        <el-table-column prop="amount" label="充值金额" width="120">
          <template #default="{ row }">
            <span class="money">¥{{ row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="give" label="赠送金额" width="120">
          <template #default="{ row }">
            <span class="money">¥{{ row.give }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balanceBefore" label="充值前余额" width="120">
          <template #default="{ row }">
            <span>¥{{ row.balanceBefore }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="balanceAfter" label="充值后余额" width="120">
          <template #default="{ row }">
            <span>¥{{ row.balanceAfter }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="100" />
        <el-table-column prop="remark" label="备注" min-width="150" />
        <el-table-column prop="createdAt" label="创建时间" width="180" />
      </el-table>

      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { getFundFlowList } from '../../api/fund-flow'

const loading = ref(false)
const tableData = ref([])
const searchForm = reactive({
  bossId: undefined,
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getFundFlowList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      operationType: 1,
      ...searchForm,
    })
    if (res.code === 200) {
      tableData.value = res.data.data || []
      pagination.total = res.data.total || 0
    }
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

const handleReset = () => {
  searchForm.bossId = undefined
  handleSearch()
}

const handleSizeChange = (val) => {
  pagination.pageSize = val
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
  padding: 20px;
}

.search-card {
  margin-bottom: 20px;
}

.money {
  color: #67C23A;
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
