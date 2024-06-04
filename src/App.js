import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Mapping from "./pages/MappingPage";
import Movies from "./components/Movies";
import Rentals from "./components/Rentals";
import Genres from "./components/Genre";
import CustomersPage from "./components/Customers";
import People from "./components/People";


const App = () => {
  return (

    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/customers">Customers</Link>
            </li>
            <li>
              <Link to="/movies">Movies</Link>
            </li>
            <li>
              <Link to="/rentals">Rentals</Link>
            </li>
            <li>
              <Link to="/people">People</Link>
            </li>
            <li>
              <Link to="/genres">Genres</Link>
            </li>
            <li>
              <Link to="/mapping">Mapping</Link>
            </li>
          </ul>
        </nav>
        <Movies />
        <Routes>
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/people" element={<People />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/mapping" element={<Mapping />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
