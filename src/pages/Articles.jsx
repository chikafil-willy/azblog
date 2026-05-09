import { useEffect, useState } from "react"
import { supabase } from "../supabaseClient"
import PostCard from "../components/PostCard"

const Articles = ({ search = "" }) => {
  const [posts, setPosts] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const postsPerPage = 12

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })

    if (!error) setPosts(data)
  }

  const filteredPosts = posts.filter((post) =>
    (post.title || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  )

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const start = (currentPage - 1) * postsPerPage
  const end = start + postsPerPage
  const currentPosts = filteredPosts.slice(start, end)

  const styles = {
    heading: {
      padding: "20px",
      fontSize: "30px",
      fontWeight: "bold"
    },

    posts: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "0 20px",
      justifyContent: "center"
    },

    empty: {
      textAlign: "center",
      padding: "30px",
      color: "#666"
    },

    pagination: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "15px",
      margin: "30px 0"
    },

    button: {
      padding: "10px 16px",
      border: "none",
      background: "#0ea5e9",
      color: "#fff",
      borderRadius: "6px",
      cursor: "pointer"
    }
  }

  return (
    <>
      <h1 style={styles.heading}>Latest Articles</h1>

      <div style={styles.posts}>
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p style={styles.empty}>No articles found</p>
        )}
      </div>

      {/* ✅ FORCE SHOW PAGINATION WHEN THERE IS DATA */}
      {filteredPosts.length > 0 && (
        <div style={styles.pagination}>
          <button
            style={styles.button}
            onClick={() =>
              setCurrentPage((p) => Math.max(p - 1, 1))
            }
            disabled={currentPage === 1}
          >
            Prev
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            style={styles.button}
            onClick={() =>
              setCurrentPage((p) =>
                Math.min(p + 1, totalPages)
              )
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  )
}

export default Articles