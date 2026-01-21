import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const logoSvg = `
<svg width="200" height="200" viewBox="0 0 200 200"
     xmlns="http://www.w3.org/2000/svg" fill="none">
  <circle cx="100" cy="100" r="78" fill="#1F8ED6"/>
  <path d="M30 100 C60 40, 140 40, 170 100"
        stroke="#A7E4FF" stroke-width="4" fill="none"/>
  <path d="M30 100 C60 160, 140 160, 170 100"
        stroke="#A7E4FF" stroke-width="4" fill="none"/>
  <g fill="#FFFFFF">
    <circle cx="60" cy="60" r="6"/>
    <circle cx="150" cy="90" r="6"/>
    <circle cx="120" cy="150" r="6"/>
  </g>
  <path d="M45 100 C65 75, 135 75, 155 100
           C135 125, 65 125, 45 100 Z"
        fill="#FFFFFF"/>
  <circle cx="100" cy="100" r="16" fill="#6EC9F5"/>
  <circle cx="100" cy="100" r="7" fill="#0A2A43"/>
  <circle cx="107" cy="93" r="4" fill="#FFFFFF"/>
</svg>
`.trim();

const logoDataUrl = `data:image/svg+xml;utf8,${encodeURIComponent(logoSvg)}`;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #f3f9ff 0%, #ffffff 55%, #e6f3ff 100%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "40px",
            background: "rgba(255, 255, 255, 0.85)",
            borderRadius: "32px",
            border: "1px solid #d8e9f8",
            padding: "36px 48px",
          }}
        >
          <img
            src={logoDataUrl}
            width={200}
            height={200}
            alt="insites logo"
          />
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <div
              style={{
                fontSize: 72,
                fontWeight: 700,
                letterSpacing: "-1px",
                color: "#0A2A43",
              }}
            >
              insites
            </div>
            <div
              style={{
                fontSize: 28,
                color: "#1F8ED6",
                maxWidth: "520px",
              }}
            >
              Digital experiences, social momentum, and AI training.
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
