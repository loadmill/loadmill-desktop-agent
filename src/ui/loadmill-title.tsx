import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import React from 'react';

import loadmillLogo from './loadmill_logo.png';
import { PulseCircle } from './pulse-circle';

export const LoadmillTitle = ({
  isConnected,
}: {
  isConnected: boolean;
}): JSX.Element => {
  return (
    <div
      style={ {
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'space-between',
      } }
    >
      <Avatar
        src={ loadmillLogo }
      />
      <Typography
        variant='h4'
      >
        Loadmill Agent
      </Typography>
      <PulseCircle
        color={ isConnected ? 'green' : 'red' }
      />
    </div>
  );
};
