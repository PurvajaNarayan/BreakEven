import React, { useState } from "react";

const containerStyle = {
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f8f9fa',
  padding: '1rem'
};

const cardStyle = {
  width: '100%',
  maxWidth: '28rem',
  backgroundColor: 'white',
  borderRadius: '6px',
  boxShadow: '0 12px 48px rgba(0,0,0,0.10)',
  border: '2px solid #000000',
  position: 'relative',
  overflow: 'hidden'
};

const headerStyle = {
  padding: '1.5rem 1.5rem 0',
  textAlign: 'center',
  paddingTop: '2rem' // Extra padding to account for zigzag
};

const contentStyle = {
  padding: '1.5rem',
  paddingBottom: '2rem' // Extra padding to account for zigzag
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const fieldStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem'
};

const inputStyle = {
  padding: '0.5rem 0.75rem',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  outline: 'none',
  transition: 'border-color 0.2s'
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#000000',
  color: 'white',
  border: '2px solid #000000',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s'
};

const linkButtonStyle = {
  padding: 0,
  color: '#3b82f6',
  backgroundColor: 'transparent',
  border: 'none',
  cursor: 'pointer',
  textDecoration: 'underline'
};

const backButtonStyle = {
  position: 'absolute',
  top: '1rem',
  left: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: '#f3f4f6',
  color: '#374151',
  border: '1px solid #d1d5db',
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'background-color 0.2s'
};

export function LoginPage({ onLogin, onBack }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
  };

  const handleInputFocus = (e) => {
    e.target.style.borderColor = '#3b82f6';
  };

  const handleInputBlur = (e) => {
    e.target.style.borderColor = '#d1d5db';
  };

  const handleButtonHover = (e) => {
    e.target.style.backgroundColor = 'white';
    e.target.style.color = '#000000';
  };

  const handleButtonLeave = (e) => {
    e.target.style.backgroundColor = '#000000';
    e.target.style.color = 'white';
  };

  const handleBackHover = (e) => {
    e.target.style.backgroundColor = '#e5e7eb';
  };

  const handleBackLeave = (e) => {
    e.target.style.backgroundColor = '#f3f4f6';
  };

  // Generate zigzag pattern for top and bottom
  const ZigzagBorder = ({ isTop = true }) => {
    const zigzagCount = 28; // Number of zigzags to fit the card width
    const zigzags = [];
    
    for (let i = 0; i < zigzagCount; i++) {
      const x = i * 10;
      const path = isTop ? `M${x} 0 l5 6 l5 -6` : `M${x} 6 l5 -6 l5 6`;
      zigzags.push(
        <path 
          key={`zz-${i}`} 
          d={path} 
          stroke="currentColor" 
          strokeWidth="1" 
          fill="none" 
        />
      );
    }

    return (
      <svg
        style={{
          position: 'absolute',
          [isTop ? 'top' : 'bottom']: 0,
          left: 0,
          right: 0,
          height: '6px',
          width: '100%',
          color: '#000000'
        }}
        viewBox="0 0 280 6"
        preserveAspectRatio="none"
      >
        {zigzags}
      </svg>
    );
  };

  return (
    <div style={containerStyle}>
      {onBack && (
        <button 
          onClick={onBack}
          style={{...backButtonStyle, fontFamily: 'var(--font-body)'}}
          onMouseEnter={handleBackHover}
          onMouseLeave={handleBackLeave}
        >
          ← Back to Welcome
        </button>
      )}
      
      <div style={cardStyle}>
        {/* Top zigzag border */}
        <ZigzagBorder isTop={true} />
        
        <div style={headerStyle}>
          <h1 className="title-medium" style={{ color: '#111827', fontFamily: 'var(--font-primary)' }}>BreakEven</h1>
          <p className="text-description" style={{ margin: 0, fontFamily: 'var(--font-body)' }}>
            Track expenses and settle debts with friends
          </p>
        </div>
        <div style={contentStyle}>
          <form onSubmit={handleSubmit} style={formStyle}>
            <div style={fieldStyle}>
              <label htmlFor="email" className="text-label" style={{ fontFamily: 'var(--font-body)' }}>Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{...inputStyle, fontFamily: 'var(--font-body)'}}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            <div style={fieldStyle}>
              <label htmlFor="password" className="text-label" style={{ fontFamily: 'var(--font-body)' }}>Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{...inputStyle, fontFamily: 'var(--font-body)'}}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                required
              />
            </div>
            <button 
              type="submit" 
              style={{...buttonStyle, fontFamily: 'var(--font-body)'}}
              onMouseEnter={handleButtonHover}
              onMouseLeave={handleButtonLeave}
            >
              Sign In
            </button>
            <div style={{ textAlign: 'center' }}>
              <button type="button" style={{...linkButtonStyle, fontFamily: 'var(--font-body)'}}>
                Don't have an account? Sign up
              </button>
            </div>
          </form>
        </div>
        
        {/* Bottom zigzag border */}
        <ZigzagBorder isTop={false} />
      </div>
    </div>
  );
}