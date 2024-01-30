//items.js

import React from 'react';
import Cards from './card';
import './css/Items.css';
import { Link } from 'react-router-dom';

class Items extends React.Component {
  state = {
    list: [],
  };

  componentDidMount() {
    // Fetch data from the API endpoint
    fetch('http://localhost:3005/restaurants/select')
      .then((response) => response.json())
      .then((data) => {
        this.setState({
          list: data,
        });
      })
      .catch((error) => console.error('Error fetching data:', error));
  }

  render() {
    return (
      <div>
        <div className="container my-3">
          <div className="row">
            {this.state.list.map((element) => (
              <div className="col-md-3" key={element.id}>
                <Cards
                  id={element.id}
                  title={element.name}
                  location={element.location}
                  imageUrl={element.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Items;
