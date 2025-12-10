import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSections, updateSection } from "../api/sectionApi";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [sections, setSections] = useState([]);
  const [selectedKey, setSelectedKey] = useState("");
  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    content: "",
    imageUrl: ""
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    try {
      const data = await getSections();
      setSections(data);
      if (data.length > 0 && !selectedKey) {
        setSelectedKey(data[0].key);
        setFormFromSection(data[0]);
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const setFormFromSection = (section) => {
    setForm({
      title: section.title || "",
      subtitle: section.subtitle || "",
      content: section.content || "",
      imageUrl: section.imageUrl || ""
    });
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/login");
    } else {
      fetchSections();
    }
  }, []);

  const handleSelectChange = (e) => {
    const key = e.target.value;
    setSelectedKey(key);
    const section = sections.find((s) => s.key === key);
    if (section) setFormFromSection(section);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setMessage("");
    if (!selectedKey) return;
    try {
      const updated = await updateSection(selectedKey, form);
      setMessage("✓ Saved!");
      setSections((prev) =>
        prev.map((s) => (s.key === updated.key ? updated : s))
      );
      setTimeout(() => setMessage(""), 2000);
    } catch (err) {
      console.error(err);
      setMessage("✗ Error saving");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/login");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 220,
          background: "#111827",
          color: "white",
          padding: 16,
          boxShadow: "2px 0 8px rgba(0,0,0,0.1)"
        }}
      >
        <h2 style={{ marginBottom: 24, fontSize: 20 }}>Admin Panel</h2>
        <button
          onClick={handleLogout}
          style={{
            padding: 10,
            width: "100%",
            background: "#dc2626",
            border: "none",
            borderRadius: 4,
            color: "white",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: 14
          }}
        >
          Logout
        </button>
      </aside>

      {/* Main content */}
      <main style={{ flex: 1, padding: 24 }}>
        <h1 style={{ marginBottom: 24, color: "#111827" }}>Edit Website Sections</h1>

        {loading ? (
          <p>Loading sections...</p>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <label style={{ marginRight: 8, fontWeight: 600 }}>Select Section:</label>
              <select
                value={selectedKey}
                onChange={handleSelectChange}
                style={{
                  padding: 8,
                  borderRadius: 4,
                  border: "1px solid #ddd",
                  fontSize: 14,
                  minWidth: 200
                }}
              >
                <option value="">-- choose section --</option>
                {sections.map((s) => (
                  <option key={s._id} value={s.key}>
                    {s.key}
                  </option>
                ))}
              </select>
            </div>

            {selectedKey && (
              <div style={{ maxWidth: 700, background: "white", padding: 20, borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Title</label>
                  <input
                    style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Section title"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Subtitle</label>
                  <input
                    style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
                    name="subtitle"
                    value={form.subtitle}
                    onChange={handleChange}
                    placeholder="Section subtitle"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Content</label>
                  <textarea
                    style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, minHeight: 120, fontSize: 14, fontFamily: "monospace" }}
                    name="content"
                    value={form.content}
                    onChange={handleChange}
                    placeholder="Section content"
                  />
                </div>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Image URL</label>
                  <input
                    style={{ width: "100%", padding: 8, border: "1px solid #ddd", borderRadius: 4, fontSize: 14 }}
                    name="imageUrl"
                    value={form.imageUrl}
                    onChange={handleChange}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <button
                  onClick={handleSave}
                  style={{
                    padding: 10,
                    background: "#111827",
                    color: "white",
                    borderRadius: 4,
                    border: "none",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: 14
                  }}
                >
                  Save Changes
                </button>

                {message && (
                  <div style={{ marginTop: 12, color: message.includes("✓") ? "green" : "red", fontWeight: 600 }}>
                    {message}
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
