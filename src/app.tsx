import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { NewHome } from './ui/new-home';

function render() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<NewHome/>);
}

render();
