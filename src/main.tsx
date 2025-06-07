import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from '@/App'
import { Provider } from "@/components/ui/provider"
import { ChakraProvider } from '@chakra-ui/react';
import system  from './theme';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
      <ChakraProvider value={system}>
        <Provider>
          <App />
        </Provider>
      </ChakraProvider>
    </BrowserRouter>
  </StrictMode>,
)
