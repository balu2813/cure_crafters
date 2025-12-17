import React from "react";
import { useLocation } from "react-router-dom";

const styles = {
  card: {
    width: "90%",
    maxWidth: "500px",
    margin: "30px auto",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  title: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  scoreBox: {
    backgroundColor: "#f0f4ff",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  },
  category: {
    fontSize: "16px",
    fontWeight: "600",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    marginBottom: "20px",
  },
  recTitle: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
  },
  recList: {
    listStyleType: "disc",
    paddingLeft: "20px",
    lineHeight: "24px",
  },
};

// dynamic color based on category
const categoryColors = {
  mild: "#4CAF50",
  moderate: "#FF9800",
  high: "#F44336",
};

function ScoreCard() {

  const { state } = useLocation()

  const { score, category , recommendations } = state || {};


  return (
    <div style={styles.card}>
      <h2 style={styles.title}>Your Depression Screening Result</h2>

      <div style={styles.scoreBox}>Your Score: {score}</div>

      <div
        style={{
          ...styles.category,
          backgroundColor: categoryColors[category] + "20",
          color: categoryColors[category],
          border: `1px solid ${categoryColors[category]}`,
        }}
      >
        Category: {category.toUpperCase()}
      </div>

      <h3 style={styles.recTitle}>Recommended Tips:</h3>

      <ul style={styles.recList}>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec}</li>
        ))}
      </ul>
    </div>
  );
}

export default ScoreCard;
