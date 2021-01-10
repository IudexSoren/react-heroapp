import { useContext } from "react"
import { AuthContext } from "../../auth/AuthContext"
import { types } from "../../types/types";


const LoginScreen = ({ history }) => {

  const { dispatch } = useContext(AuthContext);

  const handleLogin = () => {
    const action = {
      type: types.login,
      payload: {
        name: 'Aarón'
      }
    }
    dispatch(action);
    const lastPath = localStorage.getItem('lastPath') || '/';
    history.replace(lastPath);
  }

  return (
    <div className="container mt-5">
      <h1>Login</h1>
      <hr/>
      <button
        className="btn btn-outline-dark"
        onClick={ handleLogin }
      >
        Log In
      </button>
    </div>
  )
}

export default LoginScreen;
