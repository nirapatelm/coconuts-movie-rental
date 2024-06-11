import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const Genre = () => {
  // State variables to manage genres, new genre data, edit genre data, and form visibility
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ genreName: "" });
  const [editGenre, setEditGenre] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  // Fetch initial data for genres
  useEffect(() => {
    fetchGenres();
  }, []);

  // Fetch all genres from the server
  const fetchGenres = () => {
    httpClient
      .get("/genre")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  // Handle input changes for new genre form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGenre({
      ...newGenre,
      [name]: value,
    });
  };

  // Handle input changes for edit genre form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGenre((prevEditGenre) => ({
      ...prevEditGenre,
      [name]: value,
    }));
  };

  // Add a new genre to the server
  const addGenre = () => {
    httpClient
      .post("/genre", newGenre)
      .then(() => {
        fetchGenres();  // Refresh the genre list
        setNewGenre({ genreName: "" });  // Reset the new genre form
        setAddFormVisible(false);  // Hide the add form
      })
      .catch((error) => {
        console.error("Error adding genre:", error);
      });
  };

  // Update an existing genre on the server
  const updateGenre = (genreID) => {
    httpClient
      .put(`/genre/${genreID}`, editGenre)
      .then(() => {
        fetchGenres();  // Refresh the genre list
        setEditGenre(null);  // Reset the edit genre form
        setEditFormVisible(false);  // Hide the edit form
      })
      .catch((error) => {
        console.error("Error updating genre:", error);
      });
  };

  // Delete a genre from the server
  const deleteGenre = (genreID) => {
    httpClient
      .delete(`/genre/${genreID}`)
      .then(() => {
        fetchGenres();  // Refresh the genre list
      })
      .catch((error) => {
        console.error("Error deleting genre:", error);
      });
  };

  // Define columns for DataGrid
  const columns = [
    { field: "genreID", headerName: "Genre ID", width: 150 },
    { field: "genreName", headerName: "Genre Name", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setEditGenre(params.row);  // Set the current genre data for editing
              setEditFormVisible(true);  // Show the edit form
              setAddFormVisible(false);  // Hide the add form
            }}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteGenre(params.row.genreID)}  // Delete the genre
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
      <h1>Genres</h1>
      <p>This page displays a list of genres and allows adding, editing, and deleting genres.</p>
      <Button
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)}  // Toggle the visibility of the add form
      >
        {isAddFormVisible ? "Cancel" : "Add New Genre"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          <h2>Add New Genre</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre Name"
                name="genreName"
                value={newGenre.genreName}
                onChange={handleInputChange}  // Handle changes to the new genre form
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addGenre}>
                Add Genre
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={genres}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.genreID}  // Use genreID as the unique identifier for each row
        />
      </Box>
      {isEditFormVisible && editGenre && (
        <Box my={2}>
          <h2>Edit Genre</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Genre Name"
                name="genreName"
                value={editGenre.genreName}
                onChange={handleEditChange}  // Handle changes to the edit genre form
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => updateGenre(editGenre.genreID)}  // Update the genre
              >
                Update Genre
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditGenre(null);  // Reset the edit genre form
                  setEditFormVisible(false);  // Hide the edit form
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

export default Genre;
