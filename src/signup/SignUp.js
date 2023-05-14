import React, { useState, useEffect } from "react";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lemail, setLemail] = useState("");
  const [lpassword, setLpassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setIsSubmitted(true); // Set isSubmitted to true when the form is submitted
      } else {
        setMessage(data.error || data.message);
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setMessage("An error occurred. Please try again.");
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Login successful");
        localStorage.setItem("token", data.token);
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      setEmail("");
      setPassword("");
      setIsSubmitted(false);
    }
  }, [isSubmitted]);

  return (
    <div className="signup-container">
      <div className="SignUp">
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={lemail}
          onChange={(e) => setLemail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={lpassword}
          onChange={(e) => setLpassword(e.target.value)}
          required
        />
        <br />
          <button type="submit">Login</button>
        </form>
      </div>

      {message && (
        <p>{typeof message === "object" ? JSON.stringify(message) : message}</p>
      )}
    </div>
  );
}

export default SignUp;
