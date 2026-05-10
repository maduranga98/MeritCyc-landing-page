"use client";
import MeritLogo from "@/components/MeritLogo";

const ACCENT = "#10B981";

const COLS = [
  {
    heading: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "How It Works", href: "#how-it-works" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
  {
    heading: "Connect",
    links: [
      { label: "hello@meritcyc.com", href: "mailto:hello@meritcyc.com" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/meritcyc",
        external: true,
      },
    ],
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--navy)",
        padding: "64px 24px 32px",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 40,
            marginBottom: 56,
          }}
        >
          {/* Brand column */}
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 20,
                letterSpacing: "-0.02em",
                marginBottom: 14,
              }}
            >
              <MeritLogo size="small" /> {"               "}
              <span style={{ color: "white" }}>Merit</span>
              <span style={{ color: ACCENT }}>Cyc</span>
            </div>
            <p
              style={{
                fontSize: 13,
                color: "var(--slate-500)",
                lineHeight: 1.7,
              }}
            >
              Where merit meets budget.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.heading}>
              <h4
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "var(--slate-400)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  fontFamily: "var(--font-mono)",
                  marginBottom: 16,
                }}
              >
                {col.heading}
              </h4>
              <ul
                style={{
                  listStyle: "none",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      style={{
                        fontSize: 14,
                        color: "var(--slate-400)",
                        textDecoration: "none",
                        transition: "color 0.2s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "white")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "var(--slate-400)")
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: 28,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "var(--slate-500)" }}>
            &copy; 2026 Lumora Ventures PVT LTD. All rights reserved.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "var(--slate-500)",
              fontStyle: "italic",
              fontFamily: "var(--font-mono)",
            }}
          >
            Where merit meets budget.
          </p>
        </div>
      </div>
    </footer>
  );
}
