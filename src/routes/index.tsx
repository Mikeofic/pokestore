import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageFogo from '../pages/PageFogo';
import OrdersFogo from '../pages/OrdersFogo';

const RedirectRoute: React.FC = () => <Redirect to="/" />;

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route
        path="/eletrico"
        exact
        render={props => <PageFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/eletrico/orders"
        exact
        render={props => <OrdersFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/grama"
        exact
        render={props => <PageFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/grama/orders"
        exact
        render={props => <OrdersFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/agua"
        exact
        render={props => <PageFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/agua/orders"
        exact
        render={props => <OrdersFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/fogo"
        exact
        render={props => <PageFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/fogo/orders"
        exact
        render={props => <OrdersFogo {...props} typeName="fogo" />}
      />
      <Route
        path="/"
        exact
        render={props => <PageFogo {...props} typeName="fogo" />}
      />
      <Route path="/" component={RedirectRoute} />
    </Switch>
  );
};

export default Routes;
