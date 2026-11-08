// Uploads the three optimized hero/about/banner videos to Cloudinary.
//   1. cp .env.example .env   and put your API key + secret in it
//   2. npm install
//   3. npm run upload:videos
import { v2 as cloudinary } from 'cloudinary'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { existsSync } from 'node:fs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

if (!process.env.CLOUDINARY_URL) {
  console.error('Missing CLOUDINARY_URL. Copy .env.example to .env and fill in your API key and secret.')
  process.exit(1)
}

cloudinary.config({ secure: true })
const cloud = cloudinary.config().cloud_name
console.log(`Uploading to Cloudinary cloud "${cloud}"...`)

const videos = ['intro', 'portrait', 'banner']
let failed = false

for (const name of videos) {
  const file = path.join(root, 'public', 'videos', `${name}.mp4`)
  if (!existsSync(file)) {
    console.error(`✗ ${name}: ${file} not found`)
    failed = true
    continue
  }
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'video',
      public_id: `ayush-portfolio/${name}`,
      overwrite: true,
      invalidate: true,
    })
    console.log(`✓ ${name}: ${result.secure_url} (${Math.round(result.bytes / 1024)} KB)`)
  } catch (error) {
    failed = true
    console.error(`✗ ${name}:`, error?.message || error)
  }
}

if (cloud !== 'dw8y3wzsg') {
  console.warn(`\nNote: src/siteData.js uses cloud name "dw8y3wzsg" but you uploaded to "${cloud}". Update CLOUD_NAME there.`)
}
process.exit(failed ? 1 : 0)
