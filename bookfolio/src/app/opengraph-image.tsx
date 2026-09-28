import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle, #243054 0%, #1A2340 100%)",
          fontFamily: "serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 140,
            height: 140,
            borderRadius: "50%",
            border: "3px solid #E8C77A",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 64, fontWeight: 700, color: "#D4A574" }}>B</span>
        </div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 700,
            letterSpacing: 4,
            color: "#E8C77A",
          }}
        >
          BOOKFOLIO
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 32,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#F4EAD5",
            opacity: 0.85,
          }}
        >
          3D Interactive Portfolio Codex
        </div>
      </div>
    ),
    { ...size }
  );
}
