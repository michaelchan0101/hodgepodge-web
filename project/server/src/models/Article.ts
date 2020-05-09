'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'
import { Category } from './Category'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
  },
  categoryId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}

export class Article extends Model {
  public id!: number
  public title!: string
  public content!: string
  public categoryId!: number
  public readonly Category!: Category | null
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initArticle(sequelize: Sequelize) {
  Article.init(scheme, { sequelize, tableName: 'articles' })
}

export function associateArticle(sequelize: Sequelize) {
  Article.belongsTo(Category, { targetKey: 'id' })
}
