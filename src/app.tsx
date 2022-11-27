import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Main } from './ui/main';

function render() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Main/>);
}

render();
