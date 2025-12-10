'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function Header() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      borderBottom: '1px solid #ddd',
      padding: '0.5rem 1rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundImage: 'url(/assets/images/GPL-Banner.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        zIndex: 0
      }} />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Link 
          href="/"
          style={{
            display: 'inline-block',
            textDecoration: 'none'
          }}
        >
          <Image
            src="/assets/images/GPL-LOGO-Trans.png"
            alt="Game Plan Home"
            width={120}
            height={40}
            style={{
              objectFit: 'contain',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              opacity: isHovered ? 0.8 : 1
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </Link>
      </div>
    </header>
  )
}

