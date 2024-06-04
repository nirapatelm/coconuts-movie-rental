import React, { useEffect, useState } from "react";
import axios from "axios";
import httpClient from "../utils/axiosInterceptor";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [editCustomer, setEditCustomer] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("http://classwork.engr.oregonstate.edu:5273/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({
      ...newCustomer,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditCustomer((prevEditCustomer) => ({
      ...prevEditCustomer,
      [name]: value,
    }));
  };

  const addCustomer = () => {
    httpClient
      .post("/customers", newCustomer)
      .then(() => {
        fetchCustomers();
        setNewCustomer({
          customerID: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: ""
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding customer:", error);
      });
  };

  const updateCustomer = (customerID) => {
    httpClient
      .put(`/customers/${customerID}`, editCustomer)
      .then(() => {
        fetchCustomers();
        setEditCustomer(null);
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

  return (
    <div>
      <h1>Customers</h1>
      <button onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Customer"}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Customer</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={newCustomer.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={newCustomer.lastName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newCustomer.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={newCustomer.phone}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={newCustomer.address}
            onChange={handleInputChange}
          />
          <button onClick={addCustomer}>Add Customer</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.customerID}>
              <td>{customer.customerID}</td>
              <td>{customer.firstName}</td>
              <td>{customer.lastName}</td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td>
                <button
                  onClick={() => {
                    setEditCustomer(customer);
                    setEditFormVisible(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteCustomer(customer.customerID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editCustomer && (
        <div>
          <h2>Edit Customer</h2>
          <input
            type="text"
            name="customerID"
            placeholder="Customer ID"
            value={editCustomer.customerID}
            onChange={handleEditChange}
            disabled
          />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={editCustomer.firstName}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={editCustomer.lastName}
            onChange={handleEditChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={editCustomer.email}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={editCustomer.phone}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={editCustomer.address}
            onChange={handleEditChange}
          />
          <button onClick={() => updateCustomer(editCustomer.customerID)}>
            Update Customer
          </button>
          <button
            onClick={() => {
              setEditCustomer(null);
              setEditFormVisible(false);
            }}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Customers;
