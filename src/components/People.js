import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const People = () => {
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({ firstName: "", lastName: "" });
  const [editPerson, setEditPerson] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    httpClient
      .get("/people")
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPerson((prevEditPerson) => ({
      ...prevEditPerson,
      [name]: value,
    }));
  };

  const addPerson = () => {
    httpClient
      .post("/people", newPerson)
      .then(() => {
        fetchPeople();
        setNewPerson({ firstName: "", lastName: "" });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  const updatePerson = (nameID) => {
    httpClient
      .put(`/people/${nameID}`, editPerson)
      .then(() => {
        fetchPeople(); // Refresh people after update
        setEditPerson(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const deletePerson = (nameID) => {
    httpClient
      .delete(`/people/${nameID}`)
      .then(() => {
        fetchPeople();
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  const columns = [
    { field: 'nameID', headerName: 'Name ID', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'lastName', headerName: 'Last Name', width: 150 },
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
              setEditPerson(params.row);
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
            onClick={() => deletePerson(params.row.nameID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>People</h1>
      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Person"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          <h2>Add New Person</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={newPerson.firstName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={newPerson.lastName}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={addPerson}>
                Add Person
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={people}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.nameID}
        />
      </Box>
      {isEditFormVisible && editPerson && (
        <Box my={2}>
          <h2>Edit Person</h2>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={editPerson.firstName}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={editPerson.lastName}
                onChange={handleEditChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" onClick={() => updatePerson(editPerson.nameID)}>
                Update Person
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => {
                  setEditPerson(null);
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

export default People;
