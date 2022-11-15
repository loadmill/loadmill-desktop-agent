import React from 'react';
import { Token } from './token';
import { UpdateDialog } from './update-dialog';
import { Version } from './version';

export const Home = (): JSX.Element => {
  return (
    <>
      <Token />
      <UpdateDialog />
      <Version />
    </>
  );
};
