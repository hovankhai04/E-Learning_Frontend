import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/global.css'
import AppRoutes from './app/routes'
import { BrowserRouter } from 'react-router-dom';
import AppProviders from './app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  </StrictMode>,
)
