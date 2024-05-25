import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Adjust the path to your App component

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
