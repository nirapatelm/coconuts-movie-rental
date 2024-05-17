import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

// Mock data to simulate fetching from a database
const mockMovies = [
  { movieID: 1, title: "Movie 1" },
  { movieID: 2, title: "Movie 2" },
  { movieID: 3, title: "Movie 3" },
];

const mockGenres = [
  { genreID: 1, genreName: "Action" },
  { genreID: 2, genreName: "Comedy" },
  { genreID: 3, genreName: "Drama" },
];

const CreateMappingForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    // Simulate fetching data from a database
    setMovies(mockMovies);
    setGenres(mockGenres);
  }, []);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        <label htmlFor="genreID">Genre</label>
        <select id="genreID" {...register("genreID", { required: true })}>
          <option value="">Select a genre...</option>
          {genres.map((genre) => (
            <option key={genre.genreID} value={genre.genreID}>
              {genre.genreName}
            </option>
          ))}
        </select>
        {errors.genreID && <p>Genre is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateMappingForm;
