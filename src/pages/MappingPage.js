import React from 'react';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom';

const MappingsPage = () => {
  // Mock mapping data
  const mappings = [
    { mappingID: 1, genreID: 1, movieID: 1 },
    { mappingID: 2, genreID: 2, movieID: 2 }
    // Add more mapping data as needed
  ];

  return (
    <div>
      <h1>Mappings</h1>
      <TableContainer component={Paper}>
        <Table aria-label="mappings table">
          <TableHead>
            <TableRow>
              <TableCell>Mapping ID</TableCell>
              <TableCell>Genre ID</TableCell>
              <TableCell>Movie ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mappings.map((mapping) => (
              <TableRow key={mapping.mappingID}>
                <TableCell>{mapping.mappingID}</TableCell>
                <TableCell>{mapping.genreID}</TableCell>
                <TableCell>{mapping.movieID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MappingsPage;
