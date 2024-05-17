import React, {useState } from "react";
import "../index.css";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";


const CustomersPage = () => {
  const customers = [
    {
      customerID: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "123-456-7890",
      address: "123 Main St",
    },
    {
      customerID: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "456-789-0123",
      address: "456 Elm St",
    },
  ];
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCustomers = customers.filter(customer => {
    const fullName = `${customer.firstName} ${customer.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.phone.includes(searchTerm) ||
      customer.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });


  return (
    <div>
      <h1>Customers</h1>
      <input
        type="text"
        placeholder="Search customers..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Address</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.customerID}>
                <TableCell>{customer.customerID}</TableCell>
                <TableCell>{customer.firstName}</TableCell>
                <TableCell>{customer.lastName}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.address}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Link to="/create-customer">
        <button>Add Customer</button>
      </Link>
      <Link to="/update-customer">
        <button>Update Customer</button>
      </Link>
        <button>Delete Customer</button>
    </div>
  );
};

export default CustomersPage;
