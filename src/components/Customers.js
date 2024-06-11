import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, TextField, Container } from "@mui/material";
import httpClient from "../utils/axiosInterceptor"; // Custom axios instance for making HTTP requests

const Customers = () => {
  const [customers, setCustomers] = useState([]); // State to store list of customers
  const [customerForm, setCustomerForm] = useState({ // State to manage form input values
    customerID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isAddFormVisible, setAddFormVisible] = useState(false); // State to toggle add form visibility
  const [isEditFormVisible, setEditFormVisible] = useState(false); // State to toggle edit form visibility

  useEffect(() => {
    fetchCustomers(); // Fetch customers when the component mounts
  }, []);

  const fetchCustomers = () => {
    httpClient
      .get("/customers")
      .then((response) => {
        setCustomers(response.data); // Set fetched customers data to state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm({
      ...customerForm,
      [name]: value,
    }); // Update form state on input change
  };

  const addCustomer = () => {
    httpClient
      .post("/customers", customerForm)
      .then(() => {
        fetchCustomers(); // Refresh customer list after adding new customer
        resetForm(); // Reset form fields
        setAddFormVisible(false); // Hide add form
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
      });
  };

  const updateCustomer = (customerID) => {
    httpClient
      .put(`/customers/${customerID}`, customerForm)
      .then(() => {
        fetchCustomers(); // Refresh customer list after updating customer
        resetForm(); // Reset form fields
        setEditFormVisible(false); // Hide edit form
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const deleteCustomer = (customerID) => {
    httpClient
      .delete(`/customers/${customerID}`)
      .then(() => {
        fetchCustomers(); // Refresh customer list after deleting customer
      })
      .catch((error) => {
        console.error("Error deleting customer:", error);
      });
  };

  const resetForm = () => {
    setCustomerForm({
      customerID: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
    }); // Reset form fields to initial state
  };

  const openEditForm = (customer) => {
    setCustomerForm(customer); // Populate form with selected customer data
    setEditFormVisible(true); // Show edit form
    setAddFormVisible(false); // Hide add form
  };

  const columns = [
    { field: "customerID", headerName: "Customer ID", width: 150 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "address", headerName: "Address", width: 300 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openEditForm(params.row)} // Open edit form with selected customer data
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCustomer(params.row.customerID)} // Delete selected customer
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
      <h1>Customers</h1>
      <p>This page displays a list of customers and allows adding, editing, and deleting customers.</p>
      <Button
        sx={{
          margin: "20px",
        }}
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)} // Toggle add form visibility
      >
        {isAddFormVisible ? "Cancel" : "Add New Customer"}
      </Button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Customer</h2>
          <CustomerForm
            customer={customerForm}
            handleInputChange={handleInputChange}
            handleSubmit={addCustomer} // Add customer on form submit
          />
        </div>
      )}
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={customers}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.customerID}
        />
      </div>
      {isEditFormVisible && (
        <div>
          <h2>Edit Customer</h2>
          <CustomerForm
            customer={customerForm}
            handleInputChange={handleInputChange}
            handleSubmit={() => updateCustomer(customerForm.customerID)} // Update customer on form submit
          />
          <Button
            variant="contained"
            onClick={() => {
              resetForm();
              setEditFormVisible(false); // Hide edit form on cancel
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </Container>
  );
};

// Reusable customer form component
const CustomerForm = ({ customer, handleInputChange, handleSubmit }) => (
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="First Name"
        name="firstName"
        value={customer.firstName}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Last Name"
        name="lastName"
        value={customer.lastName}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        value={customer.email}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={customer.phone}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        label="Address"
        name="address"
        value={customer.address}
        onChange={handleInputChange}
      />
    </Grid>
    <Grid item xs={12}>
      <Button variant="contained" onClick={handleSubmit}>
        {customer.customerID ? "Update Customer" : "Add Customer"}
      </Button>
    </Grid>
  </Grid>
);

export default Customers;
