
import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { gsap } from 'gsap';
import Vinyl from '@/component/vinyl'; 


const vinylData = [
  { id: 1, name: 'Vinyl 1',url:'12_vinyl_record' },
  { id: 2, name: 'Vinyl 2' ,url:'7_vinyl_record' },
  { id: 3, name: 'Vinyl 3' ,url:'10_vinyl_record'},

];

function Tab() {
  const [currentVinylIndex, setCurrentVinylIndex] = useState(0);
  const currentRef = useRef();
  const previousRef = useRef();
  const nextRef = useRef();

  const animateEntry = (element) => {
    if (element) {
      gsap.fromTo(
        element.position,
        { x: -10, y: 0 },
        {
          x: 0,
          y: 0,
          duration: 3,
          ease: 'power2.inOut',
        }
      );
    }
  };

  const animateExit = (element, onComplete) => {
    if (element) {
      gsap.to(element.position, {
        x: -10,
        y: 5,
        duration: 3,
        ease: 'power2.inOut',
        onComplete: onComplete,
      });
    }
  };

  const handleChangeVinyl = () => {
    const nextIndex = (currentVinylIndex + 1) % vinylData.length;
    
    if (currentRef.current && previousRef.current && nextRef.current) {
      animateExit(previousRef.current, () => {
        setCurrentVinylIndex(nextIndex);
        animateEntry(nextRef.current);
      });
    } else {
      setCurrentVinylIndex(nextIndex);
    }
  };

  useEffect(() => {
    if (currentRef.current) {
      animateEntry(currentRef.current);
    }
  }, [currentVinylIndex]);

  return (
    <>
      <button onClick={handleChangeVinyl}>切換</button>
      <Canvas style={{ width: '100vw', height: '100vh' }}>
        <ambientLight intensity={5} />
        <pointLight position={[-5, 5, 5]} intensity={5} />

        {vinylData.map((vinyl, index) => {
          const isCurrent = index === currentVinylIndex;
          const isPrevious = index === (currentVinylIndex - 1 + vinylData.length) % vinylData.length;
          const isNext = index === (currentVinylIndex + 1) % vinylData.length;

          return (
            <group
              key={vinyl.id}
              ref={isCurrent ? currentRef : isPrevious ? previousRef : isNext ? nextRef : null}
              position={[0, 0, 0]}
              visible={isCurrent}
            >
              <Vinyl data={vinyl} />
            </group>
          );
        })}
      </Canvas>
    </>
  );
}

export default Tab;

