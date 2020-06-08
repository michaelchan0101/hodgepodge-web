import './utils/modulesAlias'

import http from 'http'
import next from 'next'
import path from 'path'
import { createApiServer } from './app'
import umzug from 'drivers/umzug'

const PORT = process.env.NODE_HODGEPODGE_PORT || 3000

const nextApp = next({
  dev: process.env.NODE_HODGEPODGE_ENV !== 'production',
  dir: path.join(__dirname, '../../client'),
})

async function main() {
  await umzug.umzugUp()

  const app = await createApiServer(nextApp)
  nextApp.prepare().then(() => {
    const server = http.createServer(app.callback())
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
}

main()
