// import React, { useEffect, useMemo, useRef, useState } from "react";

// function useIsMobile() {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   return isMobile;
// }

// function useScrollProgress(sectionRef) {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const el = sectionRef.current;
//     if (!el) return;

//     const onScroll = () => {
//       const rect = el.getBoundingClientRect();
//       const viewportH = window.innerHeight;
//       const total = rect.height - viewportH;
//       const y = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
//       const p = total > 0 ? y / total : 0;
//       setProgress(Math.min(Math.max(p, 0), 1));
//     };

//     onScroll();
//     window.addEventListener("scroll", onScroll, { passive: true });
//     window.addEventListener("resize", onScroll);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, [sectionRef]);

//   return progress;
// }

// const sectionStyle = {
//   position: 'relative',
//   height: '300vh'
// };

// const stickyStageStyle = {
//   position: 'sticky',
//   top: 0,
//   height: '100vh',
//   overflow: 'hidden',
//   backgroundColor: '#ffffff',
//   color: '#000000'
// };

// const centerGridStyle = {
//   position: 'absolute',
//   inset: 0,
//   display: 'grid',
//   placeItems: 'center'
// };

// const brandContainerStyle = {
//   position: 'absolute',
//   left: '50%',
//   top: '50%',
//   textAlign: 'center'
// };

// const titleStyle = {
//   fontSize: '4rem',
//   fontWeight: '800',
//   letterSpacing: '-0.025em',
//   margin: 0
// };

// const linkStyle = {
//   marginTop: '12px',
//   display: 'inline-block',
//   fontSize: '0.875rem',
//   textDecoration: 'underline',
//   textDecorationThickness: '2px',
//   textUnderlineOffset: '4px',
//   color: 'inherit'
// };

// const helperTextStyle = {
//   position: 'absolute',
//   top: '32px',
//   left: '50%',
//   transform: 'translateX(-50%)',
//   fontSize: '0.875rem',
//   color: '#666666'
// };

// const helperTextPStyle = {
//   textTransform: 'uppercase',
//   letterSpacing: '0.1em',
//   margin: 0
// };

// // Media query for mobile
// const getMobileStyles = (isMobile) => ({
//   title: {
//     ...titleStyle,
//     fontSize: isMobile ? '3rem' : '5rem'
//   }
// });

// export function BillSplitSection({ className = '', style = {} }) {
//   const sectionRef = useRef(null);
//   const progress = useScrollProgress(sectionRef);
//   const isMobile = useIsMobile();

//   // Animation phases
//   // 0.00 - 0.25: Intro bill floats
//   // 0.25 - 0.65: Bill splits apart
//   // 0.50 - 0.90: Pieces distribute to friends
//   // 0.70 - 1.00: Logo reveals

//   const splitP = useMemo(() => {
//     const start = 0.25;
//     const end = 0.65;
//     const t = (progress - start) / (end - start);
//     return Math.min(Math.max(t, 0), 1);
//   }, [progress]);

//   const distributeP = useMemo(() => {
//     const start = 0.5;
//     const end = 0.9;
//     const t = (progress - start) / (end - start);
//     return Math.min(Math.max(t, 0), 1);
//   }, [progress]);

//   const brandP = useMemo(() => {
//     const start = 0.35;
//     const end = 0.7;
//     const t = (splitP - start) / (end - start);
//     return Math.min(Math.max(t, 0), 1);
//   }, [splitP]);

//   const mobileStyles = getMobileStyles(isMobile);

//   return (
//     <section 
//       id="top" 
//       ref={sectionRef} 
//       className={className}
//       style={{...sectionStyle, ...style}}
//     >
//       {/* Sticky stage */}
//       <div style={stickyStageStyle}>
//         <div style={centerGridStyle}>
//           {/* Bill */}
//           <BillSVG splitP={splitP} floatP={1 - splitP} distributeP={distributeP} />

