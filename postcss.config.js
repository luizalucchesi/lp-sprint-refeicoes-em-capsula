/* PostCSS Config file: https://postcss.org */
import imageOptimizer from './image-optimizer-postcss.mjs'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default {
  plugins: [
    imageOptimizer(),
    tailwindcss(),
    autoprefixer(),
  ],
}
