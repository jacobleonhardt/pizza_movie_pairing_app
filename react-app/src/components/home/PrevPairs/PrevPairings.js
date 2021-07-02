import React from 'react';
import "./prevpairings.css"

const PrevPairingCard = (movie) => {
    return (
        <div className="previous-pairing">
            <div id="pairing-cards" className="solid-block">
                <div className="first">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.movie.poster}`} />
                </div>
                <div className="second">
                    <h4>{movie.movie.title} ({movie.movie.release_date ? movie.movie.release_date.slice(0,4) : 'Unknown'})</h4>
                </div>
                <div className="three">
                    <h4>{movie.movie.pizza}</h4>
                </div>
                <div className="four">
                    <button><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button><ion-icon name="thumbs-down-outline"></ion-icon></button>
                    <button><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    )
};

export default PrevPairingCard;
