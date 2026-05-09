import { useEffect, useState } from "react"

const Entertainment = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchNews = async () => {
    setLoading(true)
    try {
      const rssUrl =
        "https://news.google.com/rss/search?q=Nollywood%20Nigeria%20music&hl=en-NG&gl=NG&ceid=NG:en"

      const res = await fetch(
        `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`
      )
      const data = await res.json()
      if (data.status === "ok") setNews(data.items.slice(0, 8))
      else setNews([])
    } catch (err) {
      console.error(err)
      setNews([])
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const styles = {
    container: {
      padding: "30px 20px",
      maxWidth: "1200px",
      margin: "0 auto",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh"
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#0f172a",
      marginBottom: "30px",
      textAlign: "center",
      letterSpacing: "1px"
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
      gap: "25px"
    },
    card: {
      background: "linear-gradient(145deg, #8b5cf6, #a78bfa)",
      color: "#fff",
      padding: "25px",
      borderRadius: "15px",
      boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
      transition: "all 0.3s ease",
      cursor: "pointer",
      minHeight: "150px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      position: "relative",
      overflow: "hidden"
    },
    cardHover: {
      transform: "translateY(-7px)",
      boxShadow: "0 12px 30px rgba(0,0,0,0.25)"
    },
    link: {
      color: "inherit",
      textDecoration: "none"
    },
    newsTitle: {
      fontSize: "18px",
      fontWeight: "600",
      lineHeight: "1.5",
      zIndex: 2,
      marginBottom: "10px"
    },
    newsDate: {
      fontSize: "14px",
      fontWeight: "400",
      opacity: 0.85
    },
    loading: {
      textAlign: "center",
      fontSize: "20px",
      color: "#0f172a"
    }
  }

  const formatDate = (pubDate) => {
    const date = new Date(pubDate)
    return date.toLocaleString("en-NG", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    })
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Entertainment News (Nigeria)</h1>

      {loading && <p style={styles.loading}>Loading...</p>}

      <div style={styles.grid}>
        {news.map((item, i) => (
          <a key={i} href={item.link} target="_blank" rel="noreferrer" style={styles.link}>
            <div
              style={styles.card}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.cardHover)}
              onMouseLeave={(e) =>
                Object.assign(e.currentTarget.style, {
                  transform: "translateY(0)",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)"
                })
              }
            >
              <h4 style={styles.newsTitle}>{item.title}</h4>
              <span style={styles.newsDate}>{formatDate(item.pubDate)}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

export default Entertainment