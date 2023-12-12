<script setup lang="ts">
import { v4 as uuid } from 'uuid'
import { Icon } from '@iconify/vue'
import TaskCard from './TaskCard.vue'
import { useStorage } from '@vueuse/core'
import { onMounted, computed, ref } from 'vue'
import ProgressTrack from './ProgressTrack.vue'

type Task = {
  id: string
  task: string
  completed: boolean
  isEditing: boolean
  created_at: number
}

const tasks = useStorage('tasks', [] as Task[])

const sortedTasks = computed(() => {
  return [...tasks.value].sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1
    }
    return b.created_at - a.created_at
  })
})

const input = ref()
const currentTask = ref('')
const validation = ref(true)

const toggleComplete = (index: number) => {
  sortedTasks.value[index].completed = !sortedTasks.value[index].completed
}
const handleSave = (editedTask: string, index: number) => {
  sortedTasks.value[index].task = editedTask
  sortedTasks.value[index].isEditing = !sortedTasks.value[index].isEditing
}

const handleEdit = (index: number) => {
  sortedTasks.value[index].isEditing = !sortedTasks.value[index].isEditing
}

const handleDelete = (taskID: string) => {
  tasks.value = sortedTasks.value?.filter((task) => task.id !== taskID)
}

const submitHandler = () => {
  if (input.value.textContent.trim().length > 3) {
    currentTask.value = input.value.textContent
    const newID = uuid()
    let task = currentTask.value.trim()
    task = task.charAt(0).toUpperCase() + task.slice(1)

    const newTask: Task = {
      id: newID,
      task: task,
      isEditing: false,
      completed: false,
      created_at: Date.now()
    }

    input.value.innerHTML = ''
    tasks.value.push(newTask)
    validation.value = true
  } else {
    validation.value = false
  }
}

onMounted(() => {
  if (localStorage.getItem('tasks')) {
    tasks.value = JSON.parse(localStorage.getItem('tasks')!)
  }
})
</script>

<template>
  <div v-auto-animate>
    <ProgressTrack
      :task="tasks.length"
      :completed="tasks.filter((task) => task.completed).length"
    />
    <div class="bg-[#0d0d0d] mx-5 sticky top-14 z-10 mt-8 pb-3" v-auto-animate>
      <Label class="mt-5 text-sm">Enter a task</Label>
      <div class="flex gap-5 justify-between items-center">
        <div class="flex flex-col w-full">
          <span
            ref="input"
            contenteditable
            :autoFocus="true"
            @keydown.enter.prevent="submitHandler"
            class="w-full rounded-lg text-sm font-[300] p-3 bg-[#1e1e1e] opacity-90 outline-none min-[400px]:text-[16px] max-h-[84px] overflow-y-auto"
          >
          </span>
        </div>

        <div class="flex gap-5">
          <button type="button" @click.prevent="submitHandler" class="button">
            <Icon icon="line-md:plus" />
          </button>
          <div class="tooltip">
            <button
              type="button"
              class="button"
              aria-label="Clear all"
              @dblclick="tasks = []"
              :disabled="!tasks.length"
            >
              <Icon icon="codicon:clear-all" />
              <span class="tooltiptext">Double click to clear tasks</span>
            </button>
          </div>
        </div>
      </div>
      <div v-if="!validation" class="text-[10px] font-thin text-red-500 flex items-center gap-1">
        <Icon icon="maki:caution" />
        <span class="mt-1">A task must contain at least 4 characters</span>
      </div>
    </div>

    <div v-if="tasks.length > 0" v-auto-animate class="mt-5">
      <TaskCard
        v-for="(task, index) in sortedTasks"
        :id="task.id"
        :key="task.id"
        :index="index"
        :task="task.task"
        @edit="handleEdit"
        @save="handleSave"
        @delete="handleDelete"
        :editing="task.isEditing"
        :created="task.created_at"
        :completed="task.completed"
        @update:model-value="toggleComplete"
      />
    </div>
    <div v-else class="flex flex-col items-center justify-center font-light text-center mt-10">
      <div>
        <Icon icon="svg-spinners:blocks-wave" class="text-[#ff5631] text-3xl cursor-pointer" />
      </div>
      <h3 text-md>It's empty!</h3>
    </div>
  </div>
</template>

<style scoped>
.button {
  @apply flex items-center justify-center bg-[#ff5631] opacity-70  rounded-full h-10 w-10 text-xl font-bold text-black hover:opacity-100 disabled:cursor-not-allowed disabled:hover:opacity-70;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  left: 50%;
  z-index: 1;
  opacity: 0;
  bottom: 85%;
  color: #fff;
  font-size: 10px;
  padding: 0 10px;
  font-weight: 300;
  width: max-content;
  border-radius: 6px;
  position: absolute;
  text-align: center;
  visibility: hidden;
  margin-left: -110px;
  background-color: #555;
  transition: opacity 0.3s;
}

.tooltip:hover .tooltiptext {
  opacity: 0.8;
  visibility: visible;
}
</style>
