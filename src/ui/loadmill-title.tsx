import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
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
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
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
