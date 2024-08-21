import React from 'react'
import { Canvas } from '@react-three/fiber'
import Vinyl from '@/component/vinyl'

function Tab() {
  return (
    <Canvas style={{ width: '100vw', height: '100vh' }} >
      <ambientLight intensity={5} />
      <pointLight position={[-5, 5, 5]} intensity={5} />
      <Vinyl />
    </Canvas>
  )
}

export default Tab
