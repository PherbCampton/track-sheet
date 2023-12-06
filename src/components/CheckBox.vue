<script setup lang="ts">
import { Icon } from '@iconify/vue'

defineProps({
  id: String,
  modelValue: Boolean
})

const emit = defineEmits(['update:modelValue'])

const handleChange = (event: Event): void => {
  // @ts-ignore next-line
  emit('update:modelValue', event.target.checked)
}
</script>

<template>
  <input :id="id" class="hidden" type="checkbox" :checked="modelValue" @change="handleChange" />
  <label :for="id">
    <Icon
      v-if="modelValue"
      :icon="'line-md:confirm-circle'"
      class="transition-all text-[#1D9F63] text-lg cursor-pointer min-[400px]:text-2xl"
    />
    <Icon
      v-else
      :icon="'line-md:confirm-circle-to-circle-transition'"
      class="transition-all text-[#ff5631] text-lg cursor-pointer min-[400px]:text-2xl"
    />
  </label>
</template>
