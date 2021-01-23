import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './routes';
import GlobalStyles from './styles/global';
import AppProvider from './AppProvider';

const App: React.FC = () => (
  <BrowserRouter>
    <GlobalStyles />
    <AppProvider>
      <Routes />
    </AppProvider>
  </BrowserRouter>
);
export default App;
