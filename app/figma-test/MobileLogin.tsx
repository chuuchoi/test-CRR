import React, { useState } from 'react';

export default function MobileLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 처리 로직
    alert(`이메일: ${email}\n비밀번호: ${password}`);
  };

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 375,
        minHeight: '100vh',
        margin: '0 auto',
        background: '#fff',
        borderRadius: 16,
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '2.5rem 1.5rem 1.5rem 1.5rem',
        fontFamily: 'Inter, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        boxSizing: 'border-box',
      }}
    >
      <h2
        style={{
          fontSize: '1.75rem', // 28px
          fontWeight: 700,
          color: '#1a1a1a',
          margin: '0 0 2.5rem 0',
          width: '100%',
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        로그인
      </h2>
      <form
        onSubmit={handleSubmit}
        style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label
            htmlFor="email"
            style={{ fontSize: '1rem', color: '#333', fontWeight: 400 }}
          >
            이메일
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              height: '2.75rem', // 44px
              borderRadius: 8,
              border: 'none',
              background: '#d9d9d9',
              padding: '0 0.75rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label
            htmlFor="password"
            style={{ fontSize: '1rem', color: '#333', fontWeight: 400 }}
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              height: '2.75rem',
              borderRadius: 8,
              border: 'none',
              background: '#d9d9d9',
              padding: '0 0.75rem',
              fontSize: '1rem',
              fontFamily: 'inherit',
              boxSizing: 'border-box',
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: '100%',
            height: '3rem', // 48px
            background: '#d9d9d9',
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.125rem', // 18px
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            marginTop: '0.5rem',
            position: 'relative',
          }}
        >
          로그ㅇ인
        </button>
      </form>
      <div
        style={{
          color: '#4d4d80',
          fontSize: '0.95rem',
          fontWeight: 400,
          lineHeight: 1.2,
          textAlign: 'center',
          marginTop: '2.5rem',
          width: '100%',
        }}
      >
        회원가입 | 비밀번호 찾기
      </div>
      <style>{`
        @media (max-width: 1200px) {
          div[style*='max-width: 375px'] {
            border-radius: 0 !important;
            min-height: 100vh !important;
            box-shadow: none !important;
            padding: 2rem 0.5rem 1rem 0.5rem !important;
          }
        }
      `}</style>
    </div>
  );
} 