import categoryService from 'services/category.service'
import fixtures from 'tests/fixtures'

describe('CategoryService', () => {
  beforeAll(async () => {
    await fixtures.reloadFixtures()
  })
  test('should batch create category successfully', async () => {
    const names = ['category-1', 'category-2', 'category-3', 'category-4']
    const categoryObj = await categoryService.batchCreateCategory(names)
    expect(Object.keys(categoryObj)).toHaveLength(names.length)
    names.forEach(name => {
      expect(categoryObj[name].name).toEqual(name)
    })
  })
})
