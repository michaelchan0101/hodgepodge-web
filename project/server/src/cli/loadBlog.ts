import fs from 'fs'
import path from 'path'
// import showdown from 'showdown'

const FILE_PATH = path.join(__dirname, '../../', 'articles')
async function getFiles() {
  const categorys = fs.readdirSync(FILE_PATH)
  const files = []
  categorys.forEach(category => {
    const categoryPath = path.join(FILE_PATH, category)
    fs.readdirSync(categoryPath).forEach(filePath => {
      files.push({
        categoryName: category,
        path: path.join(categoryPath, filePath),
      })
    })
  })
  return { categorys, files }
}
async function handler() {
  const { categorys, files } = await getFiles()
  console.log(categorys, files)
}
handler()
