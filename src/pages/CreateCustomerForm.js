import React from "react";
import { useForm } from "react-hook-form";

const CreateCustomerForm = () => {
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
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", {
            required: true,
            pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
          })}
        />
        {errors.email && <p>Valid email is required</p>}
      </div>

      <div>
        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          {...register("phone", {
            required: true,
            pattern: /^\d{3}-\d{3}-\d{4}$/,
          })}
        />
        {errors.phone && <p>Phone number is required (format: 123-456-7890)</p>}
      </div>

      <div>
        <label htmlFor="address">Address</label>
        <input id="address" {...register("address", { required: true })} />
        {errors.address && <p>Address is required</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateCustomerForm;
