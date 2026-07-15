// PM2 Ecosystem Configuration for Production VPS Deployment
module.exports = {
  apps: [
    {
      name: "pin-media-downloader",
      script: "dist/server.cjs",
      instances: "max",       // Spawn a cluster of node worker threads for peak traffic
      exec_mode: "cluster",   // Cluster mode for zero-downtime reloads
      watch: false,           // Do not watch in production to avoid random crashes
      env_production: {
        NODE_ENV: "production",
        PORT: 3000
      },
      max_memory_restart: "400M", // Restart process if leak climbs over 400MB
      error_file: "logs/pm2-error.log",
      out_file: "logs/pm2-out.log",
      merge_logs: true,
      log_date_format: "YYYY-MM-DD HH:mm:ss Z"
    }
  ]
};
