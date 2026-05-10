import { useEffect, useState } from "react"

const NewsSection = () => {
  const [news, setNews] = useState([])
  const [category, setCategory] = useState("sports")
  const [loading, setLoading] = useState(false)

  const feeds = {
    // ✅ FOOTBALL PRIORITY + OTHER SPORTS
    sports:
      "https://news.google.com/rss/search?q=football%20OR%20premier%20league%20OR%20champions%20league%20OR%20sports&hl=en&gl=US&ceid=US:en",

    politics:
      "https://news.google.com/rss/search?q=politics&hl=en&gl=US&ceid=US:en",

    entertainment:
      "https://news.google.com/rss/search?q=entertainment&hl=en&gl=US&ceid=US:en"
  }

  const fetchNews = async () => {
    setLoading(true)

    try {
      const rssUrl = feeds[category]

      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      )

      const data = await res.json()

      if (data.status === "ok") {
        setNews(data.items.slice(0, 6))
      } else {
        setNews([])
      }
    } catch (err) {
      console.error(err)
      setNews([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [category])

  const formatDate = (pubDate) => {
    const date = new Date(pubDate)

    return date.toLocaleString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  const styles = {
    container: {
      padding: "20px"
    },

    title: {
      fontSize: "24px",
      marginBottom: "10px",
      fontWeight: "bold"
    },

    tabs: {
      display: "flex",
      gap: "15px",
      marginBottom: "20px",
      flexWrap: "wrap"
    },

    tab: (active) => ({
      padding: "8px 15px",
      cursor: "pointer",
      borderRadius: "5px",
      background: active ? "#0ea5e9" : "#eee",
      color: active ? "#fff" : "#000",
      fontWeight: "500"
    }),

    newsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "15px"
    },

    card: {
      border: "1px solid #ddd",
      padding: "15px",
      borderRadius: "10px",
      background: "#fff",
      transition: "0.2s",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
    },

    link: {
      textDecoration: "none",
      color: "#111"
    },

    newsTitle: {
      lineHeight: "1.5",
      fontSize: "17px"
    },

    newsDate: {
      fontSize: "12px",
      color: "#555",
      marginTop: "10px"
    },

    empty: {
      textAlign: "center",
      marginTop: "20px",
      color: "#777"
    }
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Global News</h2>

      {/* CATEGORY TABS */}
      <div style={styles.tabs}>
        <div
          style={styles.tab(category === "sports")}
          onClick={() => setCategory("sports")}
        >
          ⚽ Sports
        </div>

        <div
          style={styles.tab(category === "politics")}
          onClick={() => setCategory("politics")}
        >
          🏛 Politics
        </div>

        <div
          style={styles.tab(category === "entertainment")}
          onClick={() => setCategory("entertainment")}
        >
          🎬 Entertainment
        </div>
      </div>

      {/* LOADING */}
      {loading && <p>Loading news...</p>}

      {/* EMPTY */}
      {!loading && news.length === 0 && (
        <p style={styles.empty}>No news available</p>
      )}

      {/* NEWS GRID */}
      <div style={styles.newsGrid}>
        {news.map((item, index) => (
          <div key={index} style={styles.card}>
            <a
              href={item.link}
              target="_blank"
              rel="noreferrer"
              style={styles.link}
            >
              <h4 style={styles.newsTitle}>
                {item.title}
              </h4>
            </a>

            <span style={styles.newsDate}>
              {formatDate(item.pubDate)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewsSection