import { useContext, useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../context/userContext";

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  
  const {updateUser} = useContext(UserContext);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const signup = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/auth/signup", {
        fullName: form.name,
        email: form.email,
        password: form.password
      });

      const { token, user } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      }

    } catch (error) {
      console.error("POST Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Signup failed");
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Enter valid email";
    if (!form.password.trim()) newErrors.password = "Password is required";
    if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    await signup();

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
  },
  link: {
    color: "#0077ff",
    fontWeight: "bold",
  },
};
