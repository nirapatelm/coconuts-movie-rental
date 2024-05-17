import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";


// Mock data to simulate fetching from a database
const mockMovies = [
  { movieID: 1, title: "Movie 1" },
  { movieID: 2, title: "Movie 2" },
  { movieID: 3, title: "Movie 3" },
];

const mockCustomers = [
  { customerID: 1, firstName: "John", lastName: "Doe" },
  { customerID: 2, firstName: "Jane", lastName: "Smith" },
  { customerID: 3, firstName: "Alice", lastName: "Johnson" },
];

const UpdateRentalForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [movies, setMovies] = useState([]);
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    // Simulate fetching data from a database
    setMovies(mockMovies);
    setCustomers(mockCustomers);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="customerID">Customer</label>
        <select id="customerID" {...register("customerID", { required: true })}>
          <option value="">Select a customer...</option>
          {customers.map((customer) => (
            <option key={customer.customerID} value={customer.customerID}>
              {customer.firstName} {customer.lastName}
            </option>
          ))}
        </select>
        {errors.customerID && <p>Customer is required</p>}
      </div>

      <div>
        <label htmlFor="movieID">Movie</label>
        <select id="movieID" {...register("movieID", { required: true })}>
          <option value="">Select a movie...</option>
          {movies.map((movie) => (
            <option key={movie.movieID} value={movie.movieID}>
              {movie.title}
            </option>
          ))}
        </select>
        {errors.movieID && <p>Movie is required</p>}
      </div>

      <div>
        <label htmlFor="rentalDate">Rental Date</label>
        <input
          id="rentalDate"
          {...register("rentalDate", { required: true })}
          type="date"
        />
        {errors.rentalDate && <p>Rental date is required</p>}
      </div>

      <div>
        <label htmlFor="returnDate">Return Date</label>
        <input
          id="returnDate"
          {...register("returnDate", { required: true })}
          type="date"
        />
        {errors.returnDate && <p>Return date is required</p>}
      </div>

      <div>
        <label htmlFor="totalAmount">Total Amount</label>
        <input
          id="totalAmount"
          {...register("totalAmount", { required: true })}
          type="number"
          step="0.01"
        />
        {errors.totalAmount && <p>Total amount is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdateRentalForm;
