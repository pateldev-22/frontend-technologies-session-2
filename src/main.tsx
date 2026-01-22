import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query';

const queryclient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <QueryClientProvider client={queryclient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
