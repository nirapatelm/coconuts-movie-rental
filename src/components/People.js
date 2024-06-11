import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Container, Grid, TextField, Box } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const People = () => {
  // State variables
  const [people, setPeople] = useState([]);
  const [newPerson, setNewPerson] = useState({ firstName: "", lastName: "" });
  const [editPerson, setEditPerson] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  // Fetch people on component mount
  useEffect(() => {
    fetchPeople();
  }, []);

  // Fetch people from server
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

  // Handle input change in add form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPerson({
      ...newPerson,
      [name]: value,
    });
  };

  // Handle input change in edit form
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditPerson((prevEditPerson) => ({
      ...prevEditPerson,
      [name]: value,
    }));
  };

  // Add a new person
  const addPerson = () => {
    httpClient
      .post("/people", newPerson)
      .then(() => {
        fetchPeople(); // Refresh people after adding
        setNewPerson({ firstName: "", lastName: "" });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding person:", error);
      });
  };

  // Update person details
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

  // Delete person
  const deletePerson = (nameID) => {
    httpClient
      .delete(`/people/${nameID}`)
      .then(() => {
        fetchPeople(); // Refresh people after delete
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  // Columns configuration for DataGrid
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
          {/* Edit button */}
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
          {/* Delete button */}
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

// Citation for the following function:
// Date: June 2024
// Original code using components from 
// Material-UI (June 2024) Material-UI (v^5.0.0) [Library]. Retrieved from https://mui.com/
  return (
    <Container>
      <h1>People</h1>
      <p>This page displays a list of people and allows adding, editing, and deleting people. People can be directors or actors/actresses.</p>
      {/* Toggle Add New Person form */}
      <Button variant="contained" onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Person"}
      </Button>
      {isAddFormVisible && (
        <Box my={2}>
          {/* Add New Person Form */}
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
              {/* Add Person button */}
              <Button variant="contained" onClick={addPerson}>
                Add Person
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Box my={2} style={{ height: 600, width: '100%' }}>
        {/* DataGrid to display people */}
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
          {/* Edit Person Form */}
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
              {/* Update Person and Cancel buttons */}
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
