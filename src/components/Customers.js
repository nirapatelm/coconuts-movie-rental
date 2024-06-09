import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Grid, TextField, Container } from "@mui/material";
import httpClient from "../utils/axiosInterceptor";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customerForm, setCustomerForm] = useState({
    customerID: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    httpClient
      .get("/customers")
      .then((response) => {
        setCustomers(response.data);
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
    });
  };

  const addCustomer = () => {
    httpClient
      .post("/customers", customerForm)
      .then(() => {
        fetchCustomers();
        resetForm();
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
      });
  };

  const updateCustomer = (customerID) => {
    httpClient
      .put(`/customers/${customerID}`, customerForm)
      .then(() => {
        fetchCustomers();
        resetForm();
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating customer:", error);
      });
  };

  const deleteCustomer = (customerID) => {
    httpClient
      .delete(`/customers/${customerID}`)
      .then(() => {
        fetchCustomers();
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
    });
  };

  const openEditForm = (customer) => {
    setCustomerForm(customer);
    setEditFormVisible(true);
    setAddFormVisible(false);
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
            onClick={() => openEditForm(params.row)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => deleteCustomer(params.row.customerID)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <Container>
      <h1>Customers</h1>
      <Button
        sx={{
          margin: "20px",
        }}
        variant="contained"
        onClick={() => setAddFormVisible(!isAddFormVisible)}
      >
        {isAddFormVisible ? "Cancel" : "Add New Customer"}
      </Button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Customer</h2>
          <CustomerForm
            customer={customerForm}
            handleInputChange={handleInputChange}
            handleSubmit={addCustomer}
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
            handleSubmit={() => updateCustomer(customerForm.customerID)}
          />
          <Button
            variant="contained"
            onClick={() => {
              resetForm();
              setEditFormVisible(false);
            }}
          >
            Cancel
          </Button>
        </div>
      )}
    </Container>
  );
};

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
