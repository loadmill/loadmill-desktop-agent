import * as React from 'react';
import { createRoot } from 'react-dom/client';

import { Home } from './ui/home';

function render() {
  const container = document.getElementById('root');
  const root = createRoot(container);
  root.render(<Home/>);
}

render();
