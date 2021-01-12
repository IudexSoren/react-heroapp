import { mount } from "enzyme";
import { MemoryRouter } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import LoginScreen from "../../../components/login/LoginScreen";
import { types } from "../../../types/types";


describe('Pruebas de LoginScreen', () => {

  const history = {
    replace: jest.fn()
  }

  const contextValue = {
    dispatch: jest.fn(),
    user: {
      logged: false
    }
  }

  const wrapper = mount(
    <AuthContext.Provider value={ contextValue }>
      <MemoryRouter>
        <LoginScreen history={ history } />
      </MemoryRouter>
    </AuthContext.Provider>
  );

  test('Debe renderizar correctamente el componente', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe ejecutar el dispatch y la navegación', () => {
    wrapper.find('button').simulate('click');

    expect(contextValue.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: 'Aarón'
      }
    });
    expect(history.replace).toHaveBeenCalledWith('/');

    localStorage.setItem('lastPath', '/dc');
    wrapper.find('button').simulate('click');

    expect(history.replace).toHaveBeenCalledWith('/dc');
  });

});
