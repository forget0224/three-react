// pages/hover.tsx

import { useEffect, useRef } from 'react'
import { Howl, Howler } from 'howler'
const HoverPage = () => {
  const soundRef = new Howl({
    src: ['/audio/kick.wav'],
  })

  const playSound = () => {
    if (soundRef) {
      soundRef.play()
    }
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Hover and Click to Play Sound</h1>
      <button
        onMouseEnter={playSound}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Hover over me!
      </button>
    </div>
  )
}

export default HoverPage
