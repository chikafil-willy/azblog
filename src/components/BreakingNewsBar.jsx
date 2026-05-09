import { useEffect, useState } from "react"

const BreakingNewsBar = () => {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchNews = async () => {
    try {
      const rssUrl =
        "https://news.google.com/rss?hl=en-NG&gl=NG&ceid=NG:en"

      const res = await fetch(
        `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`
      )

      const data = await res.json()

      const parser = new DOMParser()
      const xml = parser.parseFromString(data.contents, "text/xml")

      const items = [...xml.querySelectorAll("item")]

      const newsItems = items.map(item => ({
        title: item.querySelector("title")?.textContent,
        link: item.querySelector("link")?.textContent,
        pubDate: item.querySelector("pubDate")?.textContent
      }))

      const now = new Date()

      const breaking = newsItems.filter(item => {
        const pubDate = new Date(item.pubDate)
        const diffHours = (now - pubDate) / (1000 * 60 * 60)
        return diffHours <= 6
      })

      setNews(breaking.slice(0, 10))
      setLoading(false)
    } catch (err) {
      console.error("News fetch error:", err)
      setLoading(false)
    }
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
      animation: "scroll 120s linear infinite" // 🔥 MUCH SLOWER
    },

    link: {
      color: "#fff",
      textDecoration: "none",
      marginRight: "80px"
    }
  }

  return (
    <div style={styles.bar}>
      <div style={styles.label}>NEWS UPDATE</div>

      <div style={styles.wrapper}>
        <div style={styles.track}>
          {loading ? (
            <span>Loading breaking news...</span>
          ) : news.length === 0 ? (
            <span>No breaking news available</span>
          ) : (
            news.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noreferrer"
                style={styles.link}
              >
                🔴 {item.title}
              </a>
            ))
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
    </div>
  )
}

export default BreakingNewsBar