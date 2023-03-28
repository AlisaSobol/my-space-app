import React from "react";
import './index.scss'

const Astronaut = ({ name }) => {
    return (
        <li>
            <img src="https://api.dicebear.com/5.x/adventurer/svg" alt="Astronaut" />
            <div className='astronaut_name'>
                <p>{ name }</p>
            </div>
        </li>
    )
}

const Astronauts = ({ astronauts, error }) => {
    return (
        <>
            <h2>Who is on board?</h2>
            { error ? (
                <>
                    <h3>There is no connection with the Space Station...</h3>
                    <h3>Try to refresh the page</h3>
                </>
            ) : (
                <ul className="astronaut">
                    { astronauts.map((astronaut, i) => <Astronaut key={ i } name={ astronaut.name } /> )}
                </ul>
            )}
        </>
    )
}
export default Astronauts;
