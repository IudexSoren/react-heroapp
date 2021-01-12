import { mount } from 'enzyme';
import { AuthContext } from '../../auth/AuthContext';
import AppRouter from '../../routers/AppRouter';


describe('Pruebas de AppRouter', () => {

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  };

  test('Debe mostrar el login si el usuario no está autenticado', () => {
    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter  />
      </AuthContext.Provider>
    );

    expect(wrapper.find('LoginScreen').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe mostrar el componente MarvelScreen si el usuario está autenticado', () => {
    const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: true,
      name: 'Aarón'
    }
  };

    const wrapper = mount(
      <AuthContext.Provider value={ contextValue }>
        <AppRouter  />
      </AuthContext.Provider>
    );

    expect(wrapper.find('MarvelScreen').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });


});
