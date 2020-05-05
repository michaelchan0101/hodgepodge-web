import sequelize from '../drivers/sequelize'
import { Article, initArticle } from './Article'

// init model
;[initArticle].forEach(initFunc => initFunc(sequelize))

export { sequelize, Article }
