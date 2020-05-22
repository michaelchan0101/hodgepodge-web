import articleService from 'services/article.service'
import fixtures from 'tests/fixtures'
import config from '@/config'
import path from 'path'

describe('articleService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })
  describe('listArtcles', () => {
    test('should successfully', async () => {
      const results = await articleService.listArtcles()
      expect(results.articles).toHaveLength(6)
      expect(results.articles[0].id).toEqual(6)
      expect(results.articles[0].category.id).toEqual(3)
      expect(results.limit).toEqual(20)
      expect(results.offset).toEqual(0)
    })

    test('should successfully/ limit = 2, offset = 2', async () => {
      const results = await articleService.listArtcles({}, 2, 2)
      expect(results.articles).toHaveLength(2)
      expect(results.articles[0].id).toEqual(4)
      expect(results.articles[0].category.id).toEqual(2)
      expect(results.limit).toEqual(2)
      expect(results.offset).toEqual(2)
    })
  })

  test('should get one artcle successfully', async () => {
    const article = await articleService.getArtcle(1)
    expect(article.id).toEqual(1)
    expect(article.category.id).toEqual(1)
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
    expect(articles[0].createdAt).toEqual(articles[0].updatedAt)
  })
})
