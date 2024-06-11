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

const MoviePeople = () => {
  const [moviePeople, setMoviePeople] = useState([]);
  const [people, setPeople] = useState([]);
  const [movies, setMovies] = useState([]);
  const [newMoviePeople, setNewMoviePeople] = useState({
    movieID: "",
    nameID: "",
  });
  const [editMoviePeople, setEditMoviePeople] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchMoviePeople();
    fetchPeople();
    fetchMovies();
  }, []);

  const fetchMoviePeople = () => {
    httpClient
      .get("/moviepeople")
      .then((response) => {
        setMoviePeople(response.data);
      })
      .catch((error) => {
        console.error("Error fetching movie people:", error);
      });
  };

  const fetchPeople = () => {
    httpClient
      .get("/people")
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error("Error fetching names:", error);
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
    console.log(people);
    setNewMoviePeople({
      ...newMoviePeople,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditMoviePeople((prevEditMoviePeople) => ({
      ...prevEditMoviePeople,
      [name]: value,
    }));
  };

  const addMoviePeople = () => {
    httpClient
      .post("/moviepeople", newMoviePeople)
      .then(() => {
        fetchMoviePeople();
        setNewMoviePeople({
          movieID: "",
          nameID: "",
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding movie people:", error);
      });
  };

  const updateMoviePeople = (moviePeopleID) => {
    httpClient
      .put(`/moviepeople/${moviePeopleID}`, editMoviePeople)
      .then(() => {
        fetchMoviePeople();
        setEditMoviePeople(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating movie people:", error);
      });
  };

  const deleteMoviePeople = (moviePeopleID) => {
    httpClient
      .delete(`/moviepeople/${moviePeopleID}`)
      .then(() => {
        fetchMoviePeople();
      })
      .catch((error) => {
        console.error("Error deleting movie people:", error);
      });
  };

  const columns = [
    { field: "moviePeopleID", headerName: "Movie People ID", width: 150 },
    { field: "movieID", headerName: "Movie ID", width: 150 },
    { field: "nameID", headerName: "Name ID", width: 150 },
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
              setEditMoviePeople(params.row);
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
            onClick={() => deleteMoviePeople(params.row.moviePeopleID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>Movie People</h1>
      <p>This page displays a list of mappings for Movies and People and allows adding, editing, and deleting. People can be directors or actors/actresses.</p>
      <Button
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)}
      >
        {isAddFormVisible ? "Cancel" : "Add New MoviePeople"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          <h2>Add New Movie People</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  value={newMoviePeople.movieID}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <Select
                  value={newMoviePeople.nameID}
                  onChange={handleInputChange}
                  name="nameID"
                >
                  {people.map((people) => (
                    <MenuItem key={people.nameID} value={people.nameID}>
                      {people.firstName + " " + people.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addMoviePeople}>
                Add MoviePeople
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={moviePeople}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.moviePeopleID}
        />
      </Box>
      {isEditFormVisible && editMoviePeople && (
        <Box my={2}>
          <h2>Edit MoviePeople</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Movie</InputLabel>
                <Select
                  value={editMoviePeople.movieID}
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
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Name</InputLabel>
                <Select
                  value={editMoviePeople.nameID}
                  onChange={handleEditChange}
                  name="nameID"
                >
                  {people.map((people) => (
                    <MenuItem key={people.nameID} value={people.nameID}>
                      {people.firstName + " " + people.lastName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => updateMoviePeople(editMoviePeople.moviePeopleID)}
              >
                Update MoviePeople
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditMoviePeople(null);
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

export default MoviePeople;
