import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserRepos() {
  const { username } = useParams();

  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sortType, setSortType] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/users/${username}/repos`
        );

        if (!res.ok) throw new Error("Failed to fetch repos");

        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [username]);

  // Sorting
  let processedRepos = [...repos];

  if (sortType === "stars") {
    processedRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
  } else if (sortType === "forks") {
    processedRepos.sort((a, b) => b.forks_count - a.forks_count);
  }

  // Filtering
  if (language) {
    processedRepos = processedRepos.filter(
      (repo) => repo.language === language
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>{username}'s Repositories</h2>

      {/* Controls */}
      <div style={{ marginBottom: "15px" }}>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">Sort</option>
          <option value="stars">Stars</option>
          <option value="forks">Forks</option>
        </select>

        <input
          type="text"
          placeholder="Filter by language"
          onChange={(e) => setLanguage(e.target.value)}
          style={{ marginLeft: "10px" }}
        />
      </div>

      {/* States */}
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && processedRepos.length === 0 && (
        <p>No repositories found</p>
      )}

      {/* Repo List */}
      {processedRepos.map((repo) => (
        <div
          key={repo.id}
          style={{
            border: "1px solid #ddd",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{repo.name}</h3>
          <p>{repo.description}</p>
          <p>⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}</p>
          <p>Language: {repo.language}</p>
        </div>
      ))}
    </div>
  );
}

export default UserRepos;