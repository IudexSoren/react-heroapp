import PropTypes from 'prop-types';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {

  // Guardar la última ruta.  La ruta queda almacena aún cuando no está autenticado, en este caso el usuario al autenticarse
  // será redirigido a la página que deseaba
  localStorage.setItem('lastPath', `${ rest.location.pathname }${ rest.location.search }`);

  return (
    <Route
      { ...rest }
      component={ (props) =>
        (isAuthenticated) ? (<Component {...props} />) : (<Redirect to='/login' />)
      }
    />
  )
}

PrivateRoute.propType = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired
}

export default PrivateRoute
