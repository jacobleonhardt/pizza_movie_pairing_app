import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeCall, makePizzaCall, makeDiffCall } from '../../store/pairing';
import './pairingform.css'

const PairingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [pizzaPlace, setPizzaPlace] = useState("");
    const [condition, setCondition] = useState(false)
    const [formType, setFormType] = useState('true')
    const [movieTitle, setMovieTitle] = useState("")
    const [movieYear, setMovieYear] = useState("")
    const selection = useSelector(state => state.pairing)
    const movie = selection[0];


    const updateFormType = (e) => {
        setFormType(e.target.value)
    }

    const updateMovieTitle = (e) => {
        setMovieTitle(e.target.value)
    };

    const updateMovieYear = (e) => {
        setMovieYear(e.target.value)
    };

    const movieCall = async (e) => {
        e.preventDefault();
        const pair = await dispatch(makeCall(user.id, pizzaPlace))
        setCondition(true)
        return pair;
    }

    const pizzaCall = async (e) => {
        e.preventDefault();
        const movie = await dispatch(makePizzaCall(user.id, movieTitle, movieYear))
        setCondition(true)
        return movie;
    }

// Removing previous pair and querying a new movie.
// "Actually, it's super easy, barely an inconvenience.""
    const notFeelingIt = async (e) => {
        e.preventDefault();
        const newPair = await dispatch(makeDiffCall(user.id, pizzaPlace, movie.id))
        return newPair;
    }

    return(
        <div className="container">
            <div className="greeting">
                <h2>Find a Film</h2>
            </div>
            { condition ?
            <div id="pairing-display" className="solid-block">
                <div className="left">
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster}`} alt={`${movie.title} movie poster`} />
                </div>
                <div className="right">
                    <h2>{movie.pizza_selection}</h2>
                    <h2>{movie.title}</h2>
                    <h5>({movie.release_date ? movie.release_date.slice(0,4) : 'Unknown'})</h5>
                    <p>{movie.plot}</p>
                    <br/>
                    <button onClick={notFeelingIt} className="button-link-alt">Not Feeling It?</button>
                </div>
            </div> :
            <div id="pairing-form" className="solid-block">
                <form id="form-selection">
                    <div className="radio-button">
                        <label htmlFor="formType-pizza">
                            <input
                                type="radio"
                                value={'true'}
                                onChange={updateFormType}
                            />Search by Pizza</label>
                    </div>
                    <div className="radio-button">
                        <label htmlFor="formType-movie">
                            <input
                                type="radio"
                                value={'false'}
                                onChange={updateFormType}
                            />Search by Movie</label>
                    </div>
                </form>
                {formType == 'true' ?
                <>
                <h3>Where are we eating?</h3>
                <form onSubmit={movieCall}>
                    <label htmlFor="pizzaPlace">Pizza Place</label>
                    <select value={pizzaPlace} onChange={(e => setPizzaPlace(e.target.value))}>
                        <option value="" disabled>Select a Pizza Place</option>
                        <option value="dominos">Domino's Pizza</option>
                        <option value="donatos">Donatos Pizza</option>
                        <option value="giordanos">Giordano's</option>
                        <option value="little-caesars">Little Caesars Pizza</option>
                        <option value="mellow-mushroom">Mellow Mushroom</option>
                        <option value="papa-johns">Papa John's Pizza</option>
                        <option value="pizza-hut">Pizza Hut</option>
                    </select>
                    <button className="button-link-alt">Find a Film</button>
                </form>
                </>
                :
                <>
                <h3>What are we watching tonight?</h3>
                <form onSubmit={pizzaCall}>
                    <label htmlFor="movieTitle">Movie Title</label>
                    <input
                        type="text"
                        placeholder="What are we watching tonight?"
                        value={movieTitle}
                        onChange={updateMovieTitle}
                        />
                    <input
                        type="text"
                        placeholder="When did it come out?"
                        value={movieYear}
                        onChange={updateMovieYear}
                        />
                    <button className="button-link-alt">Pick a Pizza</button>
                </form>
                </>}
            </div>}
        </div>
    )
}

export default PairingForm;
