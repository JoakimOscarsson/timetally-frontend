import React from 'react';
import { createRoot } from 'react-dom/client';
import WorkHoursVisualization from './components/WorkHoursVisualization';
import './styles/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <WorkHoursVisualization />
  </React.StrictMode>
);
