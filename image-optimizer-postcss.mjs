import fs from 'node:fs'
import path from 'node:path'

const TARGET_RULES = [
  {
    pattern:
      /(imagemgerada1792508738349-46e0f|captura-de-tela-2026-10-22-212702-17d92|captura-de-tela-2026-10-22-212743-01306|03-d8f89|1-7e94d|2-ec1a1)/i,
    maxWidth: 960,
  },
  {
    pattern:
      /(screenshot-2026-10-23-112444-c8077|manual-do-freezer|manual-aa09b|imagem1-3d289|freezer-bonus1)/i,
    maxWidth: 1200,
  },
  {
    pattern: /luiza-[123]-/i,
    maxWidth: 1400,
  },
]

let hasRun = false

export async function optimizeAssets() {
  if (hasRun) return
  hasRun = true

  let sharpModule
  try {
    sharpModule = (await import('sharp')).default
  } catch (err) {
    console.warn('[optimize-images] Sharp não disponível no runtime, pulando:', err)
    return
  }

  const sharp = sharpModule
  const assetsDir = path.resolve(process.cwd(), 'src/assets')
  if (!fs.existsSync(assetsDir)) return

  const files = fs.readdirSync(assetsDir)

  for (const fileName of files) {
    if (!/\.(png|jpe?g)$/i.test(fileName)) continue

    const filePath = path.join(assetsDir, fileName)
    const fileStat = fs.statSync(filePath)
    const originalSize = fileStat.size

    const matchedRule = TARGET_RULES.find((r) => r.pattern.test(fileName))
    const maxWidth = matchedRule ? matchedRule.maxWidth : 1200

    try {
      const inputBuffer = fs.readFileSync(filePath)
      const metadata = await sharp(inputBuffer).metadata()

      let pipeline = sharp(inputBuffer)
      if (metadata.width && metadata.width > maxWidth) {
        pipeline = pipeline.resize({
          width: maxWidth,
          withoutEnlargement: true,
          fit: 'inside',
        })
      }

      // Converter para WebP mantendo < 200KB com passos adaptativos de qualidade (80 -> 70 -> 60)
      const qualitySteps = [80, 70, 60]
      let bestWebpBuffer = null

      for (const quality of qualitySteps) {
        const candidate = await pipeline
          .clone()
          .webp({
            quality,
            effort: 5,
          })
          .toBuffer()

        bestWebpBuffer = candidate
        if (candidate.length <= 200 * 1024) {
          break
        }
      }

      if (bestWebpBuffer) {
        const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp')
        fs.writeFileSync(webpPath, bestWebpBuffer)

        if (bestWebpBuffer.length < originalSize) {
          fs.writeFileSync(filePath, bestWebpBuffer)
        }

        console.log(
          `[optimize-images] ${fileName}: ${(originalSize / 1024).toFixed(1)}KB -> ${(bestWebpBuffer.length / 1024).toFixed(1)}KB (.webp gerado)`,
        )
      }
    } catch (imgErr) {
      console.warn(`[optimize-images] Erro ao processar ${fileName}:`, imgErr)
    }
  }
}

export default function imageOptimizerPostcssPlugin() {
  return {
    postcssPlugin: 'image-optimizer-postcss-plugin',
    async Once(root) {
      await optimizeAssets()
    },
    async prepare() {
      await optimizeAssets()
      return {}
    },
  }
}
imageOptimizerPostcssPlugin.postcss = true
