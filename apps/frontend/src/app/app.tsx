import styles from './app.module.scss';
import Details from './pages/details/details';
import Search from './pages/search/search';

import { Route, Switch, Redirect } from 'react-router-dom';

export function App() {
  return (
    <Switch>
      <Route path="/items/:id" component={Details} />
      <Route path="/items" component={Search} exact />
      <Route path="/">
        <Redirect to="/items" />
      </Route>
    </Switch>
  );
}

export default App;
