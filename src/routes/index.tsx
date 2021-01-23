import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import PageFogo from '../pages/PageFogo';

const RedirectRoute: React.FC = () => <Redirect to="/" />;

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/eletrico" exact component={PageFogo} />
      <Route path="/grama" exact component={PageFogo} />
      <Route path="/agua" exact component={PageFogo} />
      <Route path="/fogo" exact component={PageFogo} />
      <Route path="/" exact component={PageFogo} />
      <Route path="/" component={RedirectRoute} />
    </Switch>
  );
};

export default Routes;
