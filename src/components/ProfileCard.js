import React, { useEffect } from 'react';
import '../styles/ProfileCard.css';

const ProfileCard = () => {
    useEffect(() => {
        // Initialize particles.js when component mounts
        if (window.particlesJS) {
            window.particlesJS("particles-js", {
                // Your existing particles config...
                particles: {
                    number: {
                        value: 100,
                        density: {
                            enable: true,
                            value_area: 1000
                        }
                    },
                    // ... rest of your existing particles config
                }
            });
        }
    }, []);

    return (
        <>
            <aside className="profile-card">
                <header>
                    <a href="https://example.com" target="_blank" rel="noopener noreferrer">
                        <img src="/mp.jpeg" alt="Michael Preciado" />
                    </a>
                    <h1>Michael Preciado</h1>
                    <h2>Dev | Design | Data</h2>
                </header>

                <div className="profile-bio">
                    <p>HTML, CSS, Java, SQL, & Python, </p>
                    <p>Design with: Figma, XD, & ProCreate.</p>
                </div>

                <ul className="profile-social-links">
                    <li>
                        <a href="https://twitter.com/MichaeIPreciado" className="fa-brands fa-x-twitter" title="myXpage" target="_blank" rel="noopener noreferrer"></a>
                    </li>
                    <li>
                        <a href="https://github.com/michaelpreciado" className="fa fa-github" title="mygithubprofile" target="_blank" rel="noopener noreferrer"></a>
                    </li>
                    <li>
                        <a href="https://www.linkedin.com/in/michael-preciado-74959b227/" title="mylinkedinprofile" target="_blank" rel="noopener noreferrer">
                            <i className='fa fa-linkedin'></i>
                        </a>
                    </li>
                </ul>
            </aside>
            <div id="particles-js"></div>
        </>
    );
};

export default ProfileCard; 