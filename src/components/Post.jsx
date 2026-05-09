import { useEffect, useState } from "react"
import { createClient } from "@supabase/supabase-js"

/* =======================
   SUPABASE CLIENT
======================= */
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const Post = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) {
      console.error(error)
    } else {
      setPosts(data)
    }

    setLoading(false)
  }

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      padding: "20px"
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "10px",
      padding: "15px",
      width: "300px",
      background: "#fff"
    },
    image: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
      borderRadius: "10px"
    },
    title: {
      fontWeight: "bold",
      marginTop: "10px"
    }
  }

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Latest Posts</h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : (
        <div style={styles.container}>
          {posts.map((post) => (
            <div key={post.id} style={styles.card}>
              <img
                src={post.image}
                alt={post.title}
                style={styles.image}
              />

              <h3 style={styles.title}>{post.title}</h3>

              <p>
                {post.content
                  ? post.content.substring(0, 120) + "..."
                  : "No content"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Post