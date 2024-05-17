import React from "react";
import { useForm } from "react-hook-form";

const CreateGenreForm = () => {
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
        <label htmlFor="genreName">Genre Name</label>
        <input id="genreName" {...register("genreName", { required: true })} />
        {errors.genreName && <p>Genre name is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateGenreForm;
