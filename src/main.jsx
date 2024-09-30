import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import invoiceReducer from './features/invoices/invoiceSlice';
import App from './App.jsx'
import GlobalStyles from './GlobalStyles';


const store = configureStore({
  reducer: {
    invoice: invoiceReducer,
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles />
     <App />
   </Provider>
  </StrictMode>,
)
