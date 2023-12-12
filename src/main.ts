import '../src/style.css'
import '../src/font.css'
import App from './App.vue'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

createApp(App).use(autoAnimatePlugin).mount('#app')
