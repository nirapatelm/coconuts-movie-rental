import React, { useEffect, useState } from "react";
import axios from "axios";

const Rentals = () => {
  const [rentals, setRentals] = useState([]);
  const [newRental, setNewRental] = useState({
    customerID: "",
    movieID: "",
    rentalDate: "",
    returnDate: "",
    totalAmount: "",
  });
  const [editRental, setEditRental] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = () => {
    axios
      .get("http://classwork.engr.oregonstate.edu:5273/api/rentals")
      .then((response) => {
        setRentals(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRental({
      ...newRental,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditRental((prevEditRental) => ({
      ...prevEditRental,
      [name]: value,
    }));
  };

  const addRental = () => {
    axios
      .post("http://classwork.engr.oregonstate.edu:5273/api/rentals", newRental)
      .then(() => {
        fetchRentals();
        setNewRental({
          customerID: "",
          movieID: "",
          rentalDate: "",
          returnDate: "",
          totalAmount: "",
        });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding rental:", error);
      });
  };

  const updateRental = (rentalID) => {
    axios
      .put(
        `http://classwork.engr.oregonstate.edu:5273/api/rentals/${rentalID}`,
        editRental
      )
      .then(() => {
        fetchRentals();
        setEditRental(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating rental:", error);
      });
  };

  const deleteRental = (rentalID) => {
    axios
      .delete(
        `http://classwork.engr.oregonstate.edu:5273/api/rentals/${rentalID}`
      )
      .then(() => {
        fetchRentals();
      })
      .catch((error) => {
        console.error("Error deleting rental:", error);
      });
  };

  return (
    <div>
      <h1>Rentals</h1>
      <button onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add New Rental"}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Rental</h2>
          <input
            type="text"
            name="customerID"
            placeholder="Customer ID"
            value={newRental.customerID}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="movieID"
            placeholder="Movie ID"
            value={newRental.movieID}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="rentalDate"
            placeholder="Rental Date"
            value={newRental.rentalDate}
            onChange={handleInputChange}
          />
          <input
            type="datetime-local"
            name="returnDate"
            placeholder="Return Date"
            value={newRental.returnDate}
            onChange={handleInputChange}
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={newRental.totalAmount}
            onChange={handleInputChange}
          />
          <button onClick={addRental}>Add Rental</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Rental ID</th>
            <th>Customer ID</th>
            <th>Movie ID</th>
            <th>Rental Date</th>
            <th>Return Date</th>
            <th>Total Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rentals.map((rental) => (
            <tr key={rental.rentalID}>
              <td>{rental.rentalID}</td>
              <td>{rental.customerID}</td>
              <td>{rental.movieID}</td>
              <td>{new Date(rental.rentalDate).toLocaleString()}</td>
              <td>
                {rental.returnDate
                  ? new Date(rental.returnDate).toLocaleString()
                  : "Not Returned"}
              </td>
              <td>{rental.totalAmount}</td>
              <td>
                <button
                  onClick={() => {
                    setEditRental(rental);
                    setEditFormVisible(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteRental(rental.rentalID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editRental && (
        <div>
          <h2>Edit Rental</h2>
          <input
            type="text"
            name="customerID"
            placeholder="Customer ID"
            value={editRental.customerID}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="movieID"
            placeholder="Movie ID"
            value={editRental.movieID}
            onChange={handleEditChange}
          />
          <input
            type="datetime-local"
            name="rentalDate"
            placeholder="Rental Date"
            value={editRental.rentalDate}
            onChange={handleEditChange}
          />
          <input
            type="datetime-local"
            name="returnDate"
            placeholder="Return Date"
            value={editRental.returnDate}
            onChange={handleEditChange}
          />
          <input
            type="number"
            name="totalAmount"
            placeholder="Total Amount"
            value={editRental.totalAmount}
            onChange={handleEditChange}
          />
          <button onClick={() => updateRental(editRental.rentalID)}>
            Update Rental
          </button>
          <button
            onClick={() => {
              setEditRental(null);
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

export default Rentals;
