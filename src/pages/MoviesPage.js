import React from 'react';
import '../index.css';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const MoviesPage = () => {
    const movies = [
        { movieID: 1, title: 'Movie 1', releaseYear: 2020, director: 'Director 1', rating: 'PG-13', availability: true },
        { movieID: 2, title: 'Movie 2', releaseYear: 2019, director: 'Director 2', rating: 'R', availability: false }
        // Add more movie data as needed
      ];
    
      return (
        <div>
          <h1>Movies</h1>
          <TableContainer component={Paper}>
            <Table aria-label="movies table">
              <TableHead>
                <TableRow>
                  <TableCell>Movie ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell>Release Year</TableCell>
                  <TableCell>Director</TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Availability</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {movies.map((movie) => (
                  <TableRow key={movie.movieID}>
                    <TableCell>{movie.movieID}</TableCell>
                    <TableCell>{movie.title}</TableCell>
                    <TableCell>{movie.releaseYear}</TableCell>
                    <TableCell>{movie.director}</TableCell>
                    <TableCell>{movie.rating}</TableCell>
                    <TableCell>{movie.availability ? 'Available' : 'Not Available'}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Link to="/create-customer"><button>Add Customer</button></Link>
        </div>
  );
};

export default MoviesPage;
