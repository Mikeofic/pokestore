import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Front from '../pages/Front';
import Orders from '../pages/Orders';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/eletrico"
        exact
        render={props => <Front {...props} typeName="eletrico" />}
      />
      <Route
        path="/eletrico/orders"
        exact
        render={props => <Orders {...props} typeName="eletrico" />}
      />
      <Route path="/eletrico/" component={() => <Redirect to="/eletrico" />} />

      <Route
        path="/grama"
        exact
        render={props => <Front {...props} typeName="grama" />}
      />
      <Route
        path="/grama/orders"
        exact
        render={props => <Orders {...props} typeName="grama" />}
      />
      <Route path="/grama/" component={() => <Redirect to="/grama" />} />

      <Route
        path="/agua"
        exact
        render={props => <Front {...props} typeName="agua" />}
      />
      <Route
        path="/agua/orders"
        exact
        render={props => <Orders {...props} typeName="agua" />}
      />
      <Route path="/agua/" component={() => <Redirect to="/agua" />} />

      <Route
        path="/fogo"
        exact
        render={props => <Front {...props} typeName="fogo" />}
      />
      <Route
        path="/fogo/orders"
        exact
        render={props => <Orders {...props} typeName="fogo" />}
      />
      <Route
        path="/"
        exact
        render={props => <Front {...props} typeName="fogo" />}
      />
      <Route path="/" component={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
