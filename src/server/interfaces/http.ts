import Koa from 'koa'

export interface Context extends Koa.Context {
  user?: any
  auth?: any
}

export type Next = Koa.Next
