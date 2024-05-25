import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import MoviesPage from './pages/MoviesPage';
import Rentals from './pages/RentalsPage';
import People from './pages/PeoplePage';
import Genres from './pages/GenresPage';
import Mapping from './pages/MappingPage';
import CreateCustomerForm from './pages/CreateCustomerForm';
import CreateMovieForm from './pages/CreateMovieForm';
import CreateRentalForm from './pages/CreateRentalForm';
import CreatePeopleForm from './pages/CreatePeopleForm';
import CreateGenreForm from './pages/CreateGenreForm';
import CreateMappingForm from './pages/CreateMappingForm'; 
import UpdateCustomerForm from './pages/UpdateCustomerForm';
import UpdateMovieForm from './pages/UpdateMovieForm';
import UpdateRentalForm from './pages/UpdateRentalForm';
import UpdatePeopleForm from './pages/UpdatePeopleForm';
import UpdateGenreForm from './pages/UpdateGenreForm';
import UpdateMappingForm from './pages/UpdateMappingForm'; 
import Movies from './componentsAxios/Movies';




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
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/rentals" element={<Rentals />} />
          <Route path="/people" element={<People />} />
          <Route path="/genres" element={<Genres />} />
          <Route path="/mapping" element={<Mapping />} />
          <Route path="/create-customer" element={<CreateCustomerForm />} />
          <Route path="/create-movie" element={<CreateMovieForm />} />
          <Route path="/create-rental" element={<CreateRentalForm />} />
          <Route path="/create-people" element={<CreatePeopleForm />} />
          <Route path="/create-genre" element={<CreateGenreForm />} />
          <Route path="/create-mapping" element={<CreateMappingForm />} />
          <Route path="/update-customer" element={<UpdateCustomerForm />} />
          <Route path="/update-movie" element={<UpdateMovieForm />} />
          <Route path="/update-rental" element={<UpdateRentalForm />} />
          <Route path="/update-people" element={<UpdatePeopleForm />} />
          <Route path="/update-genre" element={<UpdateGenreForm />} />
          <Route path="/update-mapping" element={<UpdateMappingForm />} />
        </Routes>

      </div>
    </Router>
  );
};

export default App;
