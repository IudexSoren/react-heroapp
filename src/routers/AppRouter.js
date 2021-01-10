import { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';
import LoginScreen from '../components/login/LoginScreen';
import DashboardRoutes from './DashboardRoutes';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

const AppRouter = () => {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <Router>
        <div>
          <Switch>
            <PublicRoute
              path="/login"
              exact
              isAuthenticated={ user.logged }
              component={ LoginScreen }
            />
            <PrivateRoute
              path="/"
              isAuthenticated={ user.logged }
              component={ DashboardRoutes }
            />
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default AppRouter
