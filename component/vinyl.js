import React, { useRef, useEffect } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import { gsap } from 'gsap'

const Vinyl = ({ data, onLoaded }) => {
  const groupRef = useRef()
  console.log(data.url)
  const gltf = useLoader(GLTFLoader, `/assets/${data.url}.glb`)

  useEffect(() => {
    if (groupRef.current) {
      while (groupRef.current.children.length) {
        groupRef.current.remove(groupRef.current.children[0])
      }
    }
    if (groupRef.current && gltf.scene) {
      gltf.scene.rotation.set(Math.PI / 4, 0, 0)
      groupRef.current.add(gltf.scene)

      // 添加輔助工具
      const axesHelper = new THREE.AxesHelper(5)
      groupRef.current.add(axesHelper)

      const boxHelper = new THREE.BoxHelper(gltf.scene, 0xffff00)
      groupRef.current.add(boxHelper)

      // 進場動畫
      gsap.fromTo(
        groupRef.current.position,
        { x: -20 },
        {
          x: 0,
          duration: 1.5,
          ease: 'power2.inOut',
          onComplete: () => {
            // 進場完成後開始旋轉
            gsap.to(groupRef.current.rotation, {
              z: `+=${Math.PI * 2}`,
              repeat: -1,
              duration: 10, // 調整旋轉速度
              ease: 'none',
            })

            if (onLoaded) {
              onLoaded(groupRef.current) // 通知父組件進場完成
            }
          },
        },
      )
    }
  }, [gltf])

  return <group ref={groupRef} scale={[30, 30, 30]} position={[0, 0, 0]} />
}

export default Vinyl
