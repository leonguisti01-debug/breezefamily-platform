import Image from "next/image";

export default function TTSV2Page() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#07141d 0%,#10111f 55%,#1b0b19 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Cyan Glow */}
      <div
        style={{
          position: "absolute",
          top: -200,
          left: -250,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "#00F2FF",
          opacity: .15,
          filter: "blur(180px)",
        }}
      />

      {/* Pink Glow */}
      <div
        style={{
          position: "absolute",
          right: -250,
          bottom: -200,
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "#FF007A",
          opacity: .15,
          filter: "blur(180px)",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: 900,
          textAlign: "center",
          position: "relative",
          zIndex: 2,
          padding: "180px 20px 80px",
        }}
      >
        <Image
          src="/TTSV2/logo.png"
          alt="TikTok Stars"
          width={900}
          height={500}
          priority
          style={{
            width: "min(560px,80vw)",
            height: "auto",
            margin: "0 auto 25px",
            display: "block",
            filter:
              "drop-shadow(0 0 30px rgba(0,242,255,.25)) drop-shadow(0 0 45px rgba(255,0,122,.20))",
          }}
        />

        <div
          style={{
            color: "#00F2FF",
            letterSpacing: 6,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 18,
          }}
        >
          SEASON 2
        </div>

        <h1
          style={{
            color: "#fff",
            margin: 0,
            fontWeight: 900,
            lineHeight: 1,
            fontSize: "clamp(2rem,3.5vw,3.5rem)",
          }}
        >
          GO VIRAL.
          <br />
          BECOME A STAR.
        </h1>

        <p
          style={{
            color: "#bfc7d3",
            marginTop: 20,
            marginBottom: 35,
            fontSize: "1.05rem",
          }}
        >
          South Africa's biggest TikTok talent competition.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <button
            style={{
              background: "#00F2FF",
              color: "#000",
              border: "none",
              borderRadius: 999,
              padding: "18px 42px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            ENTER NOW
          </button>

          <button
            style={{
              background: "rgba(255,255,255,.05)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.15)",
              borderRadius: 999,
              padding: "18px 42px",
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            WATCH TRAILER
          </button>
        </div>
      </div>
    </main>
  );
}