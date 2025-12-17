import React, { useState } from "react";
import Question from "./Question";

export default function Dashboard() {
  const [start, setStart] = useState(false);

  return (
    <div style={styles.container}>
      {!start ? (
        <div style={styles.card}>
          <h1 style={styles.title}>Welcome to Cure Crafters</h1>
          <p style={styles.subtitle}>Your health companion starts here ✨</p>

          <button style={styles.button} onClick={() => setStart(true)}>
            Get Started
          </button>
        </div>
      ) : (
        <div style={styles.questionWrapper}>
          <Question />
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  card: {
    width: "420px",
    padding: "40px",
    textAlign: "center",
    background: "rgba(255, 255, 255, 0.18)",
    borderRadius: "20px",
    backdropFilter: "blur(15px)",
    boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
  },

  title: {
    fontSize: "32px",
    color: "white",
    fontWeight: "bold",
    marginBottom: "10px",
  },

  subtitle: {
    fontSize: "18px",
    color: "#eaffff",
    marginBottom: "20px",
  },

  button: {
    padding: "12px 25px",
    fontSize: "18px",
    border: "none",
    borderRadius: "12px",
    background: "white",
    color: "#007bff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  questionWrapper: {
    width: "450px",
  },
};
