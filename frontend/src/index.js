import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import AppContainer from './components/AppContainer';

import './index.css';

//import registerServiceWorker from './registerServiceWorker';

const render = () => {
  const Application = () => (
    <Provider store={store} >
      <AppContainer/>
    </Provider>
  );

  ReactDOM.render(
    <Application />,
    document.getElementById('root')
  );
};

render();

store.subscribe(render);
//registerServiceWorker();
