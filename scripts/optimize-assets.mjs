import { promises as fs } from 'node:fs'
import path from 'node:path'
import decodePng from '@jsquash/png/decode.js'
import decodeJpeg from '@jsquash/jpeg/decode.js'
import resize from '@jsquash/resize'
import encodeWebp from '@jsquash/webp/encode.js'

async function optimizeImage({ inputPath, outputPath, maxDimension = 1200, quality = 80 }) {
  console.log(`Processing: ${inputPath}...`)
  const inputBuffer = await fs.readFile(inputPath)
  let rawImageData

  if (inputPath.endsWith('.png')) {
    rawImageData = await decodePng(inputBuffer)
  } else if (inputPath.endsWith('.jpg') || inputPath.endsWith('.jpeg')) {
    rawImageData = await decodeJpeg(inputBuffer)
  } else {
    throw new Error(`Unsupported format: ${inputPath}`)
  }

  let { width, height, data } = rawImageData
  console.log(
    `Original dimensions: ${width}x${height}, size: ${(inputBuffer.length / 1024).toFixed(1)}KB`,
  )

  // Check if resizing is needed
  if (width > maxDimension || height > maxDimension) {
    let targetWidth = width
    let targetHeight = height
    if (width >= height) {
      targetWidth = maxDimension
      targetHeight = Math.round((height * maxDimension) / width)
    } else {
      targetHeight = maxDimension
      targetWidth = Math.round((width * maxDimension) / height)
    }
    console.log(`Resizing to: ${targetWidth}x${targetHeight}`)
    const resizedData = await resize(rawImageData, {
      width: targetWidth,
      height: targetHeight,
      method: 'lanczos3',
    })
    width = targetWidth
    height = targetHeight
    data = resizedData.data
  }

  // Encode to WebP
  const webpBuffer = await encodeWebp({ data, width, height }, { quality })

  const outputBytes = Buffer.from(webpBuffer)
  await fs.writeFile(outputPath, outputBytes)
  console.log(
    `Saved ${outputPath} - ${(outputBytes.length / 1024).toFixed(1)}KB (Quality: ${quality})\n`,
  )
  return {
    width,
    height,
    sizeKb: (outputBytes.length / 1024).toFixed(1),
  }
}

export async function run() {
  const assetsDir = path.resolve('src/assets')

  // 1. Planilha Mestra (Bônus 2): captura-de-tela-2026-10-22-212702-17d92.png
  // Keep quality high (85) for crisp text
  await optimizeImage({
    inputPath: path.join(assetsDir, 'captura-de-tela-2026-10-22-212702-17d92.png'),
    outputPath: path.join(assetsDir, 'bonus2-planilha-mestra.webp'),
    maxDimension: 1200,
    quality: 85,
  })

  // 2. Tabela de Macros (Bônus 3): captura-de-tela-2026-10-22-212743-01306.png
  await optimizeImage({
    inputPath: path.join(assetsDir, 'captura-de-tela-2026-10-22-212743-01306.png'),
    outputPath: path.join(assetsDir, 'bonus3-tabela-macros.webp'),
    maxDimension: 1200,
    quality: 85,
  })

  // 3. Ocasiões Especiais (Bônus 4): imagemgerada1792508738349-46e0f.png
  // Heavy AI generated image reported slow
  await optimizeImage({
    inputPath: path.join(assetsDir, 'imagemgerada1792508738349-46e0f.png'),
    outputPath: path.join(assetsDir, 'bonus4-ocasioes-especiais.webp'),
    maxDimension: 1000,
    quality: 80,
  })

  // 4. Fichas de Montagem no Celular: 03-d8f89.png
  await optimizeImage({
    inputPath: path.join(assetsDir, '03-d8f89.png'),
    outputPath: path.join(assetsDir, 'fichas-montagem.webp'),
    maxDimension: 1000,
    quality: 85,
  })

  // 5. Fotos da Luiza (SecaoQuemEstaPorTras)
  await optimizeImage({
    inputPath: path.join(assetsDir, 'luiza-1-7d847.jpg'),
    outputPath: path.join(assetsDir, 'luiza-aula.webp'),
    maxDimension: 840,
    quality: 80,
  })

  await optimizeImage({
    inputPath: path.join(assetsDir, 'luiza-2-521f3.jpg'),
    outputPath: path.join(assetsDir, 'luiza-cafe.webp'),
    maxDimension: 840,
    quality: 80,
  })

  await optimizeImage({
    inputPath: path.join(assetsDir, 'luiza-3-a6c15.jpg'),
    outputPath: path.join(assetsDir, 'luiza-cozinha.webp'),
    maxDimension: 840,
    quality: 80,
  })
}
