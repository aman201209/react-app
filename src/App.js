import logo from './logo.svg';
import './App.css';
import Booking from './Component/Booking';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import BookingTicket from './Component/BookingTicket';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<><BookingTicket/></>,
    },
    {
      path: "/booking",
      element:<><Booking/></>,
    },
  ]);
  return (
    <RouterProvider router={router}>

    </RouterProvider>
  );
}

export default App;
