<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { useFlicker } from '@/hooks/useFlicker'

const props = defineProps({
  task: Number,
  completed: Number
})

const getProgressBarClass = () => {
  const baseClass =
    'transition-all flex items-center justify-center text-black rounded-full min-w-[70px] h-[70px] text-2xl font-bold min-[400px]:text-4xl min-[400px]:min-w-[90px] min-[400px]:h-[90px]  min-[460px]:min-w-[120px] min-[460px]:h-[120px] min-[520px]:text-5xl min-[520px]:min-w-[160px] min-[520px]:h-[160px]'

  return {
    [baseClass]: true,
    'bg-[#1D9F63]': props.completed === props.task && props.task,
    'bg-[#ff5631]': props.completed !== props.task || !props.task
  }
}

const { flicker } = useFlicker({
  speed: 90,
  skipDelay: 100
})
</script>

<template>
  <div class="bg-[#0d0d0d] mx-5 textbg">
    <div
      class="flex justify-between gap-2 items-center ring-1 ring-[#d2c2a7ff] rounded-3xl px-[20px] py-7 min-[520px]:px-[40px]"
    >
      <div class="flex flex-col">
        <div>
          <h2
            v-if="props.completed === props.task && props.task"
            class="texting transition-all text-xl font-medium min-[400px]:text-2xl min-[600px]:text-3xl"
          >
            All Checked!
          </h2>
          <h2
            v-else-if="props.completed !== props.task && props.task"
            class="transition-all text-xl font-medium min-[400px]:text-2xl min-[600px]:text-3xl texting"
          >
            Progress Tracker!
          </h2>
          <h2
            v-else
            class="texting transition-all text-xl font-medium min-[400px]:text-2xl min-[600px]:text-3xl"
          >
            Lets get going!
          </h2>
        </div>
        <div class="display flex gap-1">
          <h3
            ref="flicker"
            class="transition-all text-sm font-light min-[620px]:font-[300] min-[620px]:text-[16px]"
          ></h3>
        </div>
      </div>
      <div v-auto-animate :class="getProgressBarClass()">
        <div v-if="task" class="mt-[10px]">{{ completed }}/{{ task }}</div>
        <div v-else>
          <Icon :icon="'svg-spinners:bouncing-ball'" class="text-4xl" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.textbg {
  color: rgba(255, 0, 0, 0.1);
  background-size: cover;
  background-image: url(https://as1.ftcdn.net/v2/jpg/06/22/08/78/1000_F_622087898_pHFFWB9KKOHOyybM8ky5Pz4XWH9oeJW9.jpg);
  -webkit-background-clip: text;
  animation: background-text-animation 200s linear infinite;
}
@keyframes background-text-animation {
  0% {
    background-position: left 0px top 50%;
  }
  50% {
    background-position: left 1500px top 50%;
  }
  100% {
    background-position: left 0px top 50%;
  }
}
</style>
