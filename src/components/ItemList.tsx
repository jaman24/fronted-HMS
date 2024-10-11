import React from 'react';
import { Link } from 'react-router-dom';

interface Item {
  _id: string;
  name: string;
  description: string;
  images: string[];
  rent: number;
  location: string;
}

const items: Item[] = [
  {
    _id: '1',
    name: 'Item 1',
    description: 'This is the description for Item 1.',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200'],
    rent: 10,
    location: 'Location 1',
  },
  {
    _id: '2',
    name: 'Item 2',
    description: 'This is the description for Item 2.',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200'],
    rent: 20,
    location: 'Location 2',
  },
  {
    _id: '3',
    name: 'Item 3',
    description: 'This is the description for Item 3.',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200'],
    rent: 30,
    location: 'Location 3',
  },
];

const ItemList: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>Items Type</h2>

      <div className="row">
        {items.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card shadow">
              {/* Show the first image */}
              <img
                src={item.images[0]} // Display the first image from the images array
                className="card-img-top"
                alt={item.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <p><strong>Rent:</strong> ${item.rent}</p>
                <p><strong>Location:</strong> {item.location}</p>
                <Link to={`/item/${item._id}`} className="btn btn-primary">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;
