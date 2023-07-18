import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

// third-party
import { Provider as ReduxProvider } from 'react-redux';

// scroll bar
import 'simplebar/src/simplebar.css';

// apex-chart
import 'assets/third-party/apex-chart.css';
import 'assets/third-party/react-table.css';

// load mock apis
import 'api';

// project import
import App from './App';
import { store, persister } from 'store';
import { ConfigProvider } from 'contexts/ConfigContext';
import reportWebVitals from './reportWebVitals';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PersistGate } from 'redux-persist/integration/react';

// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const container = document.getElementById('root');
const root = createRoot(container);

// const root = ReactDOM.createRoot(document.getElementById('root'));

// ==============================|| MAIN - REACT DOM RENDER  ||============================== //
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // suspense: true,
      refetchOnWindowFocus: false,
      refetchOnmount: false,
      refetchOnReconnect: false,
      retry: 1,
      staleTime: 60 * 60 * 1000
    }
  }
});

root.render(
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persister}>
      <ConfigProvider>
        <BrowserRouter>
          <QueryClientProvider client={queryClient}>
            <App />
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </BrowserRouter>
      </ConfigProvider>
    </PersistGate>
  </ReduxProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
