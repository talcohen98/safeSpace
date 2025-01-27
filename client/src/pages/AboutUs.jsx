import PropTypes from "prop-types";
import { useEffect } from "react";

const AboutUs = ({ setNavBarOption }) => {

    useEffect(() => {
        // Update the Navbar option to About Us
        setNavBarOption("About Us");
    }
    , []);

    return (
        <div className="page">
            <section className="about-team">
                <h2>About Us</h2>
                <p>We are four Computer Science graduates taking part in the QueenB X AppsFlyer - BeSafe Hackathon
                    2025</p>
                <div className="team-members">
                    <div className="team-member">
                        <h3>Tal Cohen
                            <a href="https://www.linkedin.com/in/talcohen98/" target="_blank" rel="noopener noreferrer"
                               className="linkedin-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </h3>
                    </div>
                    <div className="team-member">
                        <h3>Idan Yehiel
                            <a href="https://www.linkedin.com/in/idan-yehiel1/" target="_blank" rel="noopener noreferrer"
                               className="linkedin-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </h3>
                    </div>
                    <div className="team-member">
                        <h3>Etti Revach
                            <a href="https://www.linkedin.com/in/etti-revach/" target="_blank" rel="noopener noreferrer"
                               className="linkedin-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </h3>
                    </div>
                    <div className="team-member">
                        <h3>Gal Itzhak
                            <a href="https://www.linkedin.com/in/gal-itzhak-358203278/" target="_blank"
                               rel="noopener noreferrer"
                               className="linkedin-icon">
                                <i className="fab fa-linkedin"></i>
                            </a>
                        </h3>
                    </div>
                </div>
            </section>
        </div>
    )
}

AboutUs.propTypes = {
    setNavBarOption: PropTypes.func.isRequired,
};

export default AboutUs