<template>
  <div class="page-container">
    <h2>派单列表</h2>
    <el-card>
      <el-table :data="[]" border>
        <el-table-column prop="id" label="ID" />
        <el-table-column prop="boss" label="老板" />
        <el-table-column prop="player" label="陪玩" />
        <el-table-column prop="game" label="游戏" />
        <el-table-column prop="status" label="状态" />
        <el-table-column label="操作" width="200">
          <template #default>
            <el-button type="primary" size="small">查看</el-button>
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
