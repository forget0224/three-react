import React, { useRef, useEffect } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
const Vinyl = ({data}) => {
  const modelRef = useRef()
  const groupRef = useRef()
  const gltf = useLoader(GLTFLoader, `/assets/${data.url}.glb`)

  useEffect(() => {
    if (groupRef.current && gltf.scene) {
      
      gltf.scene.rotation.set(Math.PI / 4, 0, 0) 


      groupRef.current.add(gltf.scene) 

  
      const axesHelper = new THREE.AxesHelper(5) 
      groupRef.current.add(axesHelper)

   
      const boxHelper = new THREE.BoxHelper(gltf.scene, 0xffff00) 
      groupRef.current.add(boxHelper)
    }
  }, [gltf, groupRef])

  useFrame(() => {
    if (groupRef.current) {
      const rotationSpeed = 0.01

     
      groupRef.current.rotation.z -= rotationSpeed
    }
  })
  return (
    // <primitive
    //   ref={modelRef}
    //   object={gltf.scene}
    //   position={[-2, 0, 0]} // 中心位置
    //   scale={[30, 30, 30]} // 調整模型的縮放
    // />
    <group ref={groupRef} scale={[30, 30, 30]} position={[-2, 0, 0]}>
    
    </group>
  )
}

export default Vinyl
