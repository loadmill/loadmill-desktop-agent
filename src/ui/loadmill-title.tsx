import React from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import loadmillLogo from './loadmill_logo.png';

export const LoadmillTitle = (): JSX.Element => {
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
      <div
        className='red-pulse'
        style={ { marginLeft: 16 } }
      >
        <p></p>
      </div>
      <div
        className='green-pulse'
        style={ { marginLeft: 16 } }
      >
        <p></p>
      </div>
    </div>
  );
};
