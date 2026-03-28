<template>
  <div class="page-container">
    <h2>陪玩等级管理</h2>
    <el-card class="search-card">
      <el-form :model="searchForm" inline>
        <el-form-item label="关键词">
          <el-input v-model="searchForm.keyword" placeholder="等级名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="searchForm.status" placeholder="全部" clearable>
            <el-option label="禁用" :value="0" />
            <el-option label="启用" :value="1" />
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
        <el-button type="primary" @click="handleAdd">新增等级</el-button>
      </div>

      <el-table :data="tableData" border v-loading="loading">
        <el-table-column prop="playerLevelId" label="ID" width="80" />
        <el-table-column prop="name" label="等级名称" width="200" />
        <el-table-column prop="percent" label="分成比例" width="120">
          <template #default="{ row }">
            <span>{{ row.percent }}%</span>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="100" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag v-if="row.status === 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createdAt" label="创建时间" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)">编辑</el-button>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle" width="500px">
      <el-form :model="form" label-width="100px">
        <el-form-item label="等级名称">
          <el-input v-model="form.name" placeholder="请输入等级名称" />
        </el-form-item>
        <el-form-item label="分成比例">
          <el-input-number v-model="form.percent" :min="0" :max="100" :precision="2" />
        </el-form-item>
        <el-form-item label="排序">
          <el-input-number v-model="form.sort" :min="0" />
        </el-form-item>
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  getPlayerLevelList,
  createPlayerLevel,
  updatePlayerLevel,
  deletePlayerLevel,
} from '../../api/player-level'

const loading = ref(false)
const tableData = ref([])
const searchForm = reactive({
  keyword: '',
  status: undefined,
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
})

const dialogVisible = ref(false)
const dialogTitle = ref('')
const form = reactive({
  playerLevelId: undefined,
  name: '',
  percent: 0,
  sort: 0,
  status: 1,
})

const loadData = async () => {
  loading.value = true
  try {
    const res = await getPlayerLevelList({
      page: pagination.page,
      pageSize: pagination.pageSize,
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
  searchForm.keyword = ''
  searchForm.status = undefined
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
  form.playerLevelId = undefined
  form.name = ''
  form.percent = 0
  form.sort = 0
  form.status = 1
}

const handleAdd = () => {
  resetForm()
  dialogTitle.value = '新增等级'
  dialogVisible.value = true
}

const handleEdit = (row) => {
  Object.assign(form, row)
  dialogTitle.value = '编辑等级'
  dialogVisible.value = true
}

const handleSubmit = async () => {
  try {
    const data = { ...form }
    delete data.playerLevelId
    const res = form.playerLevelId
      ? await updatePlayerLevel(form.playerLevelId, data)
      : await createPlayerLevel(form)
    if (res.code === 200) {
      ElMessage.success(form.playerLevelId ? '更新成功' : '创建成功')
      dialogVisible.value = false
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
    await ElMessageBox.confirm('确定要删除该等级吗？', '提示', {
      type: 'warning',
    })
    const res = await deletePlayerLevel(row.playerLevelId)
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
