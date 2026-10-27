/* PostCSS Config file: https://postcss.org */

import imageOptimizer from './image-optimizer-postcss.mjs'

import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// Executa otimização antes dos plugins do postcss
await (await import('./image-optimizer-postcss.mjs')).optimizeAssets()

export default {
  plugins: [
    imageOptimizer(),
    tailwindcss(),
    autoprefixer(),
  ],
}
