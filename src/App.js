import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import MoviesPage from './pages/MoviesPage';
import Rentals from './pages/RentalsPage';
import People from './pages/PeoplePage';
import Genres from './pages/GenresPage';

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
          </ul>
        </nav>

        <Routes>
          <Route path="/customers" element={<CustomersPage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/people" element={<People />} />
          <Route path="/genres" element={<Genres />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
