<template>
  <div class="page-container">
    <h2>陪玩资料审核</h2>
    <el-card>
      <el-table :data="[]" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="player" label="陪玩" />
        <el-table-column prop="info" label="资料类型" />
        <el-table-column prop="status" label="审核状态" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button type="success" size="small">通过</el-button>
            <el-button type="danger" size="small">拒绝</el-button>
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
</style>
