import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import Vinyl from '@/component/vinyl';
import { gsap } from 'gsap';

const vinylData = [
  { id: 1, name: 'Vinyl 1', url: '12_vinyl_record' },
  { id: 2, name: 'Vinyl 2', url: '7_vinyl_record' },
  { id: 3, name: 'Vinyl 3', url: '10_vinyl_record' },
];

function Tab() {
  const [currentVinylIndex, setCurrentVinylIndex] = useState(0);
  const [rotationPaused, setRotationPaused] = useState(false);
  const vinylRef = useRef(null);

  const handleSwitch = (direction) => {
    setRotationPaused(false)
    if (vinylRef.current) {
      // 停止旋轉動畫
      gsap.killTweensOf(vinylRef.current.rotation);
      // 執行退場動畫
      gsap.to(vinylRef.current.position, {
        x: -20,
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
          vinylRef.current = null; 
          const nextIndex = (currentVinylIndex + direction + vinylData.length) % vinylData.length;
          setCurrentVinylIndex(nextIndex);
        },
      });
    } 
  };
  const handlePlayPause = () => {
    setRotationPaused(!rotationPaused);
  };
  return (
    <>
      <button onClick={() => handleSwitch(-1)}>上一個</button>
      <button onClick={handlePlayPause}>{rotationPaused ? '播放' : '暫停'}</button>
      <button onClick={() => handleSwitch(1)}>下一個</button>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={5} />
        <pointLight position={[-5, 5, 5]} intensity={5} />
        <Vinyl data={vinylData[currentVinylIndex]} onLoaded={(ref) => {
          vinylRef.current = ref;
        }} 
        rotationPaused={rotationPaused}
        />
      </Canvas>
    </>
  );
}

export default Tab;
