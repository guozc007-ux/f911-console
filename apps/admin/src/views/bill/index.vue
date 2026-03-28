<template>
  <div class="page-container">
    <h2>报单管理</h2>
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="单号">
          <el-input v-model="searchForm.no" placeholder="请输入单号" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部状态" clearable>
            <el-option label="待审核" :value="0" />
            <el-option label="已通过" :value="1" />
            <el-option label="已拒绝" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付状态">
          <el-select v-model="searchForm.payStatus" placeholder="全部状态" clearable>
            <el-option label="未支付" :value="0" />
            <el-option label="已支付" :value="1" />
            <el-option label="已退款" :value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <div class="toolbar">
        <el-button type="primary" @click="handleAdd">新增报单</el-button>
      </div>

      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="no" label="单号" width="150" />
        <el-table-column prop="bossId" label="老板ID" width="100" />
        <el-table-column prop="userId" label="陪玩ID" width="100" />
        <el-table-column prop="customerId" label="客服ID" width="100" />
        <el-table-column prop="categoryId" label="游戏品类" width="100" />
        <el-table-column prop="quantity" label="数量" width="80" />
        <el-table-column prop="totalAmount" label="总金额" width="100" />
        <el-table-column prop="shopMoney" label="门店金额" width="100" />
        <el-table-column prop="playerCommission" label="陪玩佣金" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.status === 0" type="warning">待审核</el-tag>
            <el-tag v-else-if="row.status === 1" type="success">已通过</el-tag>
            <el-tag v-else type="danger">已拒绝</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="支付状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.payStatus === 0" type="info">未支付</el-tag>
            <el-tag v-else-if="row.payStatus === 1" type="success">已支付</el-tag>
            <el-tag v-else type="danger">已退款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="success" size="small" @click="handleUpdateStatus(row)">审核</el-button>
            <el-button type="warning" size="small" @click="handleUpdatePayStatus(row)">支付</el-button>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="600px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="单号">
          <el-input v-model="form.no" placeholder="请输入单号" />
        </el-form-item>
        <el-form-item label="陪玩ID">
          <el-input-number v-model="form.userId" :min="1" />
        </el-form-item>
        <el-form-item label="客服ID">
          <el-input-number v-model="form.customerId" :min="1" />
        </el-form-item>
        <el-form-item label="老板ID">
          <el-input-number v-model="form.bossId" :min="1" />
        </el-form-item>
        <el-form-item label="游戏品类">
          <el-input-number v-model="form.categoryId" :min="1" />
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number v-model="form.quantity" :min="1" />
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type" placeholder="请输入类型" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" type="textarea" rows="3" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item label="开始时间">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择开始时间" />
        </el-form-item>
        <el-form-item label="结束时间">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择结束时间" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="statusDialogVisible" title="更新状态" width="400px">
      <el-form :model="statusForm" label-width="80px">
        <el-form-item label="状态">
          <el-select v-model="statusForm.status">
            <el-option label="待审核" :value="0" />
            <el-option label="已通过" :value="1" />
            <el-option label="已拒绝" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="statusDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleStatusSubmit">确定</el-button>
      </template>
    </el-dialog>

    <el-dialog v-model="payStatusDialogVisible" title="更新支付状态" width="400px">
      <el-form :model="payStatusForm" label-width="80px">
        <el-form-item label="支付状态">
          <el-select v-model="payStatusForm.payStatus">
            <el-option label="未支付" :value="0" />
            <el-option label="已支付" :value="1" />
            <el-option label="已退款" :value="2" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="payStatusDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handlePayStatusSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getProjectReportList,
  createProjectReport,
  updateProjectReport,
  updateProjectReportStatus,
  updateProjectReportPayStatus,
  deleteProjectReport,
} from '../../api/project-report'

const loading = ref(false)
const tableData = ref([])
const searchForm = reactive({
  no: '',
  status: undefined,
  payStatus: undefined,
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = reactive({
  id: undefined,
  no: '',
  userId: undefined,
  customerId: undefined,
  bossId: undefined,
  categoryId: undefined,
  quantity: 1,
  type: '',
  remark: '',
  startTime: '',
  endTime: '',
})

const statusDialogVisible = ref(false)
const statusForm = reactive({
  id: undefined,
  status: 0,
})

const payStatusDialogVisible = ref(false)
const payStatusForm = reactive({
  id: undefined,
  payStatus: 0,
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getProjectReportList({
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
  searchForm.no = ''
  searchForm.status = undefined
  searchForm.payStatus = undefined
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

const resetForm = () => {
  form.id = undefined
  form.no = ''
  form.userId = undefined
  form.customerId = undefined
  form.bossId = undefined
  form.categoryId = undefined
  form.quantity = 1
  form.type = ''
  form.remark = ''
  form.startTime = ''
  form.endTime = ''
}

const handleAdd = () => {
  resetForm()
  dialogTitle.value = '新增报单'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, row)
  dialogTitle.value = '编辑报单'
  dialogVisible.value = true
}

const handleSubmit = async () => {
  try {
    const data = { ...form }
    delete data.id
    const res = form.id
      ? await updateProjectReport(form.id, data)
      : await createProjectReport(form)
    if (res.code === 200) {
      ElMessage.success(form.id ? '更新成功' : '创建成功')
      dialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleUpdateStatus = (row) => {
  statusForm.id = row.id
  statusForm.status = row.status
  statusDialogVisible.value = true
}

const handleStatusSubmit = async () => {
  try {
    const res = await updateProjectReportStatus(statusForm.id, {
      status: statusForm.status,
    })
    if (res.code === 200) {
      ElMessage.success('状态更新成功')
      statusDialogVisible.value = false
      loadData()
    } else {
      ElMessage.error(res.msg || '操作失败')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleUpdatePayStatus = (row) => {
  payStatusForm.id = row.id
  payStatusForm.payStatus = row.payStatus
  payStatusDialogVisible.value = true
}

const handlePayStatusSubmit = async () => {
  try {
    const res = await updateProjectReportPayStatus(payStatusForm.id, {
      payStatus: payStatusForm.payStatus,
    })
    if (res.code === 200) {
      ElMessage.success('支付状态更新成功')
      payStatusDialogVisible.value = false
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
    await ElMessageBox.confirm('确定要删除该报单吗？', '提示', {
      type: 'warning',
    })
    const res = await deleteProjectReport(row.id)
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

.toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  justify-content: flex-end;
}
</style>
