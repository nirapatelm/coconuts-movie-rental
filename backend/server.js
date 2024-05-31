const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5273;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "/build")));

const db = mysql.createConnection({
  host: "coconuts-movie-rentals.cjcig6ock5ue.us-east-1.rds.amazonaws.com",
  user: "root",
  password: "coconut24",
  database: "coconuts-movie-rental",
  // db port
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.error("Could not connect to the database server: " + err.stack);
    return;
  }
  console.log("Connected to database.");
});

// Fetch all movies
app.get("/api/movies", (req, res) => {
  const query = "SELECT * FROM Movies";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Add a new movie
app.post("/api/movies", (req, res) => {
  const { title, releaseYear, rating, availability } = req.body;
  const query =
    "INSERT INTO Movies (movieID, title, releaseYear, rating, availability) VALUES (UUID(), ?, ?, ?, ?)";
  db.query(query, [title, releaseYear, rating, availability], (err, result) => {
    if (err) {
      console.error("Error adding movie: " + err.stack);
      res.status(500).send("Error adding movie");
      return;
    }
    res.send("Movie added successfully");
  });
});

// Update a movie
app.put("/api/movies/:id", (req, res) => {
  const movieID = req.params.id;
  const { title, releaseYear, rating, availability } = req.body;
  const query =
    "UPDATE Movies SET title = ?, releaseYear = ?, rating = ?, availability = ? WHERE movieID = ?";
  db.query(
    query,
    [title, releaseYear, rating, availability, movieID],
    (err, result) => {
      if (err) {
        console.error("Error updating movie: " + err.stack);
        res.status(500).send("Error updating movie");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Movie not found");
        return;
      }
      res.send("Movie updated successfully");
    }
  );
});

// Delete a movie
app.delete("/api/movies/:id", (req, res) => {
  const movieID = req.params.id;
  const query = "DELETE FROM Movies WHERE movieID = ?";
  db.query(query, [movieID], (err, result) => {
    if (err) {
      console.error("Error deleting movie: " + err.stack);
      res.status(500).send("Error deleting movie");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Movie not found");
      return;
    }
    res.send("Movie deleted successfully");
  });
});

// Fetch all rentals
app.get("/api/rentals", (req, res) => {
  const query = "SELECT * FROM Rentals";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Add a new rental
app.post("/api/rentals", (req, res) => {
  const { customerID, movieID, rentalDate, returnDate, totalAmount } = req.body;
  const query =
    "INSERT INTO Rentals (customerID, movieID, rentalDate, returnDate, totalAmount) VALUES (?, ?, ?, ?, ?)";
  db.query( query, [customerID, movieID, rentalDate, returnDate, totalAmount],
    (err) => {
      if (err) {
        console.error("Error adding rental: " + err.stack);
        res.status(500).send("Error adding rental");
        return;
      }
      res.send("Rental added successfully");
    }
  );
});

// Update a rental
app.put("/api/rentals/:id", (req, res) => {
  const rentalID = req.params.id;
  const { customerID, movieID, rentalDate, returnDate, totalAmount } = req.body;
  const query =
    "UPDATE Rentals SET customerID = ?, movieID = ?, rentalDate = ?, returnDate = ?, totalAmount = ? WHERE rentalID = ?";
  db.query(
    query,
    [customerID, movieID, rentalDate, returnDate, totalAmount, rentalID],
    (err, result) => {
      if (err) {
        console.error("Error updating rental: " + err.stack);
        res.status(500).send("Error updating rental");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Rental not found");
        return;
      }
      res.send("Rental updated successfully");
    }
  );
});

// Delete a rental
app.delete("/api/rentals/:id", (req, res) => {
  const rentalID = req.params.id;
  const query = "DELETE FROM Rentals WHERE rentalID = ?";
  db.query(query, [rentalID], (err, result) => {
    if (err) {
      console.error("Error deleting rental: " + err.stack);
      res.status(500).send("Error deleting rental");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Rental not found");
      return;
    }
    res.send("Rental deleted successfully");
  });
});

// Fetch all customers
app.get("/api/customers", (req, res) => {
  const query = "SELECT * FROM Customers";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Add a new customer
app.post("/api/customers", (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;
  const query =
    "INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES (?, ?, ?, ?, ?)";
  db.query(query, [firstName, lastName, email, phone, address], (err, result) => {
    if (err) {
      console.error("Error adding customer: " + err.stack);
      res.status(500).send("Error adding customer");
      return;
    }
    res.send("Customer added successfully");
  });
});

// Update a customer
app.put("/api/customers/:id", (req, res) => {
  const customerID = req.params.id;
  const { firstName, lastName, email, phone, address } = req.body;
  const query =
    "UPDATE Customers SET firstName = ?, lastName = ?, email = ?, phone = ?, address = ? WHERE customerID = ?";
  db.query(
    query,
    [firstName, lastName, email, phone, address, customerID],
    (err, result) => {
      if (err) {
        console.error("Error updating customer: " + err.stack);
        res.status(500).send("Error updating customer");
        return;
      }
      if (result.affectedRows === 0) {
        res.status(404).send("Customer not found");
        return;
      }
      res.send("Customer updated successfully");
    }
  );
});

// Delete a customer
app.delete("/api/customers/:id", (req, res) => {
  const customerID = req.params.id;
  const query = "DELETE FROM Customers WHERE customerID = ?";
  db.query(query, [customerID], (err, result) => {
    if (err) {
      console.error("Error deleting customer: " + err.stack);
      res.status(500).send("Error deleting customer");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Customer not found");
      return;
    }
    res.send("Customer deleted successfully");
  });
});

// Fetch all genres
app.get("/api/genre", (req, res) => {
  const query = "SELECT * FROM Genre";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching data: " + err.stack);
      res.status(500).send("Error fetching data");
      return;
    }
    res.json(results);
  });
});

// Add a new genre
app.post("/api/genre", (req, res) => {
  const { genreName } = req.body;
  const query = "INSERT INTO Genre (genreName) VALUES (?)";
  db.query(query, [genreName], (err, result) => {
    if (err) {
      console.error("Error adding genre: " + err.stack);
      res.status(500).send("Error adding genre");
      return;
    }
    res.send("Genre added successfully");
  });
});

// Update a genre
app.put("/api/genre/:id", (req, res) => {
  const genreID = req.params.id;
  const { genreName } = req.body;
  const query = "UPDATE Genre SET genreName = ? WHERE genreID = ?";
  db.query(query, [genreName, genreID], (err, result) => {
    if (err) {
      console.error("Error updating genre: " + err.stack);
      res.status(500).send("Error updating genre");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Genre not found");
      return;
    }
    res.send("Genre updated successfully");
  });
});

// Delete a Genre
app.delete("/api/genre/:id", (req, res) => {
  const genreID = req.params.id;
  const query = "DELETE FROM Genre WHERE genreID = ?";
  db.query(query, [genreID], (err, result) => {
    if (err) {
      console.error("Error deleting genre: " + err.stack);
      res.status(500).send("Error deleting genre");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Genre not found");
      return;
    }
    res.send("Genre deleted successfully");
  });
});

// Fetch all people
app.get("/api/people", (req, res) => {
  const query = "SELECT * FROM People";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching people: " + err.stack);
      res.status(500).send("Error fetching people");
      return;
    }
    res.json(results);
  });
});

