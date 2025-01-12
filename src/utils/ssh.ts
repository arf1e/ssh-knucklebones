import set from 'lodash/set';
import { type ServerChannel } from 'ssh2';

export const setStreamConfig = (
  stream: ServerChannel,
  options: Record<string, unknown>
) => {
  for (const [key, value] of Object.entries(options)) {
    set(stream, key, value);
  }
};
