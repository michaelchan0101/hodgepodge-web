import './utils/modulesAlias'

import http from 'http'
import app from './app'
import umzug from './drivers/umzug'

const PORT = process.env.PORT || 3003

async function main() {
  await umzug.umzugUp()

  const apiServer = await app.createApiServer()
  app.nextClientApp.prepare().then(() => {
    const server = http.createServer(apiServer.callback())
    server.listen(PORT, () => {
      console.log(`> Ready on http://localhost:${PORT}`)
    })
  })
}

main()
