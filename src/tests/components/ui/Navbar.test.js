import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import Navbar from "../../../components/ui/Navbar";
import { types } from "../../../types/types";


describe('Pruebas de Navbar', () => {

  const historyMock = {
    replace: jest.fn(),
    push: jest.fn(),
    location: {},
    listen: jest.fn(),
    createHref: jest.fn()
  }

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      name: 'Aarón',
      logged: true
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue } >
      <MemoryRouter>
        <Router history={ historyMock }>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Debe renderizar correctamente el componente y mostrar el nombre del usuario autenticado', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('span').text()).toBe(contextValue.user.name);
  });

  test('Debe ejecutar el logout y history.replace', () => {
    wrapper.find('button').simulate('click');

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.logout
    });
    expect(historyMock.replace).toHaveBeenCalledWith('/login');
  });

});
