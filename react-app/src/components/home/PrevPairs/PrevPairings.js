import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { deletePair } from "../../../store/pairing";
import { getPastReviews, newReview } from "../../../store/review";
import "./prevpairings.css"

const PrevPairingCard = (movie) => {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)

    useEffect(() => {
        dispatch(getPastReviews())
    }, [])

    const deletePrevPair = () => {
        dispatch(deletePair(userId, movie.movie.id))
    };

    const thumbsUp = () => {
        dispatch(newReview(true, userId, movie.movie.id))
    }

    const thumbsDown = () => {
        dispatch(newReview(false, userId, movie.movie.id))
    }

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
                    <button onClick={thumbsUp}><ion-icon name="thumbs-up-outline"></ion-icon></button>
                    <button onClick={thumbsDown}><ion-icon name="thumbs-down-outline"></ion-icon></button>
                    <button onClick={deletePrevPair}><ion-icon name="trash-outline"></ion-icon></button>
                </div>
            </div>
        </div>
    )
};

export default PrevPairingCard;
