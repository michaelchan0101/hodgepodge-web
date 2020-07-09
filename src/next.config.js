const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const withPWA = require('next-pwa')

const envBuf = fs.readFileSync(path.join(__dirname, '../.env'))
const credentials = dotenv.parse(envBuf)

module.exports = withPWA({
  env: {
    title: credentials.WEB_TITLE,
    desc: credentials.WEB_DESC,
    icp: credentials.WEB_ICP,
    icpTime: credentials.WEB_ICP_TIME,
    email: credentials.WEB_EMAIL,
    github: credentials.GITHUB,
    apiHost: credentials.API_HOST,
  },
  poweredByHeader: false,
  devIndicators: {
    autoPrerender: false,
  },
})
