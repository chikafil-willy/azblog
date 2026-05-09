import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"

import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Sports from "./pages/Sports"
import Politics from "./pages/Politics"
import Entertainment from "./pages/Entertainment"
import Footer from "./components/Footer"
import BreakingNewsBar from "./components/BreakingNewsBar"
import Articles from "./pages/Articles"
import AboutUs from "./pages/AboutUs"

function App() {
  // ✅ GLOBAL SEARCH STATE
  const [search, setSearch] = useState("")

  return (
    <Router>
      {/* NAVBAR */}
      <Navbar setSearch={setSearch} />

      {/* BREAKING NEWS */}
      <BreakingNewsBar />

      {/* ROUTES */}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* ✅ PASS SEARCH TO ARTICLES */}
        <Route
          path="/articles"
          element={<Articles search={search} />}
        />

        <Route path="/sports" element={<Sports />} />
        <Route path="/politics" element={<Politics />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/about" element={<AboutUs />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </Router>
  )
}

export default App