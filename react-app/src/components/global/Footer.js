import React from 'react';
import './nav_footer.css';

const Footer = () => {


    return(
        <footer>
            <div className="left">
                <p>©2021, pieflix | Site by Jacob Leonhardt <a href="https://github.com/jacobleonhardt" target="_blank"><ion-icon name="logo-github"></ion-icon></a><a href="https://www.linkedin.com/feed/" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></a></p>
            </div>
            <div className="right">
                <img src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_long_1-8ba2ac31f354005783fab473602c34c3f4fd207150182061e425d366e4f34596.svg"/>
                <p>This product uses the TMDb API but is not endorsed or certified by TMDb.</p>
            </div>
            <div className="bottom">
                <p>©2021, pieflix | Site by Jacob Leonhardt <a href="https://github.com/jacobleonhardt" target="_blank"><ion-icon name="logo-github"></ion-icon></a><a href="https://www.linkedin.com/feed/" target="_blank"><ion-icon name="logo-linkedin"></ion-icon></a></p>
            </div>
        </footer>
    )
}

export default Footer;
