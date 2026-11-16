import { execFileSync } from 'node:child_process'
import process from 'node:process'

const status = execFileSync('git', ['status', '--porcelain', '--', 'config'], { encoding: 'utf8' })

if (status.trim().length > 0) {
    console.error('config/*.d.ts do not match the sources. Run `npm run gen:types` and commit:')
    console.error(status)
    process.exit(1)
}

console.log('config/*.d.ts match the sources')
