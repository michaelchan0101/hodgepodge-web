# Hodgepodge
基于 `Next.js` 开发的博客系统用户端
依赖技术
- Node.js >= 12
- Typescript
- Yarn
- Next.js
- [API Service] (https://github.com/michaelchan0101/hodgepodge-backend)

## 项目结构

目录结构

```
.
|-- src
|   |-- components
|   |-- pages
|   |-- services
|   |-- styles
|   |-- types
|   |-- static
|   |-- next-env.d.ts
|   |-- package.json
|   |-- tsconfig.json
|   |-- server.js
```

## 项目 Scripts

```bash
# 在本地开发环境启动服务
yarn dev

# 构建 
yarn build

# 运行 eslint 语法检查
yarn lint

# 运行 eslint 语法检查并修复
yarn lint:fix
```


## 项目启动

First, run the development server:

```bash
yarn

yarn docker:up

cp .env.example .env

yarn dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `client/pages/index.js`. The page auto-updates as you edit the file.
