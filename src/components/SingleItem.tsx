import React from 'react';
import { useParams } from 'react-router-dom';

interface Item {
  _id: string;
  name: string;
  description: string;
  images: string[];
  rent: number;
  location: string;
}

// Example static items
const items: Item[] = [
  {
    _id: '1',
    name: 'Item 1',
    description: 'This is the description for Item 1.',
    images: ['https://via.placeholder.com/150', 'https://via.placeholder.com/200', 'https://via.placeholder.com/150', ],
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

const SingleItem: React.FC = () => {
  const { itemId } = useParams<{ itemId: string }>();

  // Find the single item based on the itemId from the URL
  const item = items.find(item => item._id === itemId);

  if (!item) {
    return <div>Item not found!</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <p><strong>Rent:</strong> ${item.rent}</p>
      <p><strong>Location:</strong> {item.location}</p>

      {/* Display all images */}
      <div className="row">
        {item.images.map((image, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <img
              src={image}
              className="img-fluid"
              alt={`Image ${index + 1} of ${item.name}`}
              style={{ height: '200px', objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SingleItem;
