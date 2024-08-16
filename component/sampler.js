import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'

export default function Sampler() {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const aspectRatio = 520 / 720

  useEffect(() => {
    const init = () => {
      // 初始化场景、相机和渲染器
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
      camera.position.set(0, 0, 20) // 调整相机位置，使得对象在视野中可见

      if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ alpha: true })
        rendererRef.current.setSize(520, 720)
        if (mountRef.current) {
          mountRef.current.appendChild(rendererRef.current.domElement)
        }
      }
      scene.background = null

      // 创建取样机的主体外壳
      const bodyGeometry = new THREE.BoxGeometry(12, 20, 1)
      const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      scene.add(body)

      // 创建显示屏
      const screenGeometry = new THREE.PlaneGeometry(6, 3)
      const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 })
      const screen = new THREE.Mesh(screenGeometry, screenMaterial)
      screen.position.set(0, 4, 0.6) // 放置在外壳上方
      scene.add(screen)

      const buttonGroup = new THREE.Group()

      // 创建按钮（简化）
      const buttonGeometry = new THREE.BoxGeometry(2, 1, 1.5)
      const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
          button.rotation.x = Math.PI / 2
          button.position.set(-3 + i * 2.5, -3 + j * 2.5, 0.6) // 增大间隔值
          buttonGroup.add(button) // 将按钮添加到群组
        }
      }
      buttonGroup.position.set(-0.75, -4.5)
      scene.add(buttonGroup)

      const knobGroup = new THREE.Group()

      // 创建旋钮（简化）
      const knobGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32)
      const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 })

      // 創建橢圓背景
      const shape = new THREE.Shape()
      const width = 8,
        height = 1,
        radius = 0.5

      // 左上角
      shape.moveTo(-width / 2 + radius, height / 2)
      // 上邊
      shape.lineTo(width / 2 - radius, height / 2)
      // 右上角
      shape.quadraticCurveTo(
        width / 2,
        height / 2,
        width / 2,
        height / 2 - radius,
      )
      // 右邊
      shape.lineTo(width / 2, -height / 2 + radius)
      // 右下角
      shape.quadraticCurveTo(
        width / 2,
        -height / 2,
        width / 2 - radius,
        -height / 2,
      )
      // 下邊
      shape.lineTo(-width / 2 + radius, -height / 2)
      // 左下角
      shape.quadraticCurveTo(
        -width / 2,
        -height / 2,
        -width / 2,
        -height / 2 + radius,
      )
      // 左邊
      shape.lineTo(-width / 2, height / 2 - radius)
      // 左上角
      shape.quadraticCurveTo(
        -width / 2,
        height / 2,
        -width / 2 + radius,
        height / 2,
      )

      // 創建平面幾何體
      const shapeGeometry = new THREE.ShapeGeometry(shape)
      const shapeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff })
      const base = new THREE.Mesh(shapeGeometry, shapeMaterial)

      // 設置位置
      base.position.set(-1.5, 4.1, 0.8) // 位於旋鈕後面，略微向後移動

      // 添加到旋鈕群組中
      knobGroup.add(base)

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const knob = new THREE.Mesh(knobGeometry, knobMaterial)
          knob.rotation.x = Math.PI / 2
          knob.position.set(-4.5 + i * 2, 4, 1) // 调整旋钮的位置，使它们在X轴上排列
          knobGroup.add(knob) // 将旋钮添加到群组
        }
      }

      knobGroup.position.set(1.5, 4) // 可以根据需要调整位置
      scene.add(knobGroup)

      // 添加环境光和方向光
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5) // 增强环境光亮度
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2) // 增强方向光亮度
      directionalLight.position.set(0, 10, 20) // 调整方向光位置
      directionalLight.castShadow = true // 使光源投射阴影
      scene.add(directionalLight)

      const animate = () => {
        requestAnimationFrame(animate)
        rendererRef.current.render(scene, camera)
      }

      animate()

      function onWindowResize() {
        const containerWidth = window.innerWidth
        const containerHeight = window.innerHeight

        // 如果屏幕宽度小于720px，使用等比例缩放
        if (containerWidth < 720) {
          const scale = containerWidth / 720
          const newHeight = scale * 520

          rendererRef.current.setSize(containerWidth, newHeight)
          camera.aspect = containerWidth / newHeight
        } else {
          rendererRef.current.setSize(720, 520)
          camera.aspect = aspectRatio
        }
        camera.updateProjectionMatrix()
      }

      window.addEventListener('resize', onWindowResize)

      return () => {
        window.removeEventListener('resize', onWindowResize)
      }
    }

    init()
  }, [])

  return <div ref={mountRef} />
}
