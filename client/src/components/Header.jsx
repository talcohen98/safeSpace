import logo from "../images/logo.jpeg";
import AskQuestionButton from "./AskQuestionButton.jsx";
import { Link } from 'react-router-dom'
import { useLogout } from "../hooks/useLogout.jsx";
import {useAuthContext} from "../hooks/useAuthContext.jsx";
import PropTypes from "prop-types";

const Header = ({ setNavBarOption }) => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <div className="header-content">
            <Link to="/" onClick={() => setNavBarOption("Home")}>
                <div className="header-left">
                    <img src={logo} alt="App Logo" className="app-logo"/>
                    <h1 className="app-title">SafeSpace</h1>
                </div>
            </Link>

            <div className="line-separator"></div>

            <nav className="header-right">
                { user && (
                    <div className="signup-login">
                        <span>Hello, {user.name}!</span>
                        <button className="logout-btn" onClick={handleClick}>Log out</button>
                    </div>
                )}

                { !user && (
                    <div className="signup-login">
                        <Link to='/signup'>Sign up</Link>
                        <Link to='/login'>Log in</Link>
                    </div>
                )}

                <AskQuestionButton/>
            </nav>
        </div>
    )
}

Header.propTypes = {
    setNavBarOption: PropTypes.func.isRequired,
};

export default Header