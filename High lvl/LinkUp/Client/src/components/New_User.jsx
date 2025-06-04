import React, { useState } from "react";
import { useForm } from "react-hook-form";

const NewUser = ({ onUsernameSubmit }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [isNewUser, setIsNewUser] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkUsername = async (username) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/check', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      return data.exists;
    } catch (error) {
      console.error('Error checking username:', error);
      return false;
    }
  };

  const registerUser = async (username) => {
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  };

  const onSubmit = async (data) => {
    if (data.username.trim()) {
      setLoading(true);
      setError("");
      try {
        if (isNewUser) {
          // Check if username exists
          const exists = await checkUsername(data.username);
          if (exists) {
            setError("Username already exists. Please choose a different one.");
            return;
          }
          // Register new user
          await registerUser(data.username);
        } else {
          // Check if username exists for existing user
          const exists = await checkUsername(data.username);
          if (!exists) {
            setError("Username not found. Please check your username or create a new account.");
            return;
          }
        }
        onUsernameSubmit(data.username, isNewUser);
      } catch (error) {
        setError(error.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="new-user-container">
      <div className="new-user-form">
        <h2>Welcome to LinkUp</h2>
        <div className="user-type-toggle">
          <button 
            className={`toggle-btn ${isNewUser ? 'active' : ''}`}
            onClick={() => setIsNewUser(true)}
            disabled={loading}
          >
            New User
          </button>
          <button 
            className={`toggle-btn ${!isNewUser ? 'active' : ''}`}
            onClick={() => setIsNewUser(false)}
            disabled={loading}
          >
            Existing User
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            placeholder={isNewUser ? "Choose a username" : "Enter your username"}
            className="username-input"
            disabled={loading}
            {...register("username", { 
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters"
              }
            })}
          />
          {errors.username && (
            <span className="error-message">{errors.username.message}</span>
          )}
          {error && (
            <span className="error-message">{error}</span>
          )}
          <button 
            type="submit" 
            className="submit-button"
            disabled={loading}
          >
            {loading ? "Please wait..." : (isNewUser ? "Create Account" : "Login")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewUser;
