import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newRental, setNewRental] = useState({
    customerID: "",
    movieID: "",
    rentalDate: "",
    returnDate: "",
    totalAmount: "",
  });
  const [editRental, setEditRental] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchRentals();
    fetchCustomers();
    fetchMovies();
  }, []);

  const fetchRentals = () => {
    httpClient
      .get("/rentals")
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchCustomers = () => {
    httpClient
      .get("/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching customers:", error);
      });
  };

  const fetchMovies = () => {
    httpClient
      .get("/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRental({
      ...newRental,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRental((prevEditRental) => ({
      ...prevEditRental,
      [name]: value,
    }));
  };

  const addRental = () => {
    httpClient
      .post("/rentals", newRental)
      .then(() => {
        fetchRentals();
        setNewRental({
          customerID: "",
          movieID: "",
          rentalDate: "",
          returnDate: "",
          totalAmount: "",
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding rental:", error);
      });
  };

  const updateRental = (rentalID) => {
    httpClient
      .put(`/rentals/${rentalID}`, editRental)
      .then(() => {
        fetchRentals();
        setEditRental(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating rental:", error);
      });
  };

  const deleteRental = (rentalID) => {
    httpClient
      .delete(`/rentals/${rentalID}`)
      .then(() => {
        fetchRentals();
      })
      .catch((error) => {
        console.error("Error deleting rental:", error);
      });
  };

  const columns = [
    { field: 'rentalID', headerName: 'Rental ID', width: 100 },
    { field: 'customerID', headerName: 'Customer ID', width: 150 },
    { field: 'movieID', headerName: 'Movie ID', width: 150 },
    { field: 'rentalDate', headerName: 'Rental Date', width: 200 },
    { field: 'returnDate', headerName: 'Return Date', width: 200 },
    { field: 'totalAmount', headerName: 'Total Amount', width: 150 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditRental(params.row);
              setEditFormVisible(true);
              setAddFormVisible(false);
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteRental(params.row.rentalID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>Rentals</h1>
      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Rental"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          <h2>Add New Rental</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  name="customerID"
                  value={newRental.customerID}
                  onChange={handleInputChange}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.customerID} value={customer.customerID}>
                      {customer.firstName} {customer.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  name="movieID"
                  value={newRental.movieID}
                  onChange={handleInputChange}
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.movieID} value={movie.movieID}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                name="rentalDate"
                label="Rental Date"
                fullWidth
                value={newRental.rentalDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                name="returnDate"
                label="Return Date"
                fullWidth
                value={newRental.returnDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                name="totalAmount"
                label="Total Amount"
                fullWidth
                value={newRental.totalAmount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addRental}>
                Add Rental
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={rentals}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.rentalID}
        />
      </Box>
      {isEditFormVisible && editRental && (
        <Box my={2}>
          <h2>Edit Rental</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Customer</InputLabel>
                <Select
                  name="customerID"
                  value={editRental.customerID}
                  onChange={handleEditChange}
                >
                  {customers.map((customer) => (
                    <MenuItem key={customer.customerID} value={customer.customerID}>
                      {customer.firstName} {customer.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  name="movieID"
                  value={editRental.movieID}
                  onChange={handleEditChange}
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.movieID} value={movie.movieID}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                name="rentalDate"
                label="Rental Date"
                fullWidth
                value={editRental.rentalDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="datetime-local"
                name="returnDate"
                label="Return Date"
                fullWidth
                value={editRental.returnDate}
                onChange={handleEditChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type="number"
                name="totalAmount"
                label="Total Amount"
                fullWidth
                value={editRental.totalAmount}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => updateRental(editRental.rentalID)}>
                Update Rental
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditRental(null);
                  setEditFormVisible(false);
                }}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Rentals;