//           {/* Brand between halves */}
//           <div
//             style={{
//               ...brandContainerStyle,
//               opacity: brandP,
//               transform: `translate(-50%, -50%) scale(${0.95 + brandP * 0.05})`,
//             }}
//           >
//             <h1 style={mobileStyles.title}>BreakEven</h1>
//             <a href="#top" style={linkStyle}>
//               Try it out
//             </a>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// function FriendBadge({ name, progress, targetX, targetY }) {
//   const badgeStyle = {
//     position: 'relative',
//     transform: `translate(${targetX * progress}px, ${targetY * progress}px)`,
//     opacity: progress,
//   };

//   const circleStyle = {
//     height: '48px',
//     width: '48px',
//     borderRadius: '50%',
//     border: '1px solid rgba(0, 0, 0, 0.6)',
//     display: 'grid',
//     placeItems: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.6)',
//     backdropFilter: 'blur(4px)'
//   };

//   const nameStyle = {
//     fontSize: '0.875rem',
//     fontWeight: '600'
//   };

//   const pieceStyle = {
//     position: 'absolute',
//     top: '-12px',
//     left: '-12px',
//     height: '16px',
//     width: '28px',
//     backgroundColor: 'currentColor',
//     transform: `translate(${10 - 10 * progress}px, ${-8 + 8 * progress}px) rotate(${(-15 + 15 * progress).toFixed(1)}deg)`,
//     opacity: progress,
//   };

//   return (
//     <div style={badgeStyle}>
//       <div style={circleStyle}>
//         <span style={nameStyle}>{name}</span>
//       </div>
//       {/* Incoming piece */}
//       <div style={pieceStyle} />
//     </div>
//   );
// }

// function BillSVG({ splitP, floatP, distributeP }) {
//   const floatY = Math.sin(floatP * Math.PI) * 8; // subtle float when intact
//   const spread = 280 * splitP;
//   const rotate = 8 * splitP;

//   const svgStyle = {
//     width: '95vw',
//     maxWidth: '1200px',
//     filter: 'drop-shadow(0 12px 48px rgba(0,0,0,0.10))'
//   };

//   return (
//     <svg
//       role="img"
//       aria-label="Bill splitting illustration"
//       style={svgStyle}
//       viewBox="0 0 800 320"
//     >
//       <defs>
//         <clipPath id="leftHalf">
//           <rect x="0" y="0" width="400" height="320" />
//         </clipPath>
//         <clipPath id="rightHalf">
//           <rect x="400" y="0" width="400" height="320" />
//         </clipPath>
//         <pattern id="patternStripes" patternUnits="userSpaceOnUse" width="6" height="6">
//           <rect width="6" height="6" fill="transparent" />
//           <path d="M0 6 L6 0" stroke="currentColor" strokeWidth="1" opacity="0.15" />
//         </pattern>
//       </defs>

//       {/* Left piece */}
//       <g
//         clipPath="url(#leftHalf)"
//         style={{
//           transform: `translate(${-(spread / 2)}px, ${floatY}px) rotate(${-rotate}deg)`,
//           transformOrigin: "400px 160px",
//         }}
//       >
//         <BillBody />
//       </g>

//       {/* Right piece */}
//       <g
//         clipPath="url(#rightHalf)"
//         style={{
//           transform: `translate(${spread / 2}px, ${floatY}px) rotate(${rotate}deg)`,
//           transformOrigin: "400px 160px",
//         }}
//       >
//         <BillBody />
//       </g>
//     </svg>
//   );
// }

// function BillBody() {
//   const rx = 270;
//   const ry = 20;
//   const rw = 260;
//   const rh = 300;
//   const cx = rx + rw / 2;
//   const left = rx + 18;
//   const right = rx + rw - 18;
//   const zigCount = Math.floor(rw / 10);

//   const items = [
//     { name: "Udupi Mane Masala", price: "10.99" },
//     { name: "Milk", price: "1.15" },
//     { name: "Paneer", price: "0.89" },
//     { name: "Flowers", price: "0.79" },
//     { name: "Tomatoes 1lb", price: "1.29" },
//     { name: "Bananas 1lb", price: "0.75" },
//     { name: "Apples 1lb", price: "1.20" },
//     { name: "Good Day", price: "2.19" }
//   ];

