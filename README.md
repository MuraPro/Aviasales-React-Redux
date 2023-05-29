# Визуальная часть Todo App:

/_ eslint-disable _/

https://sensational-halva-df70ca.netlify.app/

1. npm run start
2. npm run format
3. npx lint-staged

App /////
/_ eslint-disable _/
import React, { Component } from 'react';
import Header from '../header';
import ErrorBoundry from '../error-boundry';
import RandomPlanet from '../random-planet';
import { PeoplePage } from '../pages';
import { PlanetPage } from '../pages';
import { StarshipPage } from '../pages';
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from '../hoc-helper';

import './app.css';
import StarshipDetails from '../sw-components/starship-details';

export default class App extends Component {
state = {
swapiService: new SwapiService(),
};

onServiceChange = () => {
this.setState(({ swapiService }) => {
const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

      return {
        swapiService: new Service(),
      };
    });

};

render() {
return (

<div className="stardb-app">
<ErrorBoundry>
<SwapiServiceProvider value={this.state.swapiService}>
<Router>
<Header onServiceChange={this.onServiceChange} />
<RandomPlanet />
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<h2>Welcome to StarDB</h2>} />
<Route path="people/:id?" element={<PeoplePage />} />
<Route path="planets" element={<PlanetPage />} />
<Route path="starships/" element={<StarshipPage />} />
<Route path="starships/:id" element={<StarshipDetails />} />
</Route>
</Routes>
</Router>
</SwapiServiceProvider>
</ErrorBoundry>
</div>
);
}
}

/_ eslint-disable _/
import React, { useState } from 'react';
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import RandomPlanet from '../random-planet';
import { PeoplePage } from '../pages';
import { PlanetPage } from '../pages';
import { StarshipPage } from '../pages';
import StarshipDetails from '../sw-components/starship-details';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Layout } from '../hoc-helper';
import SwapiService from '../../services/swapi-service';
import DummySwapiService from '../../services/dummy-swapi-service';
import { SwapiServiceProvider } from '../swapi-service-context/swapi-service-context';
import './app.css';

const App = () => {
const [swapiService, setSwapiService] = useState(new SwapiService());

const onServiceChange = () => {
setSwapiService(({ swapiService }) => {
const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;
console.log(Service);
return {
swapiService: new Service(),
};
});
};

return (

<div className="stardb-app">
<ErrorBoundry>
<SwapiServiceProvider value={swapiService}>
<Router>
<Header onServiceChange={onServiceChange} />
<RandomPlanet />
<Routes>
<Route path="/" element={<Layout />}>
<Route index element={<h2>Welcome to StarDB</h2>} />
<Route path="people/:id?" element={<PeoplePage />} />
<Route path="planets" element={<PlanetPage />} />
<Route path="starships/" element={<StarshipPage />} />
<Route path="starships/:id" element={<StarshipDetails />} />
</Route>
</Routes>
</Router>
</SwapiServiceProvider>
</ErrorBoundry>
</div>
);
};

export default App;

//! Enhaser for Redux
/_ eslint-disable _/
import { createStore, compose } from 'redux';
import reducer from './reducer';

const logMiddleware = (store, dispatch) => (action) => {
console.log(action.type, store.getState());
return dispatch(action);
};

const stringMiddleware = (dispatch) => (action) => {
if (typeof action === 'string') {
return dispatch({
type: action,
});
}
return dispatch(action);
};

const logEnhancer =
(createStore) =>
(...args) => {
const store = createStore(...args);
const originalDispatch = store.dispatch;

    store.dispatch = (action) => {
      console.log(action.type);
      return originalDispatch(action);
    };

    return store;

};

const stringEhancer =
(createStore) =>
(...args) => {
const store = createStore(...args);
const originalDispatch = store.dispatch;

    store.dispatch = (action) => {
      if (typeof action === 'string') {
        return originalDispatch({
          type: action,
        });
      }
      originalDispatch(action);
    };

    return store;

};

const store = createStore(reducer, compose(stringEhancer, logEnhancer));

store.dispatch('HELLO_WORLD');

export default store;
