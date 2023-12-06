import { fr } from '@formkit/i18n'
import { genesisIcons } from '@formkit/icons'
import myTailwindTheme from './tailwind-theme'
import { generateClasses } from '@formkit/themes'
import { DefaultConfigOptions } from '@formkit/vue'
import { createLocalStoragePlugin } from '@formkit/addons'

const config: DefaultConfigOptions = {
  plugins: [
    createLocalStoragePlugin({
      // plugin defaults:
      prefix: 'formkit',
      key: undefined,
      control: undefined,
      maxAge: 3600000, // 1 hour
      debounce: 200,
      beforeSave: undefined,
      beforeLoad: undefined
    })
  ],
  icons: {
    ...genesisIcons
  },
  config: {
    classes: generateClasses(myTailwindTheme)
  }
}

export default config
