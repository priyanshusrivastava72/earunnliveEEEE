import React from "react";
import { useNavigate } from "react-router-dom";

const LanguageSelectPage = () => {
    const navigate = useNavigate();

    const handleEnglish = () => {
        navigate("/dashboard");
    };

    const handleHindi = () => {
        navigate("/dashboard-hi");
    };

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#0f172a",
                fontFamily: "system-ui",
            }}
        >
            <div
                style={{
                    background: "#fff",
                    padding: 40,
                    borderRadius: 14,
                    width: 420,
                    textAlign: "center",
                    boxShadow: "0 20px 50px rgba(0,0,0,0.2)",
                }}
            >
                <h1 style={{ marginBottom: 8 }}>Select Language</h1>
                <p style={{ color: "#6b7280", marginBottom: 30 }}>
                    Choose admin panel language
                </p>

                <button
                    onClick={handleEnglish}
                    style={{
                        width: "100%",
                        padding: "14px 18px",
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 10,
                        border: "none",
                        background: "#fbbf24",
                        cursor: "pointer",
                        marginBottom: 14,
                    }}
                >
                    🇬🇧 English Admin
                </button>

                <button
                    onClick={handleHindi}
                    style={{
                        width: "100%",
                        padding: "14px 18px",
                        fontSize: 16,
                        fontWeight: 700,
                        borderRadius: 10,
                        border: "2px solid #fbbf24",
                        background: "transparent",
                        cursor: "pointer",
                    }}
                >
                    🇮🇳 Hindi Admin
                </button>
            </div>
        </div>
    );
};

export default LanguageSelectPage;
