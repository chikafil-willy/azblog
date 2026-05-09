import React, { useState } from "react"
import { supabase } from "../supabaseClient"

const Footer = () => {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const handleSubscribe = async () => {
    if (!email) {
      setMessage("Please enter your email")
      return
    }

    const { error } = await supabase
      .from("newsletter")
      .insert([{ email }])

    if (error) {
      // ✅ DUPLICATE EMAIL
      if (error.code === "23505") {
        setMessage("This email is already subscribed")
      } else {
        setMessage("Something went wrong")
      }
    } else {
      setMessage("Subscribed successfully!")
      setEmail("")
    }
  }

  const styles = {
    container: {
      backgroundColor: "#0f172a",
      color: "#fff",
      padding: "40px 20px",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      marginTop: "50px"
    },

    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "30px",
      marginBottom: "30px"
    },

    column: {},

    colTitle: {
      fontWeight: "bold",
      fontSize: "18px",
      marginBottom: "15px",
      borderBottom: "2px solid #38bdf8",
      display: "inline-block",
      paddingBottom: "5px"
    },

    link: {
      color: "#fff",
      textDecoration: "none",
      display: "block",
      marginBottom: "10px",
      transition: "0.2s"
    },

    contact: {
      fontSize: "14px",
      lineHeight: "1.8"
    },

    newsletter: {
      display: "flex",
      flexDirection: "column",
      marginTop: "10px"
    },

    input: {
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      marginBottom: "10px",
      outline: "none"
    },

    button: {
      padding: "10px",
      borderRadius: "5px",
      border: "none",
      backgroundColor: "#38bdf8",
      color: "#0f172a",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "0.3s"
    },

    message: {
      marginTop: "10px",
      fontSize: "14px",
      color: "#cbd5e1"
    },

    bottom: {
      borderTop: "1px solid #444",
      paddingTop: "20px",
      fontSize: "14px",
      textAlign: "center",
      color: "#aaa"
    }
  }

  const links = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Sports", path: "/sports" },
    { name: "Politics", path: "/politics" },
    { name: "Entertainment", path: "/entertainment" }
  ]

  return (
    <footer style={styles.container}>
      <div style={styles.grid}>
        {/* ABOUT */}
        <div style={styles.column}>
          <h4 style={styles.colTitle}>About AzBlog</h4>

          <p style={styles.contact}>
            AzBlog is a professional blog sharing latest news,
            articles, and insights on Sports, Politics,
            Entertainment, and more.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div style={styles.column}>
          <h4 style={styles.colTitle}>Quick Links</h4>

          {links.map((link, i) => (
            <a
              key={i}
              href={link.path}
              style={styles.link}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#38bdf8")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#fff")
              }
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* CONTACT */}
        <div style={styles.column}>
          <h4 style={styles.colTitle}>Contact Us</h4>

          <p style={styles.contact}>
            📧 Email: azblogazowue@gmail.com
            <br />
            📞 Phone: +234 803 260 8243
          </p>
        </div>

        {/* NEWSLETTER */}
        <div style={styles.column}>
          <h4 style={styles.colTitle}>Newsletter</h4>

          <p>
            Subscribe to get latest updates directly
            to your inbox.
          </p>

          <div style={styles.newsletter}>
            <input
              type="email"
              placeholder="Your email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              style={styles.button}
              onClick={handleSubscribe}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "#0ea5e9")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "#38bdf8")
              }
            >
              Subscribe
            </button>

            <p style={styles.message}>
              {message}
            </p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div style={styles.bottom}>
        &copy; {new Date().getFullYear()} AzBlog.
        All rights reserved.
      </div>
    </footer>
  )
}

export default Footer