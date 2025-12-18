// frontend/src/pages/LandingPage.jsx
import React, { useEffect, useState } from "react";
import { getSectionByKey } from "../api/sectionApi";

const LandingPage = () => {
    const [headerData, setHeaderData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const data = await getSectionByKey("header");
                console.log("Header data fetched:", data);
                setHeaderData(data.extraData || {});
            } catch (err) {
                console.error("Error fetching header:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchHeader();
    }, []);

    if (loading) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontSize: "18px",
                color: "#6B7280"
            }}>
                Loading...
            </div>
        );
    }

    if (!headerData) {
        return (
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                fontSize: "18px",
                color: "#EF4444"
            }}>
                No header data found. Please configure it in the admin panel.
            </div>
        );
    }

    return (
        <div style={{ minHeight: "100vh", fontFamily: "system-ui, sans-serif" }}>
            {/* Header Section with Dynamic Styles */}
            <section
                style={{
                    backgroundColor: headerData.bgColor || "#ffffff",
                    textAlign: headerData.textAlign || "center",
                    paddingTop: headerData.paddingTop || "40px",
                    paddingBottom: headerData.paddingBottom || "40px",
                    paddingLeft: "20px",
                    paddingRight: "20px"
                }}
            >
                <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                    {/* Header Image */}
                    {headerData.headerImageUrl && (
                        <div style={{ marginBottom: "24px" }}>
                            <img
                                src={headerData.headerImageUrl}
                                alt="Header"
                                style={{
                                    maxWidth: "100%",
                                    height: "auto",
                                    borderRadius: "10px"
                                }}
                            />
                        </div>
                    )}

                    {/* Live Text */}
                    {headerData.liveText && (
                        <div
                            style={{
                                color: headerData.liveTextColor || "#DC2626",
                                fontSize: "14px",
                                fontWeight: 600,
                                marginBottom: "12px",
                                textTransform: "uppercase",
                                letterSpacing: "0.5px"
                            }}
                        >
                            {headerData.liveText}
                        </div>
                    )}

                    {/* Main Heading */}
                    {headerData.mainHeading && (
                        <h1
                            style={{
                                color: headerData.headingColor || "#111827",
                                fontSize: headerData.headingFontSize || "32px",
                                fontWeight: headerData.headingFontWeight || "700",
                                fontFamily: headerData.headingFontFamily || "system-ui",
                                margin: "0 0 16px 0",
                                lineHeight: "1.2"
                            }}
                        >
                            {headerData.mainHeading}
                        </h1>
                    )}

                    {/* Sub Text */}
                    {headerData.subText && (
                        <p
                            style={{
                                color: headerData.subTextColor || "#6B7280",
                                fontSize: headerData.subTextFontSize || "16px",
                                margin: "0",
                                lineHeight: "1.5"
                            }}
                        >
                            {headerData.subText}
                        </p>
                    )}

                    {/* Page Heading (if exists) */}
                    {headerData.pageHeading && (
                        <h2
                            style={{
                                color: headerData.headingColor || "#111827",
                                fontSize: "24px",
                                fontWeight: "600",
                                margin: "24px 0 8px 0"
                            }}
                        >
                            {headerData.pageHeading}
                        </h2>
                    )}

                    {/* Page Subheading (if exists) */}
                    {headerData.pageSubheading && (
                        <p
                            style={{
                                color: headerData.subTextColor || "#6B7280",
                                fontSize: "16px",
                                margin: "0"
                            }}
                        >
                            {headerData.pageSubheading}
                        </p>
                    )}
                </div>
            </section>

            {/* You can add more sections here (Hero, CTA, etc.) */}
            <section style={{ padding: "40px 20px", textAlign: "center", background: "#F9FAFB" }}>
                <div style={{ maxWidth: "800px", margin: "0 auto" }}>
                    <h3 style={{ fontSize: "20px", color: "#374151", marginBottom: "12px" }}>
                        More sections coming soon...
                    </h3>
                    <p style={{ color: "#6B7280", fontSize: "14px" }}>
                        Configure other sections in the admin panel and they will appear here.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default LandingPage;
