import updater from 'update-electron-app';

updater({
  logger: require('electron-log'),
  repo: 'loadmill/loadmill-desktop-agent',
  updateInterval: '5 minutes',
});
