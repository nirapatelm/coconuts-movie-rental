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

const RentalsPage = () => {
  // Mock rentals data
  const rentals = [
    { rentalID: 1, customerID: 1, movieID: 1, rentalDate: '2024-05-09', returnDate: '2024-05-16', totalAmount: 10.00 },
    { rentalID: 2, customerID: 2, movieID: 2, rentalDate: '2024-05-10', returnDate: '2024-05-17', totalAmount: 12.00 }
    // Add more rental data as needed
  ];

  return (
    <div>
      <h1>Rentals</h1>
      <TableContainer component={Paper}>
        <Table aria-label="rentals table">
          <TableHead>
            <TableRow>
              <TableCell>Rental ID</TableCell>
              <TableCell>Customer ID</TableCell>
              <TableCell>Movie ID</TableCell>
              <TableCell>Rental Date</TableCell>
              <TableCell>Return Date</TableCell>
              <TableCell>Total Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rentals.map((rental) => (
              <TableRow key={rental.rentalID}>
                <TableCell>{rental.rentalID}</TableCell>
                <TableCell>{rental.customerID}</TableCell>
                <TableCell>{rental.movieID}</TableCell>
                <TableCell>{rental.rentalDate}</TableCell>
                <TableCell>{rental.returnDate}</TableCell>
                <TableCell>${rental.totalAmount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/create-rental"><button>Add Rentals</button></Link>
    </div>
  );
};

export default RentalsPage;