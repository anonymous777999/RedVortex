import { useState, useEffect } from 'react'

export default function GlitchText({ text, className = '', as: Tag = 'h1', ...props }) {
  const [glitching, setGlitching] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setGlitching(true)
      setTimeout(() => setGlitching(false), 200)
    }, 3000 + Math.random() * 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Tag
      className={`glitch-text ${className}`}
      data-text={text}
      style={{
        position: 'relative',
        animation: glitching ? 'glitch 0.2s ease' : 'none',
        ...props.style,
      }}
      {...props}
    >
      {text}
      <style jsx>{`
        .glitch-text::before,
        .glitch-text::after {
          content: attr(data-text);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          opacity: 0;
        }
        .glitch-text::before {
          animation: ${glitching ? 'glitchBefore 0.2s ease' : 'none'};
          color: #22d3ee;
          clip-path: inset(20% 0 60% 0);
        }
        .glitch-text::after {
          animation: ${glitching ? 'glitchAfter 0.2s ease' : 'none'};
          color: #a78bfa;
          clip-path: inset(60% 0 10% 0);
        }
        @keyframes glitchBefore {
          0% { opacity: 0.8; transform: translate(-3px, 2px); }
          100% { opacity: 0; }
        }
        @keyframes glitchAfter {
          0% { opacity: 0.8; transform: translate(3px, -2px); }
          100% { opacity: 0; }
        }
      `}</style>
    </Tag>
  )
}
