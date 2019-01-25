import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import App from './components/App';

import './index.css';

//import registerServiceWorker from './registerServiceWorker';

// const render = () => {
//   const Application = () => (
//     <Provider store={store} >
//       <App/>
//     </Provider>
//   );
//
//   ReactDOM.render(
//     <Application />,
//     document.getElementById('root')
//   );
// };

ReactDOM.render(
  <Provider store={store} >
    <App/>
  </Provider>,
  document.getElementById('root')
);

// render();

// store.subscribe(render);
//registerServiceWorker();
