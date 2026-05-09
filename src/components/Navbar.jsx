import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import logo from "../assets/logo.png"

const Navbar = ({ setSearch }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)

      if (window.innerWidth > 768) {
        setIsOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      background: "#0f172a",
      color: "#fff",
      position: "relative",
      zIndex: 1000
    },

    leftSection: {
      display: "flex",
      alignItems: "center"
    },

    rightSection: {
      display: "flex",
      alignItems: "center",
      gap: "25px",
      marginLeft: "auto"
    },

    logoImg: {
      height: "40px",
      cursor: "pointer"
    },

    searchInput: {
      padding: "8px 12px",
      borderRadius: "6px",
      border: "none",
      outline: "none",
      width: isMobile ? "140px" : "220px", // ✅ smaller on mobile
      fontSize: "14px"
    },

    desktopLinks: {
      display: "flex",
      gap: "20px",
      alignItems: "center"
    },

    mobileLinks: {
      display: isOpen ? "flex" : "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      backgroundColor: "#0f172a",
      padding: "15px 20px",
      gap: "15px",
      zIndex: 999,
      alignItems: "flex-start"
    },

    link: (active) => ({
      color: active ? "#38bdf8" : "#fff",
      textDecoration: "none",
      cursor: "pointer",
      fontWeight: active ? "bold" : "normal"
    }),

    hamburger: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      width: "25px",
      height: "18px",
      cursor: "pointer"
    },

    bar: {
      height: "3px",
      width: "100%",
      backgroundColor: "#fff",
      borderRadius: "2px"
    }
  }

  const links = [
    { name: "Home", path: "/" },
    { name: "Articles", path: "/articles" },
    { name: "Sports", path: "/sports" },
    { name: "Politics", path: "/politics" },
    { name: "About Us", path: "/about" },
    { name: "Entertainment", path: "/entertainment" }
  ]

  return (
    <nav style={styles.nav}>
      {/* LOGO */}
      <div style={styles.leftSection}>
        <img src={logo} alt="logo" style={styles.logoImg} />
      </div>

      {/* RIGHT SIDE */}
      <div style={styles.rightSection}>
        {/* SEARCH */}
        <input
          type="text"
          placeholder="Search..."
          style={styles.searchInput}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* DESKTOP LINKS */}
        {!isMobile && (
          <div style={styles.desktopLinks}>
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                style={({ isActive }) => styles.link(isActive)}
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* MOBILE HAMBURGER */}
        {isMobile && (
          <div
            style={styles.hamburger}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
            <span style={styles.bar}></span>
          </div>
        )}
      </div>

      {/* MOBILE DROPDOWN */}
      {isMobile && (
        <div style={styles.mobileLinks}>
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              style={({ isActive }) => styles.link(isActive)}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar