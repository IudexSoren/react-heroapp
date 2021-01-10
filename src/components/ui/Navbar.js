import { useContext } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

const Navbar = () => {

    const { user:{ name }, dispatch } = useContext(AuthContext);

    // Navbar tiene acceso al hook useHistory al estar dentro de ContextProvider
    const history = useHistory();

    const handleLogout = () => {
        const action = {
            type: types.logout
        }
        dispatch(action);
        history.replace('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark px-2">
            <Link
                className="navbar-brand"
                to="/"
            >
                Associations
            </Link>
            <div className="navbar-collapse">
                <div className="navbar-nav">
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink
                        activeClassName="active"
                        className="nav-item nav-link"
                        exact
                        to="/search"
                    >
                        Search🔎
                    </NavLink>
                </div>
            </div>
            <div>
                <ul className="navbar-nav ml-auto">
                    <span className="nav-item nav-link text-info">{ name }</span>
                    <button
                        className="nav-item nav-link btn"
                        onClick={ handleLogout }
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;