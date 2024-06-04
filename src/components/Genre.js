import React, { useEffect, useState } from "react";
import axios from "axios";

const Genre = () => {
  const [genre, setGenre] = useState([]);
  const [newGenre, setNewGenre] = useState({ genreName: "" });
  const [editGenre, setEditGenre] = useState(null);
  const [isAddFormVisible, setAddFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  useEffect(() => {
    fetchGenre();
  }, []);

  const fetchGenre = () => {
    axios
      .get("http://classwork.engr.oregonstate.edu:5273/api/genre")
      .then((response) => {
        setGenre(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGenre({
      ...newGenre,
      [name]: value,
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditGenre((prevEditGenre) => ({
      ...prevEditGenre,
      [name]: value,
    }));
  };

  const addGenre = () => {
    axios
      .post("http://classwork.engr.oregonstate.edu:5273/api/genre", newGenre)
      .then(() => {
        fetchGenre();
        setNewGenre({ genreName: "" });
        setAddFormVisible(false);
      })
      .catch((error) => {
        console.error("Error adding genre:", error);
      });
  };

  const updateGenre = (genreID) => {
    axios
      .put(
        `http://classwork.engr.oregonstate.edu:5273/api/genre/${genreID}`,
        editGenre
      )
      .then(() => {
        fetchGenre(); // Refresh genres after update
        setEditGenre(null);
        setEditFormVisible(false);
      })
      .catch((error) => {
        console.error("Error updating genre:", error);
      });
  };

  const deleteGenre = (genreID) => {
    axios
      .delete(`http://classwork.engr.oregonstate.edu:5273/api/genre/${genreID}`)
      .then(() => {
        fetchGenre();
      })
      .catch((error) => {
        console.error("Error deleting genre:", error);
      });
  };

  return (
    <div>
      <h1>Genres</h1>
      <button onClick={() => setAddFormVisible(!isAddFormVisible)}>
        {isAddFormVisible ? "Cancel" : "Add new Genre"}
      </button>
      {isAddFormVisible && (
        <div>
          <h2>Add New Genre</h2>
          <input
            type="text"
            name="genreName"
            placeholder="Genre name"
            value={newGenre.genreName}
            onChange={handleInputChange}
          />
          <button onClick={addGenre}>Add Genre</button>
        </div>
      )}
      <table>
        <thead>
          <tr>
            <th>Genre ID</th>
            <th>Genre Name</th>
          </tr>
        </thead>
        <tbody>
          {genre.map((genre) => (
            <tr key={genre.genreID}>
              <td>{genre.genreID}</td>
              <td>{genre.genreName}</td>
              <td>
                <button
                  onClick={() => {
                    setEditGenre(genre);
                    setEditFormVisible(true);
                  }}
                >
                  Edit
                </button>
                <button onClick={() => deleteGenre(genre.genreID)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isEditFormVisible && editGenre && (
        <div>
          <h2>Edit Genre</h2>
          <input
            type="text"
            name="genreName"
            placeholder="Genre name"
            value={editGenre.genreName}
            onChange={handleEditChange}
          />
          <button onClick={() => updateGenre(editGenre.genreID)}>
            Update Genre
          </button>
          <button
            onClick={() => {
              setEditGenre(null);
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

export default Genre;
