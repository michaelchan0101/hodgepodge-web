'use strict'
import { DataTypes, Model, Sequelize } from 'sequelize'
import { Article } from './Article'

const scheme = {
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}

export class Category extends Model {
  public id!: number
  public name!: string
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

export function initCategory(sequelize: Sequelize) {
  Category.init(scheme, { sequelize, tableName: 'categories' })
}

export function associateCategory(sequelize: Sequelize) {
  Category.hasMany(Article, { foreignKey: 'categoryId' })
}
