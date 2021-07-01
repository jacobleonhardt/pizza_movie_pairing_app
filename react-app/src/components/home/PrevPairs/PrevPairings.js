import React from 'react';
import "./prevpairings.css"

const PrevPairingCard = (movie) => {
    return (
        <div className="previous-pairing">
            <div id="pairing-display" className="solid-block">
                <div className="left">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.movie.poster}`} />
                </div>
                <div className="right">
                    <h4>{movie.movie.title} ({movie.movie.release_date ? movie.movie.release_date.slice(0,4) : 'Unknown'})</h4>
                    <h4>{movie.movie.pizza}</h4>
                </div>
            </div>
        </div>
    )
};

export default PrevPairingCard;
