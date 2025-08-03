"use client";
import React from "react";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors, isSubmitting },
  } = useForm();

  const selectedUserType = watch("userType");

  const onSubmit = async (data) => {
    if (!data.userType) {
      setError("userType", { message: "⚠️ Please select a user type" });
      return;
    }
    
    if (!data.username || data.username.length < 3 || data.username.length > 8) {
      setError("username", { message: "⚠️ Username must be between 3-8 characters" });
      return;
    }

    let r = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    let res = await r.text();
    console.log(data, res);
  };

  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, d * 1000);
    });
  };

  return (
    <div className="login">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="login_classifier">
          <div className="newuser">
            <input
              type="radio"
              id="newuser"
              value="newuser"
              {...register("userType")}
              className="hidden-radio"
            />
            <label 
              htmlFor="newuser" 
              className={`user-type-btn ${selectedUserType === 'newuser' ? 'selected' : ''}`}
            >
              New User
            </label>
          </div>
          <div className="existinuser">
            <input
              type="radio"
              id="existinguser"
              value="existinguser"
              {...register("userType")}
              className="hidden-radio"
            />
            <label 
              htmlFor="existinguser"
              className={`user-type-btn ${selectedUserType === 'existinguser' ? 'selected' : ''}`}
            >
              Existing User
            </label>
          </div>
        </div>
        {errors.userType && (
          <div className="red">{errors.userType.message}</div>
        )}
        <div className="form">
          <input
            className="loginusername"
            placeholder="username"
            {...register("username")}
            type="text"
          />
          {errors.username && (
            <div className="red">{errors.username.message}</div>
          )}
          <br />
          <input disabled={isSubmitting} className="loginsubmitbtn" type="submit" value="Submit" />
          {errors.myform && <div className="red">{errors.myform.message}</div>}
          {errors.blocked && (
            <div className="red">{errors.blocked.message}</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
