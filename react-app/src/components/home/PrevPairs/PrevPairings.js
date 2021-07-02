import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deletePair } from "../../../store/pairing";
import { newReview } from "../../../store/review";
import "./prevpairings.css"

const PrevPairingCard = (movie, review) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    let isGood = false;
    let isBad = false;

    const deletePrevPair = () => {
        dispatch(deletePair(userId, movie.movie.id))
    };

    const thumbsUp = () => {
        isGood = true;
        dispatch(newReview(true, userId, movie.movie.id))
        console.log('##############', isGood)
    }

    const thumbsDown = () => {
        isBad = true;
        dispatch(newReview(false, userId, movie.movie.id))
    }
    console.log('##############', isGood)

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
                    <button disabled={isBad} onClick={thumbsUp} className={(isGood ? "good" : "no-vote")}><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button disabled={isGood} onClick={thumbsDown} className={(isBad ? "bad" : "no-vote")}><ion-icon name="thumbs-down-outline"></ion-icon></button>
                    <button onClick={deletePrevPair}><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    )
};

export default PrevPairingCard;
