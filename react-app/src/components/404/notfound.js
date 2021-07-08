import React from 'react'
import { Link } from 'react-router-dom';
import './notfound.css'

const NotFound = () => {

    let x = Math.floor(Math.random() * 10);

    const quotes = [
        {movie: "Star Wars", said: "Obi-Wan (Ben) Kenobi", quote: "These aren't the droids you're looking for."},
        {movie: "Star Wars: Episode II - Attack of the Clones", said: "Madame Jocasta Nu", quote: "One thing you may be absolutely sure of - if an item does not appear in our records, it does not exist!"},
        {movie: "The Wizard of Oz", said: "Dorothy", quote: "Toto, I've a feeling we're not in Kansas anymore."},
        {movie: "Cool Hand Luke", said: "Captain", quote: "What we've got here is failure to communicate."},
        {movie: "Forrest Gump", said: "Forrest Gump", quote: "My mama always said life was like a box of chocolates. You never know what you're gonna get."},
        {movie: "Apollo 13", said: "Jim Lovell", quote: "Houston, we have a problem."},
        {movie: "Casablanca", said: "Rick Blaine", quote: "Of all the gin joints in all the towns in all the world, she walks into mine."},
        {movie: "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb", said: "President Merkin Muffley", quote: "Gentlemen, you can't fight in here! This is the War Room."},
        {movie: "Labyrinth", said: "The Worm", quote: "If she'd 'ave kept on goin' down that way she'd 'ave gone straight to that castle."},
        {movie: "Avengers: Endgame", said: "Clint Barton", quote: "You see where you're going. Now let's worry about how you get there."},
    ]

    let film = quotes[x]

    return (
        <div className="container not-found">
            <div className="greeting">
                <h2>404</h2>
            </div>
            <div id="quote" className="solid-block">
                <h3>"{film.quote}"</h3>
                <p>{film.said},<br/>
                <em>{film.movie}</em></p>
                <Link to='/' className="button-link-alt">Back to Pairings</Link>
            </div>
        </div>
    )
}

export default NotFound
