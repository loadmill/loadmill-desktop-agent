export const
  ACTIVATE = 'activate',
  API = 'api',
  APP_VERSION = 'app_version',
  GET_APP_VERSION = 'getAppVersion',
  READY = 'ready',
  RESTART_APP = 'restart_app',
  START_AGENT = 'startAgent',
  STOP_AGENT = 'stopAgent',
  UPDATE_AVAILABLE = 'update_available',
  UPDATE_DOWNLOADED = 'update_downloaded',
  WINDOW_ALL_CLOSED = 'window-all-closed';

export const PLATFORM: { [platform: string]: NodeJS.Platform; } = {
  DARWIN: 'darwin',
};

export const LINK_TO_LOADMILL_SECURITY = 'https://app.loadmill.com/app/user/settings/security';
