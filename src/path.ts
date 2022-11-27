import { app } from 'electron';

import log from './log';

log.info('app.getAppPath()', app.getAppPath());

log.info('__dirname', __dirname);