//   return (
//     <g>
//       {/* Receipt paper */}
//       <rect x={rx} y={ry} width={rw} height={rh} rx={6} fill="white" stroke="currentColor" strokeWidth={2} />

//       {/* Zigzag top */}
//       {Array.from({ length: zigCount }).map((_, i) => {
//         const x = rx + i * 10;
//         return <path key={`zt-${i}`} d={`M${x} ${ry} l5 6 l5 -6`} stroke="currentColor" strokeWidth={1} fill="none" />;
//       })}

//       {/* Title */}
//       <text x={cx} y={ry + 34} textAnchor="middle" style={{ fontFamily: 'Georgia, Times New Roman, serif', fontWeight: 700, fontStyle: 'italic', fontSize: 18 }}>
//         Shetty Mane Market
//       </text>
//       <text x={cx} y={ry + 52} textAnchor="middle" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10 }}>
//         Krishna Matha Road, 
//       </text>
//       <text x={cx} y={ry + 66} textAnchor="middle" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10 }}>
//         Udupi, Karnataka
//       </text>

//       {/* Separator */}
//       <line x1={left} y1={ry + 76} x2={right} y2={ry + 76} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />

//       {/* Items */}
//       <g style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>
//         {items.map((it, i) => {
//           const y = ry + 96 + i * 16;
//           return (
//             <g key={i}>
//               <text x={left} y={y}>{it.name}</text>
//               <text x={right} y={y} textAnchor="end">{it.price}</text>
//             </g>
//           );
//         })}
//       </g>

//       {/* TOTAL */}
//       <line x1={left} y1={ry + rh - 62} x2={right} y2={ry + rh - 62} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />
//       <text x={left} y={ry + rh - 44} style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: 700, fontSize: 11 }}>TOTAL</text>
//       <text x={right} y={ry + rh - 44} textAnchor="end" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: 700, fontSize: 12 }}>19.25</text>

//       {/* Bottom dashed */}
//       <line x1={left} y1={ry + rh - 30} x2={right} y2={ry + rh - 30} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />

//       {/* Zigzag bottom */}
//       {Array.from({ length: zigCount }).map((_, i) => {
//         const x = rx + i * 10;
//         return <path key={`zb-${i}`} d={`M${x} ${ry + rh} l5 -6 l5 6`} stroke="currentColor" strokeWidth={1} fill="none" />;
//       })}
//     </g>
//   );
// }

// export default BillSplitSection;

import React, { useEffect, useMemo, useRef, useState } from "react";

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
}

function useScrollProgress(sectionRef) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const total = rect.height - viewportH;
      const y = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? y / total : 0;
      setProgress(Math.min(Math.max(p, 0), 1));
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sectionRef]);

  return progress;
}

const sectionStyle = {
  position: 'relative',
  height: '300vh'
};

const stickyStageStyle = {
  position: 'sticky',
  top: 0,
  height: '100vh',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  color: '#000000'
};

const centerGridStyle = {
  position: 'absolute',
  inset: 0,
  display: 'grid',
  placeItems: 'center'
};

const brandContainerStyle = {
  position: 'absolute',
  left: '50%',
  top: '50%',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '4rem',
  fontWeight: '800',
  letterSpacing: '-0.025em',
  margin: 0
};

const linkStyle = {
  marginTop: '12px',
  display: 'inline-block',
  fontSize: '0.875rem',
  textDecoration: 'underline',
  textDecorationThickness: '2px',
  textUnderlineOffset: '4px',
  color: 'inherit',
  cursor: 'pointer'
};

const helperTextStyle = {
  position: 'absolute',
  top: '32px',
  left: '50%',
  transform: 'translateX(-50%)',
  fontSize: '0.875rem',
  color: '#666666'
};

const helperTextPStyle = {
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  margin: 0
};

// Media query for mobile
const getMobileStyles = (isMobile) => ({
  title: {
    ...titleStyle,
    fontSize: isMobile ? '3rem' : '5rem'
  }
});

