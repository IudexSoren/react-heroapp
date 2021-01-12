import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import HeroScreen from "../../../components/heroes/HeroScreen";


describe('Pruebas de HeroScreen', () => {

  const history = {
    length: 5,
    goBack: jest.fn(),
    push: jest.fn()
  }


  test('Debe renderizar correctamente el componente Redirect si NO se recibe el argumento esperado en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/hero'] }>
        <HeroScreen history={ history } />
      </MemoryRouter>
    );

    expect(wrapper.find('Redirect').exists()).toBeTruthy();
  });

  test('Debe renderizar el componente correctamente si recibe el argumento esperado en el URL', () => {
    // initialEntries permite establecer los parámetros del URL
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
        <Route exact path="/hero/:heroeId" component={ HeroScreen } />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.row').exists()).toBeTruthy();
  });

  test('Debe regresar a la pantalla inicial ejecutando PUSH', () => {
    // Redefinición del history para este test. Cambio: length <= 2
    const history = {
      length: 1,
      goBack: jest.fn(),
      push: jest.fn()
    }
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
        <Route
          exact
          path="/hero/:heroeId"
          component={ (props) => <HeroScreen history={ history } /> }  />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click');

    expect(history.push).toHaveBeenCalledWith('/');
    expect(history.goBack).not.toHaveBeenCalled();
  });

  test('Debe regresar a la pantalla anterior ejecutando GOBACK', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/hero/marvel-spider'] }>
        <Route
          exact
          path="/hero/:heroeId"
          // Forma de establecer la propiedad
          component={ (props) => <HeroScreen history={ history } /> }  />
      </MemoryRouter>
    );
    wrapper.find('button').simulate('click');

    expect(history.goBack).toHaveBeenCalled();
    expect(history.push).not.toHaveBeenCalled();
  });

  test('Debe renderizar el componente Redirect si el heroeId no existe', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/hero/marvel-SPODER'] }>
        <Route
          exact
          path="/hero/:heroeId"
          // Forma de establecer la propiedad
          component={ (props) => <HeroScreen history={ history } /> }  />
      </MemoryRouter>
    );

    expect(wrapper.text()).toBe('');
  });

});
