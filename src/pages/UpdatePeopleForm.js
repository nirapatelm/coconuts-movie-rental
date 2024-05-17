import React from "react";
import { useForm } from "react-hook-form";

const UpdatePeopleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      people: [{ nameID: "", firstName: "", lastName: "" }],
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="firstName">First Name</label>
        <input id="firstName" {...register("firstName", { required: true })} />
        {errors.firstName && <p>First name is required</p>}
      </div>

      <div>
        <label htmlFor="lastName">Last Name</label>
        <input id="lastName" {...register("lastName", { required: true })} />
        {errors.lastName && <p>Last name is required</p>}
      </div>

      <div>
        <label htmlFor="nameID">Name ID</label>
        <input
          id="nameID"
          {...register("nameID", { required: true })}
          type="number"
        />
        {errors.nameID && <p>Name ID is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UpdatePeopleForm;
