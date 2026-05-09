import { useState } from "react"

const PostCard = ({ post }) => {
  const [expanded, setExpanded] = useState(false)

  // ✅ SAFE DATE + TIME HANDLING
  const date = post.created_at
    ? new Date(post.created_at).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric"
      })
    : "No date"

  const time = post.created_at
    ? new Date(post.created_at).toLocaleTimeString()
    : ""

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "15px",
        width: "300px",
        background: "#fff"
      }}
    >
      {/* IMAGE */}
      <img
        src={post.image || "https://via.placeholder.com/300"}
        alt={post.title}
        style={{
          width: "100%",
          height: "200px",
          objectFit: "cover",
          borderRadius: "10px"
        }}
      />

      {/* TITLE */}
      <h3 style={{ marginTop: "10px" }}>{post.title}</h3>

      {/* AUTHOR */}
      <small style={{ fontWeight: "bold", color: "#333" }}>
        By {post.author || "Admin"}
      </small>

      <br />

      {/* DATE + TIME */}
      <small style={{ color: "#777" }}>
        {date} {time && `• ${time}`}
      </small>

      {/* CONTENT */}
      <p style={{ marginTop: "10px" }}>
        {expanded
          ? post.content
          : post.content?.substring(0, 120) + "..."}
      </p>

      {/* BUTTON */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: "10px",
          padding: "8px 12px",
          border: "none",
          background: "#0ea5e9",
          color: "#fff",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        {expanded ? "Show Less" : "Read More"}
      </button>
    </div>
  )
}

export default PostCard