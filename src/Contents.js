import React from 'react';
import mapImg from './images/map.svg';
import utelsilImg from './images/utensilsImg.svg'


// Use response from API call to create a component to render restaurants information. (Note: The response will contain a “restaurants” field that is an array with 0 or more objects.)
const Contents = (props) => {
    return (
            <div className="restoDetail">
            <div>
            <img src={props.restro.featured_image} alt={props.restro.name} />
            </div>
            <div>
            <h2 className="restroName">{props.restro.name}</h2>
            <p className="menuRow">
                <span>{props.restro.cuisines}</span>
                <a href={props.restro.menu_url} target="_blank" rel="noopener noreferrer"><img src ={utelsilImg} className="menuIcon" alt={'a fork and spoon'}/><span className="menu">Menu</span></a>
            </p>
            <p><span>Rating: </span>{props.restro.user_rating.aggregate_rating}</p>
            <p><span>Average Cost for Two: </span>{props.restro.currency}{props.restro.average_cost_for_two}</p>
            <p><img src={mapImg} alt={'a location display icon'} className="mapIcon"/><a href={`https://maps.google.com/?q=${props.restro.name} ${props.restro.location.address}`} target="_blank" rel="noopener noreferrer">See on Map</a></p>
            </div>
            </div>

    )
}

export default Contents;