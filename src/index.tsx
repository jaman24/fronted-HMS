import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Navbar from './components/Navbar';
import CreateItem from './components/CreateItem';
import CreateItemType from './components/CreateNewItemType';
import ItemList from './components/ItemList';
import SingleItem from './components/SingleItem';
import ReservationList from './components/ReservationList';
import SingleReservation from './components/SingleReservation';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navbar/>
  },
  {
    path : "/registration",
    element : <Registration/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/create_item_type",
    element: <CreateItemType />
  },
  {
    path: "/create_item",
    element:<CreateItem/>
  },
  {
    path:"/item/:itemId",
    element: <SingleItem />
  },
  {
    path:"/items",
    element: <ItemList />
  },
  {
    path:"/reservation/:id",
    element:<SingleReservation />
  },
  {
    path: "/reservations",
    element:<ReservationList />
  }
])

root.render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
