<template>
  <div class="page-container">
    <h2>角色权限管理</h2>
    <el-card>
      <div class="toolbar">
        <el-button type="primary">新增角色</el-button>
      </div>
      <el-table :data="[]" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="name" label="角色名称" />
        <el-table-column prop="permissions" label="权限" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="danger" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
</script>

<style scoped>
.page-container {
  padding: 20px;
}

.toolbar {
  margin-bottom: 20px;
}
</style>
