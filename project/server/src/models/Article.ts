'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
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
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initArticle(sequelize: Sequelize) {
  Article.init(scheme, { sequelize, tableName: 'articles' })
}
