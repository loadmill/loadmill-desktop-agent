import React from 'react';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';

import { LINK_TO_LOADMILL_AGENT_DOCS } from '../constants';

export const LinkToAgentDocs: React.FC<LinkToAgentDocsProps> = (): JSX.Element => (
  <Tooltip
    placement='bottom'
    title='Docs'
  >
    <Link
      href={ LINK_TO_LOADMILL_AGENT_DOCS }
      target='_blank'
    >
      <IconButton>
        <InfoOutlinedIcon
          color='primary'
          fontSize='large'
        />
      </IconButton>
    </Link>
  </Tooltip>
);

export type LinkToAgentDocsProps = {};
