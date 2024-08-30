// components/ThreeScene.js
import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const ThreeScene = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    // 這段代碼僅在客戶端執行
    let scene, camera, renderer, controls

    function init() {
      // 創建場景
      scene = new THREE.Scene()

      // 創建相機
      camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.set(-10, 30, 30)

      // 創建渲染器
      renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.shadowMap.enabled = true
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      // 加入軌道控制
      controls = new OrbitControls(camera, renderer.domElement)
      controls.update()

      // 添加基本幾何體
      const boxGeometry = new THREE.BoxGeometry()
      const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 })
      const box = new THREE.Mesh(boxGeometry, boxMaterial)
      box.castShadow = true
      scene.add(box)

      const planeGeometry = new THREE.PlaneGeometry(30, 30)
      const planeMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      })
      const plane = new THREE.Mesh(planeGeometry, planeMaterial)
      plane.rotation.x = -0.5 * Math.PI
      plane.receiveShadow = true
      scene.add(plane)

      const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
      const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff })
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
      sphere.position.set(-10, 10, 0)
      sphere.castShadow = true
      scene.add(sphere)

      // 添加光源
      const ambientLight = new THREE.AmbientLight(0x333333)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(-30, 50, 0)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
      scene.add(dLightHelper)
    }

    function animate() {
      requestAnimationFrame(animate)
      controls.update()
      renderer.render(scene, camera)
    }

    init()
    animate()

    // 清理資源
    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener('resize', onWindowResize)
    }
  }, [])

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }

  return <div ref={mountRef} />
}

export default ThreeScene
