import { Category } from '@/models'
import { CategoryObjResponse } from 'interfaces/category'
import { Op } from 'sequelize'

function getCategoryObjResponse(
  categoryObj: CategoryObjResponse,
  categorys: Array<Category>
): CategoryObjResponse {
  categorys.forEach(category => {
    categoryObj[category.name] = {
      id: category.id,
      name: category.name,
    }
  })
  return categoryObj
}
export default {
  async batchCreateCategory(names: string[]): Promise<CategoryObjResponse> {
    const categorys: Array<Category> = await Category.findAll({
      where: { name: { [Op.in]: names } },
    })
    const categoryObj: CategoryObjResponse = getCategoryObjResponse({}, categorys)

    const nCategorys = await Category.bulkCreate(
      names.filter(name => !categoryObj[name]).map(name => ({ name }))
    )
    return getCategoryObjResponse(categoryObj, nCategorys)
  },
}
