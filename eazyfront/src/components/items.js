// import React, { useState, useEffect } from 'react';
// import Cards from './card';
// import './css/Items.css';

// const Items = () => {
//   const [restaurantData, setRestaurantData] = useState([]);

//   useEffect(() => {
//     const fetchRestaurantData = async () => {
//       try {
//         const response = await fetch('http://localhost:3005/restaurants/select');
//         const data = await response.json();
        
//         if (response.ok) {
//           setRestaurantData(data);
//         } else {
//           console.error('Error fetching restaurant data:', data);
//         }
//       } catch (error) {
//         console.error('Error during fetch:', error);
//       }
//     };

//     fetchRestaurantData();
//   }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

//   return (
//     <div>
//       <div className="container my-3">
//         <div className="row">
//           {restaurantData.map((element) => (
//             <div className="col-md-3" key={element.id}>
//               <Cards id={element.id} title={element.name} location={element.location} imageUrl={element.image} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Items;




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
