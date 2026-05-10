import { useEffect, useState } from "react"

const BreakingNewsBar = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    try {
      const rssUrl =
        "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en"

      // ✅ USE RSS2JSON (MORE STABLE ON VERCEL)
      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        rssUrl
      )}`

      const res = await fetch(apiUrl)
      const data = await res.json()

      if (data.status === "ok") {
        const now = new Date()

        const breaking = data.items.filter((item) => {
          const pubDate = new Date(item.pubDate)
          const diffHours = (now - pubDate) / (1000 * 60 * 60)

          return diffHours <= 6
        })

        setNews(breaking.slice(0, 10))
      } else {
        setNews([])
      }
    } catch (err) {
      console.error("News fetch error:", err)
      setNews([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchNews()
  }, [])

  const styles = {
    bar: {
      width: "100%",
      background: "#dc2626",
      color: "#fff",
      overflow: "hidden",
      display: "flex",
      alignItems: "center",
      height: "40px"
    },

    label: {
      background: "#991b1b",
      padding: "0 15px",
      fontWeight: "bold",
      height: "100%",
      display: "flex",
      alignItems: "center",
      zIndex: 2
    },

    wrapper: {
      flex: 1,
      overflow: "hidden"
    },

    track: {
      display: "inline-block",
      whiteSpace: "nowrap",
      paddingLeft: "100%",
      animation: "scroll 120s linear infinite"
    },

    link: {
      color: "#fff",
      textDecoration: "none",
      marginRight: "80px",
      fontSize: "14px"
    },

    message: {
      paddingLeft: "20px",
      fontSize: "14px"
    }
  }

  return (
    <>
      <div style={styles.bar}>
        <div style={styles.label}>NEWS UPDATE</div>

        <div style={styles.wrapper}>
          {loading ? (
            <div style={styles.message}>
              Loading breaking news...
            </div>
          ) : news.length === 0 ? (
            <div style={styles.message}>
              No breaking news available
            </div>
          ) : (
            <div style={styles.track}>
              {news.map((item, i) => (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  style={styles.link}
                >
                  🔴 {item.title}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </>
  )
}

export default BreakingNewsBar