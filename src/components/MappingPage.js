import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import {
  Button,
  Container,
  Grid,
  Box,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const MappingsPage = () => {
  const [mappings, setMappings] = useState([]);
  const [genres, setGenres] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMapping, setNewMapping] = useState({
    genreID: "",
    movieID: "",
  });
  const [editMapping, setEditMapping] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchMappings();
    fetchGenres();
    fetchMovies();
  }, []);

  const fetchMappings = () => {
    httpClient
      .get("/mappings")
      .then((response) => {
        setMappings(response.data);
      })
      .catch((error) => {
        console.error("Error fetching mappings:", error);
      });
  };

  const fetchGenres = () => {
    httpClient
      .get("/genre")
      .then((response) => {
        setGenres(response.data);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
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
    setNewMapping({
      ...newMapping,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMapping((prevEditMapping) => ({
      ...prevEditMapping,
      [name]: value,
    }));
  };

  const addMapping = () => {
    httpClient
      .post("/mappings", newMapping)
      .then(() => {
        fetchMappings();
        setNewMapping({
          genreID: "",
          movieID: "",
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding mapping:", error);
      });
  };

  const updateMapping = (mappingID) => {
    httpClient
      .put(`/mappings/${mappingID}`, editMapping)
      .then(() => {
        fetchMappings();
        setEditMapping(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating mapping:", error);
      });
  };

  const deleteMapping = (mappingID) => {
    httpClient
      .delete(`/mappings/${mappingID}`)
      .then(() => {
        fetchMappings();
      })
      .catch((error) => {
        console.error("Error deleting mapping:", error);
      });
  };

  const columns = [
    { field: "mappingID", headerName: "Mapping ID", width: 150 },
    { field: "genreID", headerName: "Genre ID", width: 150 },
    { field: "movieID", headerName: "Movie ID", width: 150 },
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
              setEditMapping(params.row);
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
            onClick={() => deleteMapping(params.row.mappingID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>Mappings</h1>
      <Button
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)}
      >
        {isAddFormVisible ? "Cancel" : "Add New Mapping"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          <h2>Add New Mapping</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select
                  value={newMapping.genreID}
                  onChange={handleInputChange}
                  name="genreID"
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.genreID} value={genre.genreID}>
                      {genre.genreName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  value={newMapping.movieID}
                  onChange={handleInputChange}
                  name="movieID"
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.movieID} value={movie.movieID}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addMapping}>
                Add Mapping
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={mappings}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.mappingID}
        />
      </Box>
      {isEditFormVisible && editMapping && (
        <Box my={2}>
          <h2>Edit Mapping</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Genre</InputLabel>
                <Select
                  value={editMapping.genreID}
                  onChange={handleEditChange}
                  name="genreID"
                >
                  {genres.map((genre) => (
                    <MenuItem key={genre.genreID} value={genre.genreID}>
                      {genre.genreName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  value={editMapping.movieID}
                  onChange={handleEditChange}
                  name="movieID"
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.movieID} value={movie.movieID}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => updateMapping(editMapping.mappingID)}
              >
                Update Mapping
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditMapping(null);
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

export default MappingsPage;
