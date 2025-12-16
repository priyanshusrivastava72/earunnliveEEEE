import React, { useState } from "react";
import { Link } from "react-router-dom";

const FooterLinks = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, justifyContent: "center", padding: 28 }}>
      {/* left yellow button that toggles menu */}
      <div style={{ position: "relative" }}>
        <button onClick={() => setShowMenu(s => !s)} style={{ background: "#FBBF24", color: "#111827", padding: "10px 18px", borderRadius: 8, border: "none", fontWeight: 700, cursor: "pointer" }}>
          Footer
        </button>

        {showMenu && (
          <div style={{ position: "absolute", left: 0, top: "110%", background: "#fff", borderRadius: 8, boxShadow: "0 8px 30px rgba(0,0,0,0.12)", padding: 8, width: 220, zIndex: 1000 }}>
            <Link to="/terms" style={{ display: "block", padding: 8, textDecoration: "none", color: "#111827" }}>Terms and Conditions</Link>
            <Link to="/privacy" style={{ display: "block", padding: 8, textDecoration: "none", color: "#111827" }}>Privacy Policy</Link>
            <Link to="/refund" style={{ display: "block", padding: 8, textDecoration: "none", color: "#111827" }}>Refund Policy</Link>
          </div>
        )}
      </div>

      {/* the usual text links on footer (center/right) */}
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/terms" style={{ color: "#374151", textDecoration: "underline" }}>Terms and Conditions</Link>
        <span>•</span>
        <Link to="/privacy" style={{ color: "#374151", textDecoration: "underline" }}>Privacy Policy</Link>
        <span>•</span>
        <Link to="/refund" style={{ color: "#374151", textDecoration: "underline" }}>Refund Policy</Link>
      </div>
    </div>
  );
};

export default FooterLinks;
