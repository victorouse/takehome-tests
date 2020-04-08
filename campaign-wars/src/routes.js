import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CharacterSearchContainer from './containers/CharacterSearchContainer';
import CharacterDetailContainer from './containers/CharacterDetailContainer';
import NotFound from './common/NotFound';

const Routes = () => (
  <Router basename="/campaign-wars">
    <div>
      <Switch>
        <Route exact path="/" component={CharacterSearchContainer} />
        <Route path="/character/:id" component={CharacterDetailContainer} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);

export default Routes;
