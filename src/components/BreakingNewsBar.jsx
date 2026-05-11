import { useEffect, useState } from "react"

const BreakingNewsBar = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    try {
      // NIGERIAN BREAKING NEWS
      const rssUrl =
        "https://news.google.com/rss/search?q=Nigeria&hl=en-NG&gl=NG&ceid=NG:en"

      const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
        rssUrl
      )}`

      const res = await fetch(apiUrl)
      const data = await res.json()

      if (data.status === "ok") {
        const now = new Date()

        const breaking = data.items.filter((item) => {
          const pubDate = new Date(item.pubDate)

          const diffHours =
            (now - pubDate) / (1000 * 60 * 60)

          return diffHours <= 12
        })

        setNews(breaking.slice(0, 12))
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
      height: "42px"
    },

    label: {
      background: "#991b1b",
      padding: "0 18px",
      fontWeight: "bold",
      height: "100%",
      display: "flex",
      alignItems: "center",
      zIndex: 2,
      whiteSpace: "nowrap",
      fontSize: "14px"
    },

    wrapper: {
      flex: 1,
      overflow: "hidden",
      position: "relative"
    },

    ticker: {
      display: "flex",
      width: "max-content",
      animation: "ticker 38s linear infinite"
    },

    link: {
      color: "#fff",
      textDecoration: "none",
      marginRight: "70px",
      fontSize: "14px",
      whiteSpace: "nowrap"
    },

    message: {
      paddingLeft: "20px",
      fontSize: "14px"
    }
  }

  return (
    <>
      <div style={styles.bar}>
        {/* LABEL */}
        <div style={styles.label}>
          🔴 NEWS UPDATE
        </div>

        {/* NEWS WRAPPER */}
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
            <div
              className="ticker"
              style={styles.ticker}
            >
              {[...news, ...news].map((item, i) => (
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
          @keyframes ticker {
            0% {
              transform: translateX(0);
            }

            100% {
              transform: translateX(-50%);
            }
          }

          .ticker:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </>
  )
}

export default BreakingNewsBar