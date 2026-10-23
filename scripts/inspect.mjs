import fs from 'node:fs'
import path from 'node:path'

const files = [
  '03-d8f89.png',
  'captura-de-tela-2026-10-22-212702-17d92.png',
  'captura-de-tela-2026-10-22-212743-01306.png',
  'imagemgerada1792508738349-46e0f.png',
  'luiza-1-7d847.jpg',
  'luiza-2-521f3.jpg',
  'luiza-3-a6c15.jpg',
  'manual-do-freezer-receitas-em-capsula1-b9d28.pptx',
]

for (const file of files) {
  const filePath = path.join('src/assets', file)
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath)
    console.log(`${file}: ${(stat.size / 1024).toFixed(1)} KB (${stat.size} bytes)`)
  } else {
    console.log(`${file}: NOT FOUND`)
  }
}
