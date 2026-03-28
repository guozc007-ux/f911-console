<template>
  <div class="page-container">
    <h2>提现审核</h2>
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="请输入关键词" clearable />
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="searchForm.checkStatus" placeholder="全部状态" clearable>
            <el-option label="待审核" :value="0" />
            <el-option label="已通过" :value="1" />
            <el-option label="已拒绝" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="打款状态">
          <el-select v-model="searchForm.remit" placeholder="全部状态" clearable>
            <el-option label="未打款" :value="0" />
            <el-option label="已打款" :value="1" />
            <el-option label="已拒绝" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="userId" label="用户ID" width="100" />
        <el-table-column prop="money" label="提现金额" width="120">
          <template #default="{ row }">
            <span class="money">¥{{ row.money }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="alipayAccount" label="支付宝账号" width="180" />
        <el-table-column prop="alipayName" label="支付宝姓名" width="120" />
        <el-table-column prop="checkStatus" label="审核状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.checkStatus === 0" type="warning">待审核</el-tag>
            <el-tag v-else-if="row.checkStatus === 1" type="success">已通过</el-tag>
            <el-tag v-else type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remit" label="打款状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.remit === 0" type="info">未打款</el-tag>
            <el-tag v-else-if="row.remit === 1" type="success">已打款</el-tag>
            <el-tag v-else type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="checkRemark" label="审核备注" min-width="150" />
        <el-table-column prop="remitRemark" label="打款备注" min-width="150" />
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="success" size="small" @click="handleCheck(row)">审核</el-button>
            <el-button type="warning" size="small" @click="handleRemit(row)">打款</el-button>
            <el-button type="danger" size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
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

    <el-dialog v-model="checkDialogVisible" title="审核提现申请" width="400px">
      <el-form :model="checkForm" label-width="80px">
        <el-form-item label="审核结果">
          <el-radio-group v-model="checkForm.checkStatus">
            <el-radio :label="1">通过</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核备注">
          <el-input v-model="checkForm.checkRemark" type="textarea" rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="checkDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCheckSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="remitDialogVisible" title="更新打款状态" width="400px">
      <el-form :model="remitForm" label-width="80px">
        <el-form-item label="打款结果">
          <el-radio-group v-model="remitForm.remit">
            <el-radio :label="1">已打款</el-radio>
            <el-radio :label="2">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="打款备注">
          <el-input v-model="remitForm.remitRemark" type="textarea" rows="3" placeholder="请输入备注" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="remitDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleRemitSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getApplyList,
  updateApplyCheck,
  updateApplyRemit,
  deleteApply,
} from '../../api/apply'

const loading = ref(false)
const tableData = ref([])
const searchForm = reactive({
  keyword: '',
  checkStatus: undefined,
  remit: undefined,
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const checkDialogVisible = ref(false)
const checkForm = reactive({
  id: undefined,
  checkStatus: 1,
  checkRemark: '',
})

const remitDialogVisible = ref(false)
const remitForm = reactive({
  id: undefined,
  remit: 1,
  remitRemark: '',
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getApplyList({
      page: pagination.page,
      pageSize: pagination.pageSize,
      ...searchForm,
    })
    if (res.code === 200) {
      tableData.value = res.data.data
      pagination.total = res.data.total
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
  searchForm.keyword = ''
  searchForm.checkStatus = undefined
  searchForm.remit = undefined
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

const handleCheck = (row) => {
  checkForm.id = row.id
  checkForm.checkStatus = 1
  checkForm.checkRemark = ''
  checkDialogVisible.value = true
}

const handleCheckSubmit = async () => {
  try {
    const res = await updateApplyCheck(checkForm.id, {
      checkStatus: checkForm.checkStatus,
      checkRemark: checkForm.checkRemark,
    })
    if (res.code === 200) {
      ElMessage.success('审核成功')
      checkDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleRemit = (row) => {
  remitForm.id = row.id
  remitForm.remit = 1
  remitForm.remitRemark = ''
  remitDialogVisible.value = true
}

const handleRemitSubmit = async () => {
  try {
    const res = await updateApplyRemit(remitForm.id, {
      remit: remitForm.remit,
      remitRemark: remitForm.remitRemark,
    })
    if (res.code === 200) {
      ElMessage.success('打款状态更新成功')
      remitDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm('确定要删除该提现申请吗？', '提示', {
      type: 'warning',
    })
    const res = await deleteApply(row.id)
    if (res.code === 200) {
      ElMessage.success('删除成功')
      loadData()
    } else {
      ElMessage.error(res.msg || '删除失败')
    }
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
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
  color: #E6A23C;
  font-weight: bold;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
