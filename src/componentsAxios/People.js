import React, { useEffect, useState } from "react";
import axios from "axios";

const People = () => {
  const [people, setPeople] = useState([]);
  const [newPeople, setNewPeople] = useState({ firstName: "", lastName: "" });
  const [editPeople, setEditPeople] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = () => {
    axios
      .get("http://classwork.engr.oregonstate.edu:5273/api/people")
      .then((response) => {
        setPeople(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewPeople({
      ...newPeople,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditPeople((prevEditPeople) => ({
      ...prevEditPeople,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addPeople = () => {
    axios
      .post("http://classwork.engr.oregonstate.edu:5273/api/people", newPeople)
      .then(() => {
        fetchPeople();
        setNewPeople({ firstName: "", lastName: "" });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding people:", error);
      });
  };

  const updatePeople = (nameID) => {
    console.log(`Updating person with ID: ${nameID}`); // Debugging line
    console.log(`People data: `, editPeople); // Debugging line
    axios
      .put(
        `http://classwork.engr.oregonstate.edu:5273/api/people/${nameID}`,
        editPeople
      )
      .then(() => {
        fetchPeople(); // Refresh people after update
        setEditPeople(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating person:", error);
      });
  };

  const deletePeople = (nameID) => {
    axios
      .delete(`http://classwork.engr.oregonstate.edu:5273/api/people/${nameID}`)
      .then(() => {
        fetchPeople();
      })
      .catch((error) => {
        console.error("Error deleting person:", error);
      });
  };

  return (
    <div>
      <h1>People</h1>
      <button onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add new People"}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New People</h2>
          <input
            type="text"
            name="name"
            placeholder="First name"
            value={newPeople.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Last name"
            value={newPeople.lastName}
            onChange={handleInputChange}
          />
          <button onClick={addPeople}>Add People</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name ID</th>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          {people.map((people) => (
            <tr key={people.nameID}>
              <td>{people.nameID}</td>
              <td>{people.firstName}</td>
              <td>{people.lastName}</td>
              <td>
                <button
                  onClick={() => {
                    setEditPeople(people);
                    setEditFormVisible(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deletePeople(people.nameID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editPeople && (
        <div>
          <h2>Edit People</h2>
          <input
            type="text"
            name="name"
            placeholder="First name"
            value={newPeople.firstName}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="name"
            placeholder="Last name"
            value={newPeople.lastName}
            onChange={handleEditChange}
          />
          <button onClick={() => updatePeople(editPeople.nameID)}>
            Update People
          </button>
          <button
            onClick={() => {
              setEditPeople(null);
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

export default People;
