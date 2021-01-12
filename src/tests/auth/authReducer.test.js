import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas de authReducer', () => {

  test('Debe retornar el estado por defecto', () => {
    const state = authReducer({ logged: false }, {});

    expect(state).toEqual({ logged: false });
  });

  test('Debe establecer el estado como autenticado y colocar el nombre del usuario', () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Aarón'
      }
    }
    const state = authReducer({ logged: false }, action);

    expect(state.name).toBe(action.payload.name);
    expect(state.logged).toBeTruthy();
  });

  test('Debe establecer el estado como no autenticado y eliminar el nombre del usuario', () => {
    const action = {
      type: types.logout
    }
    const state = authReducer({ name: 'Aarón', logged: true }, action);

    expect(state.name).toBeUndefined();
    expect(state.logged).toBeFalsy();
  });

});
