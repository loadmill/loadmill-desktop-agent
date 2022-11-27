import updater from 'update-electron-app';

import {
  overrideOnUpdateDownloadedListener,
  overrideOnUpdateNotAvailableListener
} from './updates';

updater({
  logger: require('electron-log'),
  notifyUser: false,
  repo: 'loadmill/loadmill-desktop-agent',
  updateInterval: '5 minutes',
});

overrideOnUpdateDownloadedListener();
overrideOnUpdateNotAvailableListener();
