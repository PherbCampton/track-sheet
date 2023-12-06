import '../src/style.css'
import '../src/font.css'
import App from './App.vue'

import { createApp } from 'vue'
import config from '../formkit.config'
import { plugin, defaultConfig } from '@formkit/vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

createApp(App).use(autoAnimatePlugin).use(plugin, defaultConfig(config)).mount('#app')
