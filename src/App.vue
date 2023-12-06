<script setup lang="ts">
import NavBar from './components/NavBar.vue'
import TaskInput from './components/TaskInput.vue'
</script>

<template>
  <div class="max-w-screen-lg mx-auto">
    <NavBar />
    <div class="max-w-screen-sm mx-auto mt-10">
      <TaskInput />
    </div>
  </div>
</template>

<style scoped></style>
