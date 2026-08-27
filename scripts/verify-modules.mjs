import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { spawnSync } from 'node:child_process'

const root = resolve(new URL('..', import.meta.url).pathname)
const moduleIds = ['siso-chat-assistant', 'siso-booking']

function fail(message) {
  console.error(`verify:modules: ${message}`)
  process.exitCode = 1
}

for (const moduleId of moduleIds) {
  const moduleRoot = resolve(root, 'modules', moduleId)
  const packagePath = resolve(moduleRoot, 'package.json')
  const manifestPath = resolve(moduleRoot, 'module-manifest.json')

  if (!existsSync(packagePath) || !existsSync(manifestPath)) {
    fail(`${moduleId} is missing its package or module manifest`)
    continue
  }

  const packageJson = JSON.parse(readFileSync(packagePath, 'utf8'))
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf8'))
  const requiredFiles = ['README.md', 'INSTALL.md', 'upstream-manifest.json']

  for (const filename of requiredFiles) {
    if (!existsSync(resolve(moduleRoot, filename))) fail(`${moduleId} is missing ${filename}`)
  }

  if (!packageJson.files?.includes('INSTALL.md')) {
    fail(`${moduleId} package boundary does not include INSTALL.md`)
  }
  if (manifest.moduleId !== (moduleId === 'siso-chat-assistant' ? 'chat-assistant' : 'booking')) {
    fail(`${moduleId} manifest moduleId is inconsistent`)
  }

  const test = spawnSync('npm', ['--prefix', moduleRoot, 'test'], { stdio: 'inherit' })
  if (test.status !== 0) {
    fail(`${moduleId} contract test failed`)
  }
}

if (!process.exitCode) console.log('verify:modules: PASS')
