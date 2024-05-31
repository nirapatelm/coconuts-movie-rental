import React, { useEffect, useState } from "react";
import axios from "axios";

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
    axios
      .post("http://classwork.engr.oregonstate.edu:5273/api/people", newPerson)
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
    axios
      .put(
        `http://classwork.engr.oregonstate.edu:5273/api/people/${nameID}`,
        editPerson
      )
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
        {isAddFormVisible ? "Cancel" : "Add new Person"}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Person</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={newPerson.firstName}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={newPerson.lastName}
            onChange={handleInputChange}
          />
          <button onClick={addPerson}>Add Person</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Name ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {people.map((person) => (
            <tr key={person.nameID}>
              <td>{person.nameID}</td>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>
                <button
                  onClick={() => {
                    setEditPerson(person);
                    setEditFormVisible(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deletePerson(person.nameID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editPerson && (
        <div>
          <h2>Edit Person</h2>
          <input
            type="text"
            name="firstName"
            placeholder="First name"
            value={editPerson.firstName}
            onChange={handleEditChange}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last name"
            value={editPerson.lastName}
            onChange={handleEditChange}
          />
          <button onClick={() => updatePerson(editPerson.nameID)}>
            Update Person
          </button>
          <button
            onClick={() => {
              setEditPerson(null);
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
