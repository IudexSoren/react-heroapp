import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import DashboardRoutes from '../../routers/DashboardRoutes';

describe('Pruebas de DashboardRoutes', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: 'Aarón',
      logged: true
    }
  }

  test('Debe renderizar el componente correctamente', () => {
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

});
