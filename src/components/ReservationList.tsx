import React from 'react';
import { Link } from 'react-router-dom';

interface Reservation {
  _id: string;
  guestName: string;
  bookingDate: string;
  status: string;
  roomNumber: string;
  checkInDate: string;
  checkOutDate: string;
}

const reservations: Reservation[] = [
  {
    _id: '1',
    guestName: 'John Doe',
    bookingDate: '2024-10-01',
    status: 'Confirmed',
    roomNumber: '101',
    checkInDate: '2024-10-12',
    checkOutDate: '2024-10-15',
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
  },
];

const ReservationList: React.FC = () => {
  return (
    <div className="container mt-5">
      <h2>All Reservations</h2>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Guest Name</th>
            <th>Booking Date</th>
            <th>Status</th>
            <th>Room Number</th>
            <th>Check-In</th>
            <th>Check-Out</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>
              <td>{reservation.guestName}</td>
              <td>{reservation.bookingDate}</td>
              <td>{reservation.status}</td>
              <td>{reservation.roomNumber}</td>
              <td>{reservation.checkInDate}</td>
              <td>{reservation.checkOutDate}</td>
              <td>
                <Link to={`/reservation/${reservation._id}`} className="btn btn-info">
                  View Details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationList;
