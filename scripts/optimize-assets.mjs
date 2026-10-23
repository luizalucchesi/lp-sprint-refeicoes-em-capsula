import { promises as fs } from 'node:fs'
import path from 'node:path'

/**
 * Script de otimização de imagens do Instituto do Sabor.
 * Pipeline com suporte a import dinâmico de ferramentas de compressão
 * quando disponíveis no ambiente Node.
 */
async function optimizeImage({ inputPath, outputPath, maxDimension = 1200, quality = 80 }) {
  console.log(`Processing: ${inputPath}...`)
  try {
    const { default: decodePng } = await import('@jsquash/png/decode.js')
    const { default: decodeJpeg } = await import('@jsquash/jpeg/decode.js')
    const { default: resize } = await import('@jsquash/resize')
    const { default: encodeWebp } = await import('@jsquash/webp/encode.js')

    const inputBuffer = await fs.readFile(inputPath)
    let rawImageData

    if (inputPath.endsWith('.png')) {
      rawImageData = await decodePng(inputBuffer)
    } else if (inputPath.endsWith('.jpg') || inputPath.endsWith('.jpeg')) {
      rawImageData = await decodeJpeg(inputBuffer)
    } else {
      throw new Error(`Unsupported format: ${inputPath}`)
    }

    let { width, height } = rawImageData
    console.log(`  Original: ${width}x${height}`)

    if (width > maxDimension || height > maxDimension) {
      const scale = Math.min(maxDimension / width, maxDimension / height)
      const targetWidth = Math.round(width * scale)
      const targetHeight = Math.round(height * scale)
      console.log(`  Resizing to: ${targetWidth}x${targetHeight}`)
      rawImageData = await resize(rawImageData, { width: targetWidth, height: targetHeight })
    }

    console.log(`  Encoding WebP (q=${quality})...`)
    const webpBuffer = await encodeWebp(rawImageData, { quality })
    await fs.writeFile(outputPath, Buffer.from(webpBuffer))

    const originalSize = inputBuffer.length
    const newSize = webpBuffer.byteLength || webpBuffer.length
    console.log(
      `  Done: ${(originalSize / 1024).toFixed(1)}KB -> ${(newSize / 1024).toFixed(1)}KB (-${Math.round((1 - newSize / originalSize) * 100)}%)\n`,
    )
  } catch (err) {
    console.warn(
      `  [optimize-assets] Erro ou módulo não disponível para ${inputPath}:`,
      err.message,
    )
  }
}

export async function run() {
  const assetsDir = path.resolve('src/assets')
  const files = [
    {
      input: 'imagemgerada1792508738349-46e0f.png',
      output: 'imagemgerada1792508738349.webp',
      maxDimension: 1200,
      quality: 80,
    },
    {
      input: 'captura-de-tela-2026-10-22-212702-17d92.png',
      output: 'planilha-mestra.webp',
      maxDimension: 1200,
      quality: 85,
    },
    {
      input: 'captura-de-tela-2026-10-22-212743-01306.png',
      output: 'tabela-macros.webp',
      maxDimension: 1200,
      quality: 85,
    },
    { input: '03-d8f89.png', output: '03-optimized.webp', maxDimension: 1200, quality: 80 },
    { input: 'luiza-1-7d847.jpg', output: 'luiza-1.webp', maxDimension: 1200, quality: 80 },
    { input: 'luiza-2-521f3.jpg', output: 'luiza-2.webp', maxDimension: 1200, quality: 80 },
    { input: 'luiza-3-a6c15.jpg', output: 'luiza-3.webp', maxDimension: 1200, quality: 80 },
  ]

  for (const item of files) {
    await optimizeImage({
      inputPath: path.join(assetsDir, item.input),
      outputPath: path.join(assetsDir, item.output),
      maxDimension: item.maxDimension,
      quality: item.quality,
    })
  }
}

// Auto-run if executed directly
if (process.argv[1] && process.argv[1].endsWith('optimize-assets.mjs')) {
  run().catch(console.error)
}
