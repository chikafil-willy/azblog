const AboutUs = () => {
  const styles = {
    container: {
      padding: "40px 20px",
      maxWidth: "900px",
      margin: "0 auto",
      lineHeight: "1.7"
    },

    title: {
      fontSize: "32px",
      fontWeight: "bold",
      marginBottom: "20px"
    },

    section: {
      marginBottom: "20px",
      fontSize: "16px",
      color: "#333"
    },

    highlight: {
      fontWeight: "bold",
      color: "#0ea5e9"
    }
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>About Us</h1>

      <p style={styles.section}>
        Welcome to <span style={styles.highlight}>Az Blog</span> — your
        trusted source for the latest news, articles, and updates
        across sports, politics, and entertainment.
      </p>

      <p style={styles.section}>
        Our mission is to deliver fast, reliable, and engaging content
        that keeps you informed and connected to what matters most.
      </p>

      <p style={styles.section}>
        We cover global sports updates, breaking news, trending stories,
        and insightful articles written to keep you ahead of the curve.
      </p>

      <p style={styles.section}>
        Whether you're here for sports highlights, political updates, or
        entertainment news — we’ve got you covered.
      </p>

      <p style={styles.section}>
        Thank you for visiting Az Blog. Stay tuned for more updates!
      </p>
    </div>
  )
}

export default AboutUs