
import { useState, useEffect } from 'react';
import '../style/ReturnToTopButton.css'; // Create a CSS file for styling

const ReturnToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        const scrolled = window.scrollY;
        setIsVisible(scrolled > 0); // Show button when scrolled down 300px
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        isVisible && (
            <button className="return-to-top" onClick={scrollToTop}>
                <span className="material-symbols-outlined">
                arrow_upward
                </span>
            </button>
        )
    );
};

export default ReturnToTopButton;
