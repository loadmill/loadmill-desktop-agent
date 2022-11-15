import React, { useEffect, useState } from 'react';
import { APP_VERSION } from '../constants';
import { isFromPreload } from '../inter-process-utils';

export const Version = (): JSX.Element => {
  const [version, setVersion] = useState<string>('placeholder');

  useEffect(() => {
    window.api.getVersion();
  });

  window.addEventListener('message', (event) => {
    if (isAppVersionEvent(event)) {
      setVersion(event.data.split(':')[1]);
    }
  });

  const isAppVersionEvent = (event: MessageEvent<unknown>) =>
    isFromPreload(event) &&
    typeof event.data === 'string' &&
    event.data.startsWith(APP_VERSION);

  return (
    <div>
      {`Version: ${version}`}
    </div>
  );
};
