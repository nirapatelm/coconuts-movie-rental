import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({ title: '', releaseYear: '', rating: '', availability: false });
  const [editMovie, setEditMovie] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = () => {
    axios.get('http://classwork.engr.oregonstate.edu:5273/api/movies')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditMovie(prevEditMovie => ({
      ...prevEditMovie,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const addMovie = () => {
    axios.post('http://classwork.engr.oregonstate.edu:5273/api/movies', newMovie)
      .then(() => {
        fetchMovies();
        setNewMovie({ title: '', releaseYear: '', rating: '', availability: false });
        setAddFormVisible(false);
      })
      .catch(error => {
        console.error('Error adding movie:', error);
      });
  };

  const updateMovie = (movieID) => {
    console.log(`Updating movie with ID: ${movieID}`); // Debugging line
    console.log(`Movie data: `, editMovie); // Debugging line
    axios.put(`http://classwork.engr.oregonstate.edu:5273/api/movies/${movieID}`, editMovie)
      .then(() => {
        fetchMovies(); // Refresh movies after update
        setEditMovie(null);
        setEditFormVisible(false);
      })
      .catch(error => {
        console.error('Error updating movie:', error);
      });
  };

  const deleteMovie = (movieID) => {
    axios.delete(`http://classwork.engr.oregonstate.edu:5273/api/movies/${movieID}`)
      .then(() => {
        fetchMovies();
      })
      .catch(error => {
        console.error('Error deleting movie:', error);
      });
  };

  return (
    <div>
      <h1>Movies</h1>
      <button onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? 'Cancel' : 'Add New Movie'}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Movie</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={newMovie.title}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={newMovie.releaseYear}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={newMovie.rating}
            onChange={handleInputChange}
          />
          <label>
            Availability:
            <input
              type="checkbox"
              name="availability"
              checked={newMovie.availability}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={addMovie}>Add Movie</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Movie ID</th>
            <th>Title</th>
            <th>Release Year</th>
            <th>Rating</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie.movieID}>
              <td>{movie.movieID}</td>
              <td>{movie.title}</td>
              <td>{movie.releaseYear}</td>
              <td>{movie.rating}</td>
              <td>{movie.availability ? 'Available' : 'Not Available'}</td>
              <td>
                <button onClick={() => { setEditMovie(movie); setEditFormVisible(true); }}>Edit</button>
                <button onClick={() => deleteMovie(movie.movieID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editMovie && (
        <div>
          <h2>Edit Movie</h2>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={editMovie.title}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="releaseYear"
            placeholder="Release Year"
            value={editMovie.releaseYear}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="rating"
            placeholder="Rating"
            value={editMovie.rating}
            onChange={handleEditChange}
          />
          <label>
            Availability:
            <input
              type="checkbox"
              name="availability"
              checked={editMovie.availability}
              onChange={handleEditChange}
            />
          </label>
          <button onClick={() => updateMovie(editMovie.movieID)}>Update Movie</button>
          <button onClick={() => { setEditMovie(null); setEditFormVisible(false); }}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default Movies;
