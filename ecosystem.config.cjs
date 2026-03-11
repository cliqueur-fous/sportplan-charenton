module.exports = {
  apps: [{
    name: 'sportplan',
    script: 'server.js',
    env: {
      NODE_ENV: 'production',
      PORT: 3500,
      SESSION_SECRET: 'change-me-in-production'
    }
  }]
};
