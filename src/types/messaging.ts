import {
  IS_AGENT_CONNECTED,
  START_AGENT,
  STDERR,
  STDOUT,
  STOP_AGENT
} from '../constants';

export type InterProcessMessage = {
  data?: string;
  type: InterProcessMessageTypes;
};

export type InterProcessMessageTypes =
  typeof IS_AGENT_CONNECTED |
  typeof START_AGENT |
  typeof STDERR |
  typeof STDOUT |
  typeof STOP_AGENT;
