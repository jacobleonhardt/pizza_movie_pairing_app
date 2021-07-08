import React from "react";
import "./home.css";
import reel from "../../images/film-reel-dkn.png"
import pizza from "../../images/pizza-graphic.png"


function Landing() {
    return(
        <div className="content">
        <div className="greeting landing">
            <div className="image-block left">
            </div>
            <div className="text-block">
                <h2>the best movie<br/>for the best pizza</h2>
            </div>
            <div className="image-block bottom">
            </div>
        </div>
        <div className="solid-block">
            <div id="plus-graph">
                <img src={pizza} alt="pizza graphic"/> &nbsp; + &nbsp; <img src={reel} alt="film reel graphic"/> &nbsp; = &nbsp; <span id="equals"><h3>pieflix</h3></span>
            </div>
            <p>Don't let your pizza get cold while you surf streaming platforms looking for something to watch. pieflix is here to find you the perfect pizza-movie pairing based off of your chosen pizza brand.</p>
        </div>
       </div>
    )
}


export default Landing;
