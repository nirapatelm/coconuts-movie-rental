import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box, Checkbox, FormControlLabel } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const Movies = () => {
  // State variables
  const [movies, setMovies] = useState([]);
  const [newMovie, setNewMovie] = useState({
    title: "",
    releaseYear: "",
    rating: "",
    availability: false,
  });
  const [editMovie, setEditMovie] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  // Fetch movies from server
  const fetchMovies = () => {
    httpClient
      .get("/movies")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Handle input change in add form
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewMovie({
      ...newMovie,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditMovie((prevEditMovie) => ({
      ...prevEditMovie,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Add a new movie
  const addMovie = () => {
    httpClient
      .post("/movies", newMovie)
      .then(() => {
        fetchMovies();
        setNewMovie({
          title: "",
          releaseYear: "",
          rating: "",
          availability: false,
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding movie:", error);
      });
  };

  // Update movie details
  const updateMovie = (movieID) => {
    httpClient
      .put(`/movies/${movieID}`, editMovie)
      .then(() => {
        fetchMovies();
        setEditMovie(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating movie:", error);
      });
  };

  // Delete movie
  const deleteMovie = (movieID) => {
    httpClient
      .delete(`/movies/${movieID}`)
      .then(() => {
        fetchMovies();
      })
      .catch((error) => {
        console.error("Error deleting movie:", error);
      });
  };

  // Columns configuration for DataGrid
  const columns = [
    { field: 'movieID', headerName: 'Movie ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'releaseYear', headerName: 'Release Year', width: 150 },
    { field: 'rating', headerName: 'Rating', width: 150 },
    { field: 'availability', headerName: 'Availability', width: 150, renderCell: (params) => params.value ? "Available" : "Not Available" },
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
              setEditMovie(params.row);
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
            onClick={() => deleteMovie(params.row.movieID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

// Citation for the following function:
// Date: June 2024
// Original code using components from 
// Material-UI (June 2024) Material-UI (v^5.0.0) [Library]. Retrieved from https://mui.com/
  return (
    <Container>
      <h1>Movies</h1>
      <p>This page displays a list of movies and allows adding, editing, and deleting movies.</p>
      {/* Toggle Add New Movie form */}
      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Movie"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          {/* Add New Movie Form */}
          <h2>Add New Movie</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={newMovie.title}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Release Year"
                name="releaseYear"
                value={newMovie.releaseYear}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={newMovie.rating}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={newMovie.availability}
                    onChange={handleInputChange}
                  />
                }
                label="Availability"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addMovie}>
                Add Movie
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: '100%' }}>
        {/* DataGrid to display movies */}
        <DataGrid
          rows={movies}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.movieID}
        />
      </Box>
      {isEditFormVisible && editMovie && (
        <Box my={2}>
          {/* Edit Movie Form */}
          <h2>Edit Movie</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editMovie.title}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="number"
                label="Release Year"
                name="releaseYear"
                value={editMovie.releaseYear}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Rating"
                name="rating"
                value={editMovie.rating}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    name="availability"
                    checked={editMovie.availability}
                    onChange={handleEditChange}
                  />
                }
                label="Availability"
              />
            </Grid>
            <Grid item xs={12}>
              {/* Update Movie and Cancel buttons */}
              <Button variant="contained" onClick={() => updateMovie(editMovie.movieID)}>
                Update Movie
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditMovie(null);
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

export default Movies;
