import { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (form.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!form.password.trim()) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!validate()) return;

    alert(`Signed up as: ${form.name}\nEmail: ${form.email}`);
  };

  return (
    <div style={styles.container}>
      <form style={styles.box} onSubmit={submitHandler}>
        <h2 style={styles.title}>Create Account</h2>

        <input
          name="name"
          type="text"
          placeholder="Full Name"
          style={styles.input}
          value={form.name}
          onChange={handleChange}
        />
        {errors.name && <p style={styles.error}>{errors.name}</p>}

        <input
          name="email"
          type="email"
          placeholder="Email Address"
          style={styles.input}
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <p style={styles.error}>{errors.email}</p>}

        <input
          name="password"
          type="password"
          placeholder="Password"
          style={styles.input}
          value={form.password}
          onChange={handleChange}
        />
        {errors.password && <p style={styles.error}>{errors.password}</p>}

        <button style={styles.btn} type="submit">
          Sign Up
        </button>

        {/* 👉 Bottom Link */}
        <p style={styles.bottomText}>
          Already have an account?{" "}
          <Link to="/" style={styles.link}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f5f5f5",
  },
  box: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  title: {
    textAlign: "center",
    marginBottom: "10px",
  },
  input: {
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginTop: "-10px",
    marginBottom: "5px",
  },
  btn: {
    padding: "12px",
    background: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
  },
  bottomText: {
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
  },
  link: {
    color: "#0077ff",
    textDecoration: "none",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
