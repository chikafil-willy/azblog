import { useEffect, useState } from "react"

import Hero from "../components/Hero"
import PostCard from "../components/PostCard"
import NewsSection from "../components/NewsSection"
import { supabase } from "../supabaseClient"

const Home = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(9) // ✅ ONLY 9 LATEST POSTS

    if (!error) setPosts(data)
  }

  const styles = {
    heading: {
      padding: "20px",
      fontSize: "28px",
      fontWeight: "bold"
    },
    posts: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      padding: "0 20px 20px"
    }
  }

  return (
    <>
      <Hero />

      <h2 style={styles.heading}>Latest Articles</h2>

      <div style={styles.posts}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>

      <NewsSection />
    </>
  )
}

export default Home