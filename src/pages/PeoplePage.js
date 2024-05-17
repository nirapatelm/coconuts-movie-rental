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

const PeoplePage = () => {
  // Mock people data
  const people = [
    { nameID: 1, firstName: 'John', lastName: 'Doe' },
    { nameID: 2, firstName: 'Jane', lastName: 'Smith' }
    // Add more people data as needed
  ];

  return (
    <div>
      <h1>People</h1>
      <TableContainer component={Paper}>
        <Table aria-label="people table">
          <TableHead>
            <TableRow>
              <TableCell>Name ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map((person) => (
              <TableRow key={person.nameID}>
                <TableCell>{person.nameID}</TableCell>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/create-people"><button>Add People</button></Link>
      <Link to="/create-people"><button>Update People</button></Link>
      <Link to="/"><button>Delete People</button></Link>
    </div>
  );
};

export default PeoplePage;