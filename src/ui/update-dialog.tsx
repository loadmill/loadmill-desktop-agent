import React, { useState } from 'react';
import { UPDATE_AVAILABLE, UPDATE_DOWNLOADED } from '../constants';
import { isFromPreload } from '../inter-process-utils';

const hiddenStyle = {
  display: 'none'
};
const shownStyle = {};

export const UpdateDialog = (): JSX.Element => {
  const [msg, setMsg] = useState<string>('');
  const [restartStyle, setRestartStyle] = useState<React.CSSProperties>(hiddenStyle);
  const [updateDialogStyle, setUpdateDialogStyle] = useState<React.CSSProperties>(hiddenStyle);

  window.addEventListener('message', (event) => {
    if (isFromPreload(event) && event.data === UPDATE_AVAILABLE) {
      setMsg('A new update is available. Downloading now...');
      setUpdateDialogStyle(shownStyle);
      setRestartStyle(shownStyle);
    } else if (isFromPreload(event) && event.data === UPDATE_DOWNLOADED) {
      setMsg('Update Downloaded. It will be installed on restart. Restart now?');
      setUpdateDialogStyle(shownStyle);
      setRestartStyle(shownStyle);
    }
  });

  const onCloseUpdateDialog = () => {
    setUpdateDialogStyle(hiddenStyle);
  };

  const onRestartClicked = () => {
    setRestartStyle(hiddenStyle);
    window.api.restartApp();
  };

  return (
    <div
      style={ updateDialogStyle }
    >
      <p id="message">{msg}</p>
      <button
        onClick={ onCloseUpdateDialog }
      >
        Close
      </button>
      <button
        onClick={ onRestartClicked }
        style={ restartStyle }
      >
        Restart
      </button>
    </div>
  );
};
