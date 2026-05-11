import { useState } from "react"

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false)

  // SAFE DATE + TIME HANDLING
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric"
        }
      )
    : "No date"

  const time = post.created_at
    ? new Date(post.created_at).toLocaleTimeString()
    : ""

  const styles = {
    card: {
      border: "1px solid #ddd",
      borderRadius: "14px",
      padding: "15px",
      width: "300px",
      background: "#fff",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
    },

    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px"
    },

    title: {
      marginTop: "12px",
      fontSize: "22px",
      lineHeight: "1.4",
      color: "#0f172a"
    },

    author: {
      fontWeight: "bold",
      color: "#333"
    },

    date: {
      color: "#777"
    },

    content: {
      marginTop: "12px",
      textAlign: "left", // ✅ paragraph alignment
      lineHeight: "1.8",
      fontSize: "15px",
      color: "#222"
    },

    button: {
      marginTop: "12px",
      padding: "10px 14px",
      border: "none",
      background: "#0ea5e9",
      color: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold"
    }
  }

  return (
    <div style={styles.card}>
      {/* IMAGE */}
      <img
        src={
          post.image ||
          "https://via.placeholder.com/300"
        }
        alt={post.title}
        style={styles.image}
      />

      {/* TITLE */}
      <h3 style={styles.title}>
        {post.title}
      </h3>

      {/* AUTHOR */}
      <small style={styles.author}>
        By {post.author || "Admin"}
      </small>

      <br />

      {/* DATE + TIME */}
      <small style={styles.date}>
        {date} {time && `• ${time}`}
      </small>

      {/* CONTENT */}
      <div style={styles.content}>
        {(expanded
          ? post.content
          : post.content?.substring(0, 120) + "..."
        )
          ?.split("\n")
          .map((para, i) => (
            <p
              key={i}
              style={{ marginBottom: "14px" }}
            >
              {para}
            </p>
          ))}
      </div>

      {/* BUTTON */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={styles.button}
      >
        {expanded
          ? "Show Less"
          : "Read More"}
      </button>
    </div>
  )
}

export default PostCard