import React, { SyntheticEvent } from 'react';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import IconButton from '@mui/material/IconButton';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import Tooltip from '@mui/material/Tooltip';

export const StopIconButton = ({
  disabled,
  onStopClicked,
}:{
  disabled?: boolean;
  onStopClicked: (e: SyntheticEvent) => void;
 }): JSX.Element => {
  return (
    <>
      <Tooltip
        placement='bottom'
        title='Stop Agent'
      >
        <IconButton
          disabled={ disabled }
          onClick={ onStopClicked }
        >
          <StopCircleOutlinedIcon
            color={ disabled ? 'disabled' : 'primary' }
            fontSize='large'
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const ScrollToBottomIconButton = ({ onScrollToBottomClicked }:{ onScrollToBottomClicked: (e: SyntheticEvent) => void }): JSX.Element => {
  return (
    <>
      <Tooltip
        placement='bottom'
        title='Scroll to bottom'
      >
        <IconButton onClick={ onScrollToBottomClicked }>
          <ArrowCircleDownIcon
            color='primary'
            fontSize='large'
          />
        </IconButton>
      </Tooltip>
    </>
  );
};

export const GoToConsoleIconButton = ({ onGoToConsoleClicked }:{ onGoToConsoleClicked: (e: SyntheticEvent) => void }): JSX.Element => {
  return (
    <>
      <Tooltip
        placement='bottom'
        title='Console'
      >
        <IconButton
          onClick={ onGoToConsoleClicked }
        >
          <ArrowCircleRightOutlinedIcon
            color='primary'
            fontSize='large'
          />

        </IconButton>
      </Tooltip>
    </>
  );
};

export const GoBackIconButton = ({ onGoBackClicked }:{ onGoBackClicked: (e: SyntheticEvent) => void }): JSX.Element => {
  return (
    <>
      <Tooltip
        placement='bottom'
        title='Back'
      >
        <IconButton
          onClick={ onGoBackClicked }
        >
          <ArrowCircleLeftOutlinedIcon
            color='primary'
            fontSize='large'
          />
        </IconButton>
      </Tooltip>
    </>
  );
};
