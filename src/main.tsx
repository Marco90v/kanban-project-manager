import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router';
import App from '@/App'
// import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from "@/components/ui/provider"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <BrowserRouter>
      {/* <ChakraProvider theme={theme}> */}
      <Provider>
        <App />
      </Provider>
      {/* </ChakraProvider> */}
    </BrowserRouter>
  </StrictMode>,
)
