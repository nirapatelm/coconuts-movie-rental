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

const GenresPage = () => {
  // Mock genre data
  const genres = [
    { genreID: 1, genreName: 'Action' },
    { genreID: 2, genreName: 'Comedy' }
    // Add more genre data as needed
  ];

  return (
    <div>
      <h1>Genres</h1>
      <TableContainer component={Paper}>
        <Table aria-label="genres table">
          <TableHead>
            <TableRow>
              <TableCell>Genre ID</TableCell>
              <TableCell>Genre Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {genres.map((genre) => (
              <TableRow key={genre.genreID}>
                <TableCell>{genre.genreID}</TableCell>
                <TableCell>{genre.genreName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/create-genre"><button>Add Genre</button></Link>
      <Link to="/create-genre"><button>Update Genre</button></Link>
      <Link to="/"><button>Delete Genre</button></Link>
    </div>
  );
};

export default GenresPage;