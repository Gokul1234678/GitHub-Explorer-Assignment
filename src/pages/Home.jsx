import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import UserCard from "../components/UserCard";
import useDebounce from "../hooks/useDebounce";
import { useNavigate } from "react-router-dom";

function Home() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 400);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (!debouncedQuery) {
      setUsers([]);
      return;
    }

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(
          `https://api.github.com/search/users?q=${debouncedQuery}`
        );

        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setUsers(data.items || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>GitHub Explorer</h1>

      <SearchBar query={query} setQuery={setQuery} />

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && debouncedQuery && users.length === 0 && (
        <p>No users found</p>
      )}

      {users.map((user) => (
        <div
          key={user.id}
          onClick={() => navigate(`/user/${user.login}`)}
          style={{ cursor: "pointer" }}
        >
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}

export default Home;