import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeCall } from '../../store/pairing';
import './pairingform.css'

const PairingForm = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [pizzaPlace, setPizzaPlace] = useState("dominos");

    const apiCall = async (e) => {
        e.preventDefault();
        const pair = dispatch(makeCall(user.id, pizzaPlace))
        return pair;
    }

    return(
        <div className="container">
            <div className="greeting">
                <h2>Find a Film</h2>
            </div>
            <div id="pairing-form" className="solid-block">
                <h3>Pick a Pizza Place</h3>
                <form onSubmit={apiCall}>
                    <label htmlFor="pizzaPlace">Pizza Place</label>
                    <select value={pizzaPlace} onChange={(e => setPizzaPlace(e.target.value))}>
                        <option value="dominos">Domino's Pizza</option>
                        <option value="donatos">Donatos Pizza</option>
                        <option value="little-caesars">Little Caesars Pizza</option>
                        <option value="mellow-mushroom">Mellow Mushroom</option>
                        <option value="papa-johns">Papa John's Pizza</option>
                        <option value="pizza-hut">Pizza Hut</option>
                    </select>
                    <button className="button-link-alt">Find a Film</button>
                </form>
            </div>
        </div>
    )
}

export default PairingForm;
