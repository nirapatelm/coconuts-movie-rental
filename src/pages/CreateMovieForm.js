import React from "react";
import { useForm } from "react-hook-form";

const CreateMovieForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input id="title" {...register("title", { required: true })} />
        {errors.title && <p>Title is required</p>}
      </div>

      <div>
        <label htmlFor="releaseYear">Release Year</label>
        <input
          id="releaseYear"
          {...register("releaseYear", {
            required: true,
            min: 1888,
            max: new Date().getFullYear(),
          })}
          type="number"
        />
        {errors.releaseYear && <p>Valid release year is required</p>}
      </div>

      <div>
        <label htmlFor="director">Director</label>
        <input id="director" {...register("director", { required: true })} />
        {errors.director && <p>Director is required</p>}
      </div>

      <div>
        <label htmlFor="rating">Rating</label>
        <select id="rating" {...register("rating", { required: true })}>
          <option value="">Select rating...</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
        {errors.rating && <p>Rating is required</p>}
      </div>

      <div>
        <label htmlFor="availability">Availability</label>
        <input
          id="availability"
          {...register("availability")}
          type="checkbox"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateMovieForm;
