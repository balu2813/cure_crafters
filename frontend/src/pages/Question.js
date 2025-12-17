import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Question() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:8000/questions");
        setQuestions(res.data.questions);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load questions. Please try again later.");
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelect = (key) => {
    setAnswers({ ...answers, [questions[current].id]: key });
  };

  const next = () => {
    if (!answers[questions[current].id]) return;
    setCurrent(current + 1);
  };

  const submit = async () => {
    try {
      const res = await axios.post("http://localhost:8000/evaluate", answers);
      navigate("/scorecard", {
      state: {
        score: res.data.score,
        category: res.data.category,
        recommendations: res.data.recommendations
      },
    });
      
    } catch (err) {
      console.error(err);
      setError("Failed to submit answers. Try again.");
    }
  };

  if (loading) return <h2 style={styles.loading}>Loading questions...</h2>;
  if (error) return <h2 style={styles.error}>{error}</h2>;
  if (!questions.length) return <h2 style={styles.error}>No questions found!</h2>;

  const q = questions[current];

  return (
    <div style={styles.container}>
      <h2 style={styles.questionText}>{q.text}</h2>

      {q.options.map((opt, idx) => (
        <label key={idx} style={styles.option}>
          <input
            type="radio"
            name={q.id}
            checked={answers[q.id] === opt.key}
            onChange={() => handleSelect(opt.key)}
            style={styles.inputRadio}
          />
          {opt.text}
        </label>
      ))}

      <div style={styles.buttonContainer}>
        {current < questions.length - 1 ? (
          <button
            style={{
              ...styles.button,
              ...(answers[q.id] ? styles.nextBtn : styles.disabledBtn),
            }}
            onClick={next}
            disabled={!answers[q.id]}
          >
            Next
          </button>
        ) : (
          <button style={{ ...styles.button, ...styles.submitBtn }} onClick={submit}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "30px",
    borderRadius: "10px",
    background: "white",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  questionText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#333",
  },
  option: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    fontSize: "16px",
  },
  inputRadio: { marginRight: "10px" },
  buttonContainer: { display: "flex", justifyContent: "flex-end", marginTop: "20px" },
  button: {
    padding: "12px 25px",
    borderRadius: "6px",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  nextBtn: { background: "#0077ff", color: "white" },
  submitBtn: { background: "#16a34a", color: "white" },
  disabledBtn: { background: "#ccc", color: "#777", cursor: "not-allowed" },
  loading: { textAlign: "center", color: "#333" },
  error: { textAlign: "center", color: "red" },
};
