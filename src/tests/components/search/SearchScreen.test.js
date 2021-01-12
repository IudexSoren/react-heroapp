import { mount } from 'enzyme';
import { MemoryRouter, Route } from 'react-router-dom';
import SearchScreen from '../../../components/search/SearchScreen';

describe('Pruebas de SearchScreen', () => {

  const history = {
    push: jest.fn(),
    replace: jest.fn()
  }

  test('Debe renderizar correctamente el componente', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/search'] }>
        <Route
          exact
          path='/search'
          component={ () => <SearchScreen history={ history } /> }
        />
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.alert-info').text()).toBe('Search a hero');
  });

  test('Debe mostrar un héroe y el valor del input debe basarse en el argumento de la búsqueda', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/search?q=batman'] }>
        <Route
          exact
          path='/search'
          component={ () => <SearchScreen history={ history } /> }
        />
      </MemoryRouter>
    );

    expect(wrapper.find('input').prop('value')).toBe('batman');
    expect(wrapper.find('HeroCard').exists()).toBeTruthy();
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe mostrar el mensaje de error al no encontrar un héroe con los argumentos especificados en el URL', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/search?q=chico%20percebe'] }>
        <Route
          exact
          path='/search'
          component={ () => <SearchScreen history={ history } /> }
        />
      </MemoryRouter>
    );

    expect(wrapper.find('.alert-warning').text()).toBe('No results for chico percebe');
    expect(wrapper).toMatchSnapshot();
  });

  test('Debe ejecutar el PUSH del history', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={ ['/search'] }>
        <Route
          exact
          path='/search'
          component={ () => <SearchScreen history={ history } /> }
        />
      </MemoryRouter>
    );
    wrapper.find('input').simulate('change', {
      target: {
        name: 'searchText',
        value: 'spider'
      }
    });
    wrapper.find('form').simulate('submit', {
      preventDefault(){}
    });

    expect(history.push).toHaveBeenCalledWith('?q=spider');
  });

});
