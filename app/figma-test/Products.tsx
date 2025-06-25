import React from 'react';

const products = Array.from({ length: 8 }).map((_, i) => ({
  id: i + 1,
  title: `Product ${i + 1}`,
  // 임시 이미지 또는 배경색
  image: 'https://via.placeholder.com/240x173?text=Product',
}));

export default function Products() {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: '#fff',
        fontFamily: 'Inter, sans-serif',
        boxSizing: 'border-box',
      }}
    >
      {/* 배너 이미지 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          height: 250,
          margin: '0 auto',
          background: '#e5e5e5',
          backgroundImage: 'url(https://via.placeholder.com/1440x368?text=Banner)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderBottomLeftRadius: 16,
          borderBottomRightRadius: 16,
          position: 'relative',
        }}
      >
        <h1
          style={{
            position: 'absolute',
            right: 40,
            top: 40,
            color: '#fff',
            fontSize: 48,
            fontWeight: 700,
            margin: 0,
            textShadow: '0 2px 8px rgba(0,0,0,0.18)',
          }}
        >
          Banner
        </h1>
      </div>

      {/* ITEMS 타이틀 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          margin: '2.5rem auto 1.5rem auto',
          padding: '0 1.5rem',
        }}
      >
        <h2
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: '#000',
            margin: 0,
          }}
        >
          ITEMS
        </h2>
      </div>

      {/* 상품 카드 그리드 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2rem',
          padding: '0 1.5rem',
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: '#d9d9d9',
              borderRadius: 12,
              overflow: 'hidden',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              minHeight: 220,
            }}
          >
            <div
              style={{
                width: '100%',
                height: 140,
                background: `url(${product.image}) center/cover no-repeat`,
              }}
            />
            <div style={{ padding: '1rem', width: '100%', textAlign: 'center' }}>
              <span style={{ fontWeight: 600, fontSize: 18 }}>{product.title}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 하단 FOOTER 및 바 */}
      <div
        style={{
          width: '100%',
          maxWidth: 1440,
          margin: '3rem auto 0 auto',
          padding: '0 1.5rem',
        }}
      >
        <div
          style={{
            width: '100%',
            height: 60,
            background: '#d9d9d9',
            borderRadius: 12,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ fontWeight: 700, fontSize: 24, color: '#000' }}>FOOTER</span>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          h1 { font-size: 32px !important; }
          h2 { font-size: 24px !important; }
        }
        @media (max-width: 600px) {
          div[style*='max-width: 1440px'] {
            max-width: 100vw !important;
            padding: 0 0.5rem !important;
          }
          h1 { font-size: 22px !important; }
          h2 { font-size: 18px !important; }
        }
      `}</style>
    </div>
  );
} 