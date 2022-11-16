export const
  ACTIVATE = 'activate',
  API = 'api',
  APP_VERSION = 'app_version',
  DATA = 'data',
  GET_APP_VERSION = 'getAppVersion',
  MESSAGE = 'message',
  READY = 'ready',
  RESTART_APP = 'restart_app',
  START_AGENT = 'startAgent',
  STDERR = 'stderr',
  STDOUT = 'stdout',
  STOP_AGENT = 'stopAgent',
  UPDATE_AVAILABLE = 'update_available',
  UPDATE_DOWNLOADED = 'update_downloaded',
  WINDOW_ALL_CLOSED = 'window-all-closed';

export const PLATFORM: { [platform: string]: NodeJS.Platform; } = {
  DARWIN: 'darwin',
};

export const LINK_TO_LOADMILL_SECURITY = 'https://app.loadmill.com/app/user/settings/security';
export const LOADMILL_AGENT = 'loadmill-agent';
