import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './AppRoutes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppContextProvider } from './contexts/AppContext'
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <AppRoutes />
          <Toaster visibleToasts={1} position="top-right" richColors />
        </AppContextProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
