import './utils/modulesAlias'

import http from 'http'
import { nextClientApp, createApiServer } from './app'
import umzug from './drivers/umzug'

const PORT = process.env.PORT || 3000

async function main() {
  await umzug.umzugUp()

  const app = await createApiServer()
  nextClientApp.prepare().then(() => {
    const server = http.createServer(app.callback())
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
}

main()
