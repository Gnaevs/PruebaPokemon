import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from "react-router-dom"
import { queryClient } from "./pokeApi/queryClient.ts"


import App from './App.tsx'
import { StrictMode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/List-And-Grid-View-Pokemon">
    <QueryClientProvider client={queryClient}>
      <App />
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
)
