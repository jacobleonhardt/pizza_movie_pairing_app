import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeCall } from '../../store/pairing';
import './pairingform.css'

const PairingFrom = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [pizzaPlace, setPizzaPlace] = useState("");

    const apiCall = async (e) => {
        e.preventDeafult();
        const pair = dispatch(makeCall(pizzaPlace))
    }

    return(
        <div className="container">
            <div class="form-container">
                <form onSubmit={apiCall()}>
                    <label htmlFor="pizzaPlace">Pizza Place</label>
                    <select value={state.value} onChange={setPizzaPlace(e => e.target.value)}>
                        <option value="dominos">Domino's Pizza</option>
                        <option value="donatos">Donatos Pizza</option>
                        <option value="little-caesars">Little Caesars Pizza</option>
                        <option value="mellow-mushroom">Mellow Mushroom</option>
                        <option value="papa-johns">Papa John's Pizza</option>
                        <option value="pizza-hut">Pizza Hut</option>
                    </select>
                </form>
            </div>
        </div>
    )
}

export default PairingForm;
