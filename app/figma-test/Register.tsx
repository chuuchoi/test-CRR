// import Chatbot, { type Message } from "my-chatbot-lib-0";
import React, { useState } from "react";


const themeColor = "#1966e0";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 처리 로직 (예: API 호출)
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };
  
  // const [messages, setMessages] = useState<Message[]>([]);

  // const handleSend = (text: string) => {
  //   setMessages((prev) => [...prev, { from: 'user', text }]);

  //   // 가짜 응답 예시
  //   setTimeout(() => {
  //     setMessages((prev) => [...prev, { from: 'bot', text: `당신은 "${text}"라고 입력했어요.` }]);
  //   }, 500);
  // };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#f4f8fd",
      }}
    >
      {/* <Chatbot messages={messages} onSend={handleSend}/> */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(25,102,224,0.08)",
          padding: 32,
          width: 320,
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        <h2
          style={{
            color: themeColor,
            fontWeight: 700,
            fontSize: 28,
            margin: 0,
            textAlign: "center",
          }}
        >
          회원가입
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="email" style={{ color: themeColor, fontWeight: 500 }}>
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              height: 40,
              border: `1px solid ${themeColor}33`,
              borderRadius: 8,
              padding: "0 12px",
              fontSize: 16,
              background: "#fff",
              outlineColor: themeColor,
            }}
            placeholder="이메일을 입력하세요"
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <label htmlFor="password" style={{ color: themeColor, fontWeight: 500 }}>
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              height: 40,
              border: `1px solid ${themeColor}33`,
              borderRadius: 8,
              padding: "0 12px",
              fontSize: 16,
              background: "#fff",
              outlineColor: themeColor,
            }}
            placeholder="비밀번호를 입력하세요"
          />
        </div>
        <button
          type="submit"
          style={{
            height: 48,
            background: themeColor,
            color: "#fff",
            fontWeight: 700,
            fontSize: 18,
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            marginTop: 8,
            transition: "background 0.2s",
          }}
        >
          회원가입
        </button>
      </form>
    </div>
  );
} 