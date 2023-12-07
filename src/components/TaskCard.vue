<script setup lang="ts">
import { Icon } from '@iconify/vue'
import CheckBox from './CheckBox.vue'
import { useFocus } from '@vueuse/core'
import { computed, ref, type PropType } from 'vue'

const props = defineProps({
  id: String as PropType<string>,
  task: String as PropType<string>,
  index: Number as PropType<number>,
  editing: Boolean as PropType<boolean>,
  completed: Boolean as PropType<boolean>
})

const editedTask = ref(props.task)

const defaultIcon =
  'hover:text-[#ff5631] opacity-10 cursor-pointer group-hover:opacity-100 transition ease-in-out delay-150'

const text = ref()
useFocus(text, { initialValue: true })

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
</script>

<template>
  <div
    :class="`transition-all group flex gap-3 items-center justify-between rounded-lg ${
      !completed ? 'bg-[#1e1e1e]' : 'bg-[#171515]'
    } min-h-[50px] h-fit px-3 mx-6 ring-1 ring-[#d2c2a7ff] mb-4 transition ease-in-out delay-150 min-[400px]:px-5`"
  >
    <div v-auto-animate class="flex gap-3 w-full items-center">
      <CheckBox :id="id" v-model="isCompleted" />
      <p
        v-if="!editing"
        :class="`text-sm font-[300] py-3 min-[400px]:text-[16px] break-all ${
          completed ? 'line-through' : ''
        }`"
      >
        {{ task }}
      </p>
      <input
        v-else
        ref="text"
        v-model="editedTask"
        @keyup.esc="$emit('edit', index)"
        @keyup.enter="$emit('save', editedTask, index)"
        class="w-full text-sm font-[300] bg-transparent opacity-70 py-3 outline-none min-[400px]:text-[16px]"
      />
    </div>

    <div
      class="transition-all flex gap-3 items-center text-lg min-[400px]:gap-5 min-[400px]:text-2xl"
    >
      <Icon
        icon="line-md:square-to-confirm-square-twotone-transition"
        v-if="editing"
        @click="$emit('save', editedTask, index)"
        class="text-[#1D9F63] cursor-pointer"
      />
      <Icon
        icon="line-md:edit"
        v-else
        :class="defaultIcon"
        @click="$emit('edit', index), (editedTask = task)"
      />
      <Icon
        icon="line-md:cancel"
        v-if="editing"
        @click="$emit('edit', index)"
        class="text-[#ff5631] cursor-pointer"
      />
      <Icon v-else icon="line-md:remove" @click="$emit('delete', id)" :class="defaultIcon" />
    </div>
  </div>
</template>
