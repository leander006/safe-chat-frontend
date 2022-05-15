import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import ContextProvider from './context/ContextProvider';

ReactDOM.render(
  <ContextProvider >
  {/* <ChakraProvider> */}
  <React.StrictMode>
    <App />
  </React.StrictMode>
  {/* </ChakraProvider> */}
  </ContextProvider>,
  document.getElementById('root')
);


