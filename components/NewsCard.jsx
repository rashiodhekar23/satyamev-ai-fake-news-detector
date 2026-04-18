"use client";
import { useRef, useState } from "react";
import Badge from "./Badge";

export default function NewsCard({ result }) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const cardRef = useRef(null);

  if (!result) return null;

  const title = result.title || "No Title";
  const verdict = result.verdict || "UNVERIFIED";
  const score = result.score || 0;
  const reason = result.reason || "No reason available";

  const borderColors = {
    FAKE: "#4a1020",
    REAL: "#0d4030",
    MISLEADING: "#4a3010",
    UNVERIFIED: "#2a2a40",
  };

  const meterColors = {
    FAKE: "#ff3b5c",
    REAL: "#00c97a",
    MISLEADING: "#ffb800",
    UNVERIFIED: "#a0a0c0",
  };

  const shareText = `🔍 SATYAMEV AI Analysis

📰 ${title}

Verdict: ${verdict}
📊 Score: ${score}/100

💬 ${reason}`;

  function shareWhatsApp() {
    const url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function shareTwitter() {
    const tweet = `🔍 "${title}" is ${verdict} (${score}/100)`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweet)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function copyResult() {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function shareNative() {
    if (navigator.share) {
      navigator.share({
        title: "Fake News Detection",
        text: shareText,
      });
    } else {
      copyResult();
    }
  }

  async function downloadPDF() {
    setDownloading(true);
    try {
      const html = `
        <html>
          <body style="font-family:sans-serif;padding:30px">
            <h2>${title}</h2>
            <h3 style="color:${meterColors[verdict]}">
              Verdict: ${verdict}
            </h3>
            <h1>${score}/100</h1>
            <p>${reason}</p>
            <hr/>
            <small>${new Date().toLocaleString()}</small>
          </body>
        </html>
      `;

      const win = window.open("", "_blank");
      win.document.write(html);
      win.document.close();
      win.print();
    } catch (err) {
      console.error(err);
    } finally {
      setDownloading(false);
    }
  }

  return (
    <div style={{ width: "100%" }}>
      <div
        ref={cardRef}
        style={{
          border: `1px solid ${borderColors[verdict]}`,
          borderRadius: "16px",
          padding: "28px",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          background: "#ffffff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2 style={{ fontSize: "18px", fontWeight: 700 }}>
            {title}
          </h2>
          <Badge verdict={verdict} />
        </div>

        <div>
          <p>Score: <b>{score}/100</b></p>
          <div style={{ height: "8px", background: "#eee", borderRadius: "10px" }}>
            <div
              style={{
                width: `${score}%`,
                height: "100%",
                background: meterColors[verdict],
              }}
            />
          </div>
        </div>

        <p style={{ color: "#555" }}>{reason}</p>
      </div>

      <div style={{ marginTop: "15px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
        <button onClick={shareWhatsApp}>WhatsApp</button>
        <button onClick={shareTwitter}>Twitter</button>
        <button onClick={shareNative}>Share</button>
        <button onClick={copyResult}>
          {copied ? "Copied!" : "Copy"}
        </button>
        <button onClick={downloadPDF} disabled={downloading}>
          {downloading ? "Generating..." : "Download PDF"}
        </button>
      </div>
    </div>
  );
}