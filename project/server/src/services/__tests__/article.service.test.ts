import articleService from 'services/article.service'
import fixtures from 'tests/fixtures'
import config from '@/config'
import path from 'path'

describe('articleService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })
  test('should batch import articles successfully', async () => {
    const exampleData = [
      {
        categoryId: 1,
        title: 'V8 垃圾回收机制',
        path: path.join(config.article.basePath, 'javascript', 'V8 垃圾回收机制.md'),
      },
    ]
    const articles = await articleService.batchImportArtcles(exampleData)
    expect(articles).toHaveLength(exampleData.length)
    expect(articles[0].title).toEqual(exampleData[0].title)
  })
})
