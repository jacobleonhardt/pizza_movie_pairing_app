import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeCall, deletePair } from '../../store/pairing';
import './pairingform.css'

const PairingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [pizzaPlace, setPizzaPlace] = useState("");
    const [condition, setCondition] = useState(false)
    const selection = useSelector(state => state.pairing)
    const movie = selection[0];

    const apiCall = async (e) => {
        e.preventDefault();
        const pair = await dispatch(makeCall(user.id, pizzaPlace))
        setCondition(true)
        return pair;
    }
// Removing previous pair and querying a new movie.
// "Actually, it's super easy, barely an inconvenience.""
    const notFeelingIt = async (e) => {
        e.preventDefault();
        dispatch(deletePair(user.id, movie.id))
        const pair = await dispatch(makeCall(user.id, pizzaPlace))
        setCondition(true)
        return pair;
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
                    <h2>{movie.title}</h2>
                    <h5>({movie.release_date ? movie.release_date.slice(0,4) : 'Unknown'})</h5>
                    <p>{movie.plot}</p>
                    <br/>
                    <button onClick={notFeelingIt} className="button-link-alt">Not Feeling It?</button>
                </div>
            </div> :
            <div id="pairing-form" className="solid-block">
                <h3>Pick a Pizza Place</h3>
                <form onSubmit={apiCall}>
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
            </div>}
        </div>
    )
}

export default PairingForm;
