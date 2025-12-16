import React, { useEffect, useState } from "react";
import { getSectionByKey } from "../api/sectionApi";

const SECTION_KEY_FOOTER_PAGES = "footer_pages";

const RefundPage = () => {
  const [blocks, setBlocks] = useState([]);
  const [footerImage, setFooterImage] = useState("");
  const [copyright, setCopyright] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getSectionByKey(SECTION_KEY_FOOTER_PAGES);
        const extra = data.extraData || {};
        const refundData = extra.refund || {};
        
        setFooterImage(extra.footerImage || "");
        setCopyright(extra.copyright || "© 2025 Arunn Gupta. All rights reserved.");
        
        setBlocks(refundData.blocks || [
          { id: "b1", type: "heading", text: "Refund Policy" },
          { id: "b2", type: "paragraph", text: "No content yet." }
        ]);
      } catch (err) {
        console.warn("Refund policy not found", err);
        setFooterImage("");
        setCopyright("© 2025 Arunn Gupta. All rights reserved.");
        setBlocks([
          { id: "b1", type: "heading", text: "Refund Policy" },
          { id: "b2", type: "paragraph", text: "No content yet." }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading...</div>;

  return (
    <div style={{ padding: 36, maxWidth: 900, margin: "0 auto" }}>
      {/* Footer Image & Copyright */}
      <div style={{ textAlign: "center", marginBottom: 30 }}>
        {footerImage && (
          <img src={footerImage} style={{ width: 120, marginBottom: 10 }} />
        )}
        <div style={{ color: "#6B7280", fontSize: 14 }}>{copyright}</div>
      </div>

      {/* Content Blocks */}
      {blocks.map(block => (
        <div key={block.id}>
          {block.type === "heading" ? (
            <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>{block.text}</h1>
          ) : (
            <p style={{ color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", marginBottom: 16 }}>{block.text}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default RefundPage;
