import React, { useState, useEffect } from "react";
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
                <h1>pieflix</h1>
                <h2>the best movie<br/>for the best pizza</h2>
            </div>
            <div className="image-block bottom">
            </div>
        </div>
        <div className="solid-block">
            <div id="plus-graph">
                <img src={pizza} /> &nbsp; + &nbsp; <img src={reel} />
            </div>
            <p>don't let your pizza get cold while you surf streaming platforms looking for something to watch. pieflix is here to find you the perfect pizza-movie pairing based off of your chosen pizza brand.</p>
        </div>
       </div>
    )
}


export default Landing;
