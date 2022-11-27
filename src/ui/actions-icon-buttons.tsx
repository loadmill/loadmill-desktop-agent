import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import ReadMoreOutlinedIcon from '@mui/icons-material/ReadMoreOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import React, { SyntheticEvent } from 'react';

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
        <span>
          <IconButton
            disabled={ disabled }
            onClick={ onStopClicked }
          >
            <StopCircleOutlinedIcon
              color={ disabled ? 'disabled' : 'primary' }
              fontSize='large'
            />
          </IconButton>
        </span>
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
        <span>
          <IconButton onClick={ onScrollToBottomClicked }>
            <ArrowCircleDownIcon
              color='primary'
              fontSize='large'
            />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
};

export const GoToConsoleIconButton = ({
  disabled,
  onGoToConsoleClicked
}:{
  disabled: boolean,
  onGoToConsoleClicked: (e: SyntheticEvent) => void
}): JSX.Element => {
  return (
    <>
      <Tooltip
        placement='bottom'
        title='See Logs'
      >
        <span>
          <IconButton
            disabled={ disabled }
            onClick={ onGoToConsoleClicked }
          >
            <ReadMoreOutlinedIcon
              color={ disabled ? 'disabled' : 'primary' }
              fontSize='large'
            />

          </IconButton>
        </span>
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
        <span>
          <IconButton
            onClick={ onGoBackClicked }
          >
            <ArrowCircleLeftOutlinedIcon
              color='primary'
              fontSize='large'
            />
          </IconButton>
        </span>
      </Tooltip>
    </>
  );
};
