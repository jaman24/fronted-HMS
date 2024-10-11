import React from 'react';
import { useParams } from 'react-router-dom';

interface Reservation {
  _id: string;
  guestName: string;
  bookingDate: string;
  status: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
  specialRequests?: string;
}

// Same static data
const reservations: Reservation[] = [
  {
    _id: '1',
    guestName: 'John Doe',
    bookingDate: '2024-10-01',
    status: 'Confirmed',
    roomNumber: '101',
    checkInDate: '2024-10-12',
    checkOutDate: '2024-10-15',
    specialRequests: 'Allergic to peanuts',
  },
  {
    _id: '2',
    guestName: 'Jane Smith',
    bookingDate: '2024-09-15',
    status: 'Cancelled',
    roomNumber: '102',
    checkInDate: '2024-10-10',
    checkOutDate: '2024-10-14',
  },
  {
    _id: '3',
    guestName: 'Alice Johnson',
    bookingDate: '2024-10-02',
    status: 'Pending',
    roomNumber: '103',
    checkInDate: '2024-10-18',
    checkOutDate: '2024-10-22',
    specialRequests: 'Requires wheelchair access',
  },
];

const SingleReservation: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Find the reservation with the given ID
  const reservation = reservations.find((res) => res._id === id);

  if (!reservation) {
    return <div>Reservation not found</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Reservation Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Guest: {reservation.guestName}</h5>
          <p><strong>Booking Date:</strong> {reservation.bookingDate}</p>
          <p><strong>Status:</strong> {reservation.status}</p>
          <p><strong>Room Number:</strong> {reservation.roomNumber}</p>
          <p><strong>Check-In:</strong> {reservation.checkInDate}</p>
          <p><strong>Check-Out:</strong> {reservation.checkOutDate}</p>
          {reservation.specialRequests && (
            <p><strong>Special Requests:</strong> {reservation.specialRequests}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleReservation;
