// pages/hover.tsx
import { Howl } from 'howler'
import { useEffect, useRef } from 'react'

const HoverPage = () => {
  const soundRef = (useRef < Howl) | (null > null)

  useEffect(() => {
    // 初始化 Howl 並加載音檔
    soundRef.current = new Howl({
      src: ['../audio/kick.wav'],
    })

    return () => {
      // 組件卸載時清理音頻對象
      if (soundRef.current) {
        soundRef.current.unload()
      }
    }
  }, [])

  const playSound = () => {
    if (soundRef.current) {
      soundRef.current.play()
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
