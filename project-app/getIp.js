// getIp.js

const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return null;
}

const ipAddress = getLocalIp();

if (ipAddress) {
  const envPath = path.resolve(__dirname, '.env');
  fs.writeFileSync(envPath, `EXPO_PUBLIC_API_URL=${ipAddress}\n`, { flag: 'w' });
  console.log(`EXPO_PUBLIC_API_URL=${ipAddress}`);
} else {
  console.error('Could not determine local IP address.');
}