export function BillSplitSection({ className = '', style = {}, onTryItOut }) {
  const sectionRef = useRef(null);
  const progress = useScrollProgress(sectionRef);
  const isMobile = useIsMobile();

  // Animation phases
  // 0.00 - 0.25: Intro bill floats
  // 0.25 - 0.65: Bill splits apart
  // 0.50 - 0.90: Pieces distribute to friends
  // 0.70 - 1.00: Logo reveals

  const splitP = useMemo(() => {
    const start = 0.25;
    const end = 0.65;
    const t = (progress - start) / (end - start);
    return Math.min(Math.max(t, 0), 1);
  }, [progress]);

  const distributeP = useMemo(() => {
    const start = 0.5;
    const end = 0.9;
    const t = (progress - start) / (end - start);
    return Math.min(Math.max(t, 0), 1);
  }, [progress]);

  const brandP = useMemo(() => {
    const start = 0.35;
    const end = 0.7;
    const t = (splitP - start) / (end - start);
    return Math.min(Math.max(t, 0), 1);
  }, [splitP]);

  const mobileStyles = getMobileStyles(isMobile);

  const handleTryItOut = (e) => {
    e.preventDefault();
    if (onTryItOut) {
      onTryItOut();
    }
  };

  return (
    <section 
      id="top" 
      ref={sectionRef} 
      className={className}
      style={{...sectionStyle, ...style}}
    >
      {/* Sticky stage */}
      <div style={stickyStageStyle}>
        <div style={centerGridStyle}>
          {/* Bill */}
          <BillSVG splitP={splitP} floatP={1 - splitP} distributeP={distributeP} />

          {/* Brand between halves */}
          <div
            style={{
              ...brandContainerStyle,
              opacity: brandP,
              transform: `translate(-50%, -50%) scale(${0.95 + brandP * 0.05})`,
            }}
          >
            <h1 style={mobileStyles.title}>BreakEven</h1>
            <a 
              href="#top" 
              style={linkStyle}
              onClick={handleTryItOut}
            >
              Try it out
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function FriendBadge({ name, progress, targetX, targetY }) {
  const badgeStyle = {
    position: 'relative',
    transform: `translate(${targetX * progress}px, ${targetY * progress}px)`,
    opacity: progress,
  };

  const circleStyle = {
    height: '48px',
    width: '48px',
    borderRadius: '50%',
    border: '1px solid rgba(0, 0, 0, 0.6)',
    display: 'grid',
    placeItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    backdropFilter: 'blur(4px)'
  };

  const nameStyle = {
    fontSize: '0.875rem',
    fontWeight: '600'
  };

  const pieceStyle = {
    position: 'absolute',
    top: '-12px',
    left: '-12px',
    height: '16px',
    width: '28px',
    backgroundColor: 'currentColor',
    transform: `translate(${10 - 10 * progress}px, ${-8 + 8 * progress}px) rotate(${(-15 + 15 * progress).toFixed(1)}deg)`,
    opacity: progress,
  };

  return (
    <div style={badgeStyle}>
      <div style={circleStyle}>
        <span style={nameStyle}>{name}</span>
      </div>
      {/* Incoming piece */}
      <div style={pieceStyle} />
    </div>
  );
}

function BillSVG({ splitP, floatP, distributeP }) {
  const floatY = Math.sin(floatP * Math.PI) * 8; // subtle float when intact
  const spread = 280 * splitP;
  const rotate = 8 * splitP;

  const svgStyle = {
    width: '95vw',
    maxWidth: '1200px',
    filter: 'drop-shadow(0 12px 48px rgba(0,0,0,0.10))'
  };

  return (
    <svg
      role="img"
      aria-label="Bill splitting illustration"
      style={svgStyle}
      viewBox="0 0 800 320"
    >
      <defs>
        <clipPath id="leftHalf">
          <rect x="0" y="0" width="400" height="320" />
        </clipPath>
        <clipPath id="rightHalf">
          <rect x="400" y="0" width="400" height="320" />
        </clipPath>
        <pattern id="patternStripes" patternUnits="userSpaceOnUse" width="6" height="6">
          <rect width="6" height="6" fill="transparent" />
          <path d="M0 6 L6 0" stroke="currentColor" strokeWidth="1" opacity="0.15" />
        </pattern>
      </defs>

      {/* Left piece */}
      <g
        clipPath="url(#leftHalf)"
        style={{
          transform: `translate(${-(spread / 2)}px, ${floatY}px) rotate(${-rotate}deg)`,
          transformOrigin: "400px 160px",
        }}
      >
        <BillBody />
      </g>

      {/* Right piece */}
      <g
        clipPath="url(#rightHalf)"
        style={{
          transform: `translate(${spread / 2}px, ${floatY}px) rotate(${rotate}deg)`,
          transformOrigin: "400px 160px",
        }}
      >
        <BillBody />
      </g>
    </svg>
  );
}

function BillBody() {
  const rx = 270;
  const ry = 20;
  const rw = 260;
  const rh = 300;
  const cx = rx + rw / 2;
  const left = rx + 18;
  const right = rx + rw - 18;
  const zigCount = Math.floor(rw / 10);

  const items = [
    { name: "Udupi Mane Masala", price: "10.99" },
    { name: "Milk", price: "1.15" },
    { name: "Paneer", price: "0.89" },
    { name: "Flowers", price: "0.79" },
    { name: "Tomatoes 1lb", price: "1.29" },
    { name: "Bananas 1lb", price: "0.75" },
    { name: "Apples 1lb", price: "1.20" },
    { name: "Good Day", price: "2.19" }
  ];

  return (
    <g>
      {/* Receipt paper */}
      <rect x={rx} y={ry} width={rw} height={rh} rx={6} fill="white" stroke="currentColor" strokeWidth={2} />

      {/* Zigzag top */}
      {Array.from({ length: zigCount }).map((_, i) => {
        const x = rx + i * 10;
        return <path key={`zt-${i}`} d={`M${x} ${ry} l5 6 l5 -6`} stroke="currentColor" strokeWidth={1} fill="none" />;
      })}

      {/* Title */}
      <text x={cx} y={ry + 34} textAnchor="middle" style={{ fontFamily: 'Georgia, Times New Roman, serif', fontWeight: 700, fontStyle: 'italic', fontSize: 18 }}>
        Shetty Purvaja Mane Market
      </text>
      <text x={cx} y={ry + 52} textAnchor="middle" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10 }}>
        Krishna Matha Road, 
      </text>
      <text x={cx} y={ry + 66} textAnchor="middle" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 10 }}>
        Udupi, Karnataka
      </text>

      {/* Separator */}
      <line x1={left} y1={ry + 76} x2={right} y2={ry + 76} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />

      {/* Items */}
      <g style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 11, fontVariantNumeric: 'tabular-nums' }}>
        {items.map((it, i) => {
          const y = ry + 96 + i * 16;
          return (
            <g key={i}>
              <text x={left} y={y}>{it.name}</text>
              <text x={right} y={y} textAnchor="end">{it.price}</text>
            </g>
          );
        })}
      </g>

      {/* TOTAL */}
      <line x1={left} y1={ry + rh - 62} x2={right} y2={ry + rh - 62} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />
      <text x={left} y={ry + rh - 44} style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: 700, fontSize: 11 }}>TOTAL</text>
      <text x={right} y={ry + rh - 44} textAnchor="end" style={{ fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontWeight: 700, fontSize: 12 }}>19.25</text>

      {/* Bottom dashed */}
      <line x1={left} y1={ry + rh - 30} x2={right} y2={ry + rh - 30} stroke="currentColor" strokeWidth={1} strokeDasharray="5 5" />

      {/* Zigzag bottom */}
      {Array.from({ length: zigCount }).map((_, i) => {
        const x = rx + i * 10;
        return <path key={`zb-${i}`} d={`M${x} ${ry + rh} l5 -6 l5 6`} stroke="currentColor" strokeWidth={1} fill="none" />;
      })}
    </g>
  );
}

export default BillSplitSection;