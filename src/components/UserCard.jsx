function UserCard({ user }) {
  return (
    <div style={{
      border: "1px solid #ddd",
      padding: "10px",
      marginBottom: "10px",
      borderRadius: "8px"
    }}>
      <img src={user.avatar_url} width="50" />
      <p>{user.login}</p>
    </div>
  );
}

export default UserCard;