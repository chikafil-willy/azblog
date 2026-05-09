import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

// import your images
import img1 from "../assets/imag1.png"
import img2 from "../assets/imag2.png"
import img3 from "../assets/imag3.png"

const Hero = () => {
  const images = [img1, img2, img3]
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const styles = {
    hero: {
      height: "60vh",
      color: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
      overflow: "hidden"
    },

    slide: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundImage: `url(${images[index]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      animation: "fadeSlide 1.2s ease-in-out"
    },

    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      zIndex: 1
    },

    content: {
      position: "relative",
      zIndex: 2,
      textAlign: "center",
      padding: "0 20px"
    },

    title: {
      fontSize: "42px",
      fontWeight: "500",
      color: "#ec4899" // ✅ PINK
    },

    subtitle: {
      marginTop: "10px",
      fontSize: "18px"
    },

    button: {
      display: "inline-block",
      marginTop: "25px",
      backgroundColor: "#ec4899",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      textDecoration: "none",
      fontWeight: "bold",
      transition: "0.3s"
    }
  }

  return (
    <>
      <style>
        {`
          @keyframes fadeSlide {
            0% {
              opacity: 0;
              transform: translateX(40px);
            }

            100% {
              opacity: 1;
              transform: translateX(0);
            }
          }
        `}
      </style>

      <div style={styles.hero}>
        <div key={index} style={styles.slide}></div>

        <div style={styles.overlay}></div>

        <div style={styles.content}>
          {/* ✅ PINK TITLE */}
          <h1 style={styles.title}>
            Welcome to AzBlog
          </h1>

          <p style={styles.subtitle}>
            Insights, Articles & Latest News
          </p>

          {/* ✅ VIEW ARTICLES BUTTON */}
          <Link
            to="/articles"
            style={styles.button}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#db2777")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#ec4899")
            }
          >
            View Articles
          </Link>
        </div>
      </div>
    </>
  )
}

export default Hero