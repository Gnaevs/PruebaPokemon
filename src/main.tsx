import { createRoot } from 'react-dom/client'
import './index.css'
import { StyledEngineProvider } from '@mui/material/styles';
import { BrowserRouter } from "react-router-dom"

import App from './App.tsx'
import { StrictMode } from 'react';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
