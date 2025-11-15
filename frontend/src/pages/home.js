import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Welcome to cure_crafters</h1>

      <div style={{ marginTop: "40px" }}>
        <Link to="/login">
          <button style={{ padding: "10px 20px", marginRight: "20px" }}>
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button style={{ padding: "10px 20px" }}>
            Signup
          </button>
        </Link>
      </div>
    </div>
  );
}
