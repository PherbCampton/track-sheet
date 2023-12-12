<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CheckBox from './CheckBox.vue'
import { computed, ref, type PropType } from 'vue'

const props = defineProps({
  id: String as PropType<string>,
  task: String as PropType<string>,
  index: Number as PropType<number>,
  editing: Boolean as PropType<boolean>,
  completed: Boolean as PropType<boolean>
})

const text = ref()
const editedTask = ref(props.task)

const defaultIcon =
  'hover:text-[#ff5631] opacity-70 cursor-pointer group-hover:opacity-100 transition ease-in-out delay-150'

const emit = defineEmits(['update:modelValue', 'delete', 'edit', 'save', 'toggleComplete'])

const isCompleted = computed({
  get() {
    return props.completed
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  set(_) {
    emit('update:modelValue', props.index)
  }
})

const handleEdit = () => {
  text.value.focus()
  emit('edit', props.index)
  editedTask.value = props.task
}

const handleCancle = () => {
  text.value.innerText = props.task
  emit('save', editedTask, props.index)
}

const handleSave = () => {
  emit('save', editedTask, props.index)
  editedTask.value = text.value.textContent
}
</script>

<template>
  <div
    :class="`transition-all group flex gap-3 items-center justify-between rounded-lg ${
      !completed ? 'bg-[#1e1e1e]' : 'bg-[#171515]'
    } min-h-[50px] h-fit px-3 mx-6 ring-1 ring-[#d2c2a7ff] mb-4 transition ease-in-out delay-150 min-[400px]:px-5`"
  >
    <div v-auto-animate class="flex gap-3 w-full items-center">
      <CheckBox :id="id" v-model="isCompleted" />
      <span
        ref="text"
        :contenteditable="editing"
        @keydown.esc="handleCancle"
        @keydown.enter.prevent="handleSave"
        :class="`text-justify text-sm font-[300] py-3 min-[400px]:text-[16px] break-words w-full outline-none mt-1 ${
          completed && !editing ? 'line-through' : ''
        } ${editing ? 'blink' : ''} `"
      >
        {{ task }}
      </span>
    </div>

    <div
      class="transition-all flex gap-3 items-center text-lg min-[400px]:gap-5 min-[400px]:text-2xl"
    >
      <Icon
        icon="line-md:square-to-confirm-square-twotone-transition"
        v-if="editing"
        @click="handleSave"
        class="text-[#1D9F63] cursor-pointer"
      />
      <Icon icon="line-md:edit" v-else :class="defaultIcon" @click="handleEdit" />
      <Icon
        icon="line-md:cancel"
        v-if="editing"
        @click="handleCancle"
        class="text-[#ff5631] cursor-pointer"
      />
      <Icon v-else icon="line-md:remove" @click="$emit('delete', id)" :class="defaultIcon" />
    </div>
  </div>
</template>

<style scoped>
.blink {
  animation: animate 2s linear infinite;
}

@keyframes animate {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    opacity: 0.2;
  }
}
</style>
