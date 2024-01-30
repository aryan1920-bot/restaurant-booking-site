//card.js



import React from 'react';
import { Link } from 'react-router-dom';
import './css/Cards.css'
class Cards extends React.Component {

  render() {
    const { id, title, location, imageUrl } = this.props;

    return (
      <Link to={`/restaurant/${id}`} style={{ textDecoration: 'none' }}>
        <div className="my-3 restaurant-card">
          <div className="card">
            <img className="card-img-top" src={imageUrl} alt="Restaurant" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{location}</p>
            </div>
          </div>
        </div>
      </Link>
    );
  }
}

export default Cards;


