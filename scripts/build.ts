import fs from 'node:fs'
import { fileURLToPath } from 'url'
import path from 'node:path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename);
const packagePath = path.resolve(__dirname, '../package.json')
const mdPath = path.resolve(__dirname, '../README.md')
const distPath = path.resolve(__dirname, '../dist')
const distJsonPath = path.resolve(__dirname, '../dist/package.json')
const distMdPath = path.resolve(__dirname, '../dist/README.md')
const json = JSON.parse(fs.readFileSync(packagePath, 'utf-8'))
json.bin.chh='esm/index.js'
json.main='esm/index.js'
// 删除对象中的属性
delete json.scripts
if (fs.existsSync(distPath)) {
    console.log('文件存在', distPath);
    fs.writeFileSync(distJsonPath, JSON.stringify(json, null, 4))
    // 读取README.md文档内容并且将它拷贝到dist打包目录下
    fs.copyFileSync(mdPath, distMdPath)
}
