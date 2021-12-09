import React from 'react';
import ReactDOM from 'react-dom';
//import './index.css';
import App from './router/Routers';
import reportWebVitals from './reportWebVitals';

import { store } from './store/ConfigureStore'
import { Provider } from 'react-redux'

import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { QueryClient, QueryClientProvider } from 'react-query';



let persistor = persistStore(store)


const queryClient = new QueryClient();

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={<>Loading ...</>} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider >
    </React.StrictMode>
  </QueryClientProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();