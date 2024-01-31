// //items.js

// import React from 'react';
// import Cards from './card';
// import './css/Items.css';
// import { Link } from 'react-router-dom';

// class Items extends React.Component {
//   state = {
//     list: [],
//   };

//   componentDidMount() {
//     // Fetch data from the API endpoint
//     fetch('http://localhost:3005/restaurants/select')
//       .then((response) => response.json())
//       .then((data) => {
//         this.setState({
//           list: data,
//         });
//       })
//       .catch((error) => console.error('Error fetching data:', error));
//   }

//   render() {
//     return (
//       <div>
//         <div className="container my-3">
//           <div className="row">
//             {this.state.list.map((element) => (
//               <div className="col-md-3" key={element.id}>
//                 <Cards
//                   id={element.id}
//                   title={element.name}
//                   location={element.location}
//                   imageUrl={element.image}
//                 />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default Items;




import React, { useState, useEffect } from 'react';
import Cards from './card';
import './css/Items.css';

const Items = () => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch data from the API endpoint
    fetch('http://localhost:3005/restaurants/select')
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // You can add your logic here if needed, for now, we'll just log the searchQuery
    console.log('Search query:', searchQuery);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredList = list.filter(
    (element) =>
      element.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      element.cuisine_type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="search-bar">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search by Cuisine, Restaurant, or Location..."
            value={searchQuery}
            onChange={handleSearchInputChange}  
            className="bar"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="container my-3">
        <div className="row">
          {filteredList.map((element) => (
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
};

export default Items;
