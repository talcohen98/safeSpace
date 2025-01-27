import { Link } from "react-router";
import PropTypes from "prop-types";

// Import icons
// import homeIcon from '../images/home.png';
// import cyberCrimeIcon from '../images/cyber-crime.png';
// import harassmentIcon from '../images/sexual-harassment.png';
// import eatingIcon from '../images/eating.png';

/*
Using useState to toggle underline under the current page.
Using Link to connect a page to its path and render to the current page later.
Added icons for each navigation option.
*/
const Navbar = ({ navBarOption, setNavBarOption }) => {

    return (
        <div className="navbar">
            <ul className="navbar-options">

                {/* Home */}
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <li className="navbar-option" onClick={() => setNavBarOption("Home")}>
                        {/*<img src={homeIcon} alt="Home" className="navbar-icon" />*/ } Home
                    </li>
                    {navBarOption === "Home" ? <hr /> : null}
                </Link>

                {/* AboutUs */}
                <Link to="/About-Us" style={{ textDecoration: 'none' }}>
                    <li className="navbar-option" onClick={() => setNavBarOption("Home")}>
                        About Us
                    </li>
                    {navBarOption === "About Us" ? <hr /> : null}
                </Link>

                {/* All questions */}
                <Link to="/All-Questions" style={{ textDecoration: 'none' }}>
                    <li className="navbar-option" onClick={() => setNavBarOption("All Questions")}>
                        Expert Forum
                    </li>
                    {navBarOption === "All Questions" ? <hr /> : null}
                </Link>

            </ul>
        </div>
    );
}

Navbar.propTypes = {
    navBarOption: PropTypes.string.isRequired,
    setNavBarOption: PropTypes.func.isRequired,
};

export default Navbar;