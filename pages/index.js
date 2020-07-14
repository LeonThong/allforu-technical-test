import Head from "next/head";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const { register, handleSubmit, errors } = useForm();
  const [userData, setUserData] = React.useState({});
  const { created_at, name, email, flavor, token } = userData;
  const onSubmit = (data, e) => {
    const requestOpt = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };

    fetch("/api/register", requestOpt)
      .then((response) => {
        e.target.reset();
        return response.json();
      })
      .then((res) => {
        setUserData(res);
      });
  };
  React.useEffect(() => {
    console.log("mounted");
    return () => {
      console.log("unmounted");
    };
  }, []);
  return (
    <div className="container">
      <Head>
        <title>IC Pte Ltd</title>
      </Head>

      <main>
        <h1 className="title">IC Pte Ltd free ice cream give away!</h1>

        {Object.keys(userData).length !== 0 ? (
          <div>
            <h3>
              Your application has been successfully submitted. Use the
              Redemption Token at any of our stores to redeem your free ice
              cream!
            </h3>
            <p>Created at: {created_at}</p>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <p>Flavor: {flavor}</p>
            <p>Redemption Token: {token}</p>
            <button onClick={() => (window.location.href = "/")}>Done</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor="name">Name: </label>
            <input name="name" ref={register({ required: true })} />
            {errors.name && <span> Name field is required</span>}
            <br />
            <label htmlFor="email">Email: </label>
            <input
              name="email"
              ref={register({
                required: "Email field is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  message: "Please enter a valid e-mail address"
                }
              })}
            />
            {errors.email && <span> {errors.email.message}</span>}
            <br />
            <label htmlFor="flavor">Ice Cream Flavor: </label>
            <select name="flavor" ref={register({ required: true })}>
              <option value="Chocolate">Chocolate Ice Cream</option>
              <option value="Strawberry">Strawberry Ice Cream</option>
              <option value="Vanilla">Vanilla Ice Cream</option>
            </select>
            {errors.flavor && <span> Please select a flavor</span>}
            <br />
            <input type="submit" />
          </form>
        )}
      </main>

      <footer></footer>
    </div>
  );
}
