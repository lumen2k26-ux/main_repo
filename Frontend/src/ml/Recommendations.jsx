// src/ml/Recommendations.jsx
import { useEffect, useState } from "react";
import { getUserRecommendations } from "../services/recommendationService"; // fixed spelling

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = 1; // temporary hardcoded

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserRecommendations(userId);
        setRecommendations(data);
      } catch (err) {
        console.error("Error fetching recommendations:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p>Loading recommendations...</p>;

  return (
    <div>
      <h2>Recommended Plans</h2>
      {recommendations.length === 0 ? (
        <p>No recommendations available.</p>
      ) : (
        <ul>
          {recommendations.map((rec, index) => (
            <li key={index}>
              <strong>{rec.name}</strong> - {rec.details || "No details"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Recommendations;
