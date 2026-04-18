"use client";
import { useTheme } from "@/app/themeContext";

export default function ThemeToggle() {
  const { dark, toggleTheme } = useTheme();

  return (
    <div
      onClick={toggleTheme}
      style={{
        width: 70,
        height: 35,
        borderRadius: 50,
        background: dark ? "#0f172a" : "#e2e8f0",
        display: "flex",
        alignItems: "center",
        padding: 5,
        cursor: "pointer",
        transition: "all 0.4s ease",
        boxShadow: "inset 0 0 5px rgba(0,0,0,0.2)",
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999
      }}
    >
      <div
        style={{
          width: 25,
          height: 25,
          borderRadius: "50%",
          background: dark ? "#facc15" : "#1e293b",
          transform: dark ? "translateX(35px)" : "translateX(0px)",
          transition: "all 0.4s ease",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 14,
          color: dark ? "#000" : "#fff"
        }}
      >
        {dark ? "☀" : "🌙"}
      </div>
    </div>
  );
}