import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const Genre = () => {
  const [genres, setGenres] = useState([]);
  const [newGenre, setNewGenre] = useState({ genreName: "" });
  const [editGenre, setEditGenre] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchGenres();
  }, []);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGenre({
      ...newGenre,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGenre((prevEditGenre) => ({
      ...prevEditGenre,
      [name]: value,
    }));
  };

  const addGenre = () => {
    httpClient
      .post("/genre", newGenre)
      .then(() => {
        fetchGenres();
        setNewGenre({ genreName: "" });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding genre:", error);
      });
  };

  const updateGenre = (genreID) => {
    httpClient
      .put(`/genre/${genreID}`, editGenre)
      .then(() => {
        fetchGenres();
        setEditGenre(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating genre:", error);
      });
  };

  const deleteGenre = (genreID) => {
    httpClient
      .delete(`/genre/${genreID}`)
      .then(() => {
        fetchGenres();
      })
      .catch((error) => {
        console.error("Error deleting genre:", error);
      });
  };

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
              setEditGenre(params.row);
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
            onClick={() => deleteGenre(params.row.genreID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>Genres</h1>
      <Button
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)}
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
                onChange={handleInputChange}
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
          getRowId={(row) => row.genreID}
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
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => updateGenre(editGenre.genreID)}
              >
                Update Genre
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditGenre(null);
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

export default Genre;
