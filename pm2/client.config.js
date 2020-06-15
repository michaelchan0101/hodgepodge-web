module.exports = {
  apps: [
    {
      name: 'hodgepodge_client',
      instances: '1',
      exec_mode: 'cluster',
      script: './server/dist/client.js',
      merge_logs: true,
      restart_delay: 5000,
      wait_ready: true,
      env: {
        watch: false,
        autorestart: true,
      },
      env_production: {
        NODE_HODGEPODGE_ENV: 'production',
        NODE_HODGEPODGE_PORT: '3001',
      },
      env_staging: {
        NODE_HODGEPODGE_ENV: 'staging',
        NODE_HODGEPODGE_PORT: '3001',
      },
      env_development: {
        NODE_HODGEPODGE_ENV: 'development',
        NODE_HODGEPODGE_PORT: '3001',
      },
    },
  ],
}
