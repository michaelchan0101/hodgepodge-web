module.exports = {
  apps: [
    {
      name: 'hodgepodge',
      instances: '1',
      exec_mode: 'cluster',
      script: './service/dist/index.js',
      merge_logs: true,
      restart_delay: 5000,
      wait_ready: true,
      env: {
        watch: false,
        autorestart: true,
      },
      env_production: {
        NODE_ENV: 'production',
        NODE_PORT: '8080',
      },
      env_staging: {
        NODE_ENV: 'staging',
        NODE_PORT: '8080',
      },
      env_development: {
        NODE_ENV: 'development',
        NODE_PORT: '8080',
      },
    },
  ],
}
