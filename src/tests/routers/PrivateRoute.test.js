import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import DashboardRoutes from '../../routers/DashboardRoutes';
import PrivateRoute from '../../routers/PrivateRoute';

describe('Pruebas de PrivateRoute', () => {

  const props = {
    location: {
      pathname: '/marvel',
      search: ''
    }
  }

  Storage.prototype.setItem = jest.fn();

  test('Debe renderizarse el componente si el usuario está autenticado y guardar la información en el LocalStorage', () => {
    const wrapper = mount(
      // Router hecho para probar rutas
      <MemoryRouter>
        <PrivateRoute
          component={ () => <span>Ruta privada</span> }
          isAuthenticated={ true }
          { ...props }
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBeTruthy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', `${ props.location.pathname }${ props.location.search }`);
  });

  test('Debe bloquear el componente si el usuario no está autenticado', () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          component={ () => <span>Ruta privada</span> }
          isAuthenticated={ false }
          { ...props }
        />
      </MemoryRouter>
    );

    expect(wrapper.find('span').exists()).toBeFalsy();
    expect(localStorage.setItem).toHaveBeenCalledWith('lastPath', `${ props.location.pathname }${ props.location.search }`);
  });


});