// Add a new person
app.post("/api/people", (req, res) => {
  const { firstName, lastName } = req.body;
  const query =
    "INSERT INTO People (firstName, lastName) VALUES (?, ?)";
  db.query(query, [firstName, lastName], (err, result) => {
    if (err) {
      console.error("Error adding person: " + err.stack);
      res.status(500).send("Error adding person");
      return;
    }
    res.send("Person added successfully");
  });
});

// Update a person
app.put("/api/people/:id", (req, res) => {
  const nameID = req.params.id;
  const { firstName, lastName } = req.body;
  const query =
    "UPDATE People SET firstName = ?, lastName = ? WHERE nameID = ?";
  db.query(query, [firstName, lastName, nameID], (err, result) => {
    if (err) {
      console.error("Error updating person: " + err.stack);
      res.status(500).send("Error updating person");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Person not found");
      return;
    }
    res.send("Person updated successfully");
  });
});

// Delete a person
app.delete("/api/people/:id", (req, res) => {
  const nameID = req.params.id;
  const query = "DELETE FROM People WHERE nameID = ?";
  db.query(query, [nameID], (err, result) => {
    if (err) {
      console.error("Error deleting person: " + err.stack);
      res.status(500).send("Error deleting person");
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send("Person not found");
      return;
    }
    res.send("Person deleted successfully");
  });
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
