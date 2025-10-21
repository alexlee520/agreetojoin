import React from 'react';
import ReactDOM from 'react-dom/client';
import Form from './pages/Form';

console.log('Store Partner Management System - Client initialized');

const root = document.getElementById('root');
if (root) {
  ReactDOM.createRoot(root).render(
    React.createElement(Form)
  );
}
