import * as THREE from 'three'
import React, { useRef, useEffect } from 'react'
import fragmentShader from './shader/fragment.glsl'
import vertexShader from './shader/vertex.glsl'
import { letterData } from './data/letterdata'

export default function Sampler() {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)
  const aspectRatio = 520 / 720

  const CRT_UNIFORMS = {
    uCurvature: { value: new THREE.Vector2(3, 3) },
    uScreenResolution: {
      value: new THREE.Vector2(800 / 5, 600 / 5),
    },
    uScanLineOpacity: { value: new THREE.Vector2(0.8, 0.8) },
    uBaseColor: { value: new THREE.Color(0x757e6b).convertSRGBToLinear() },
    uLineColor: { value: new THREE.Color(0xfdfdfd).convertSRGBToLinear() },
    uVignetteOpacity: { value: 1 },
    uBrightness: { value: 8.0 },
    uVignetteRoundness: { value: 1 },
    uScreenPosition: { value: new THREE.Vector2(260, 360) }, // 根据 screen 的实际位置设置
    uScreenSize: { value: new THREE.Vector2(600, 300) }, // Screen 的宽和高
  }

  let samplerBody = '../img/sp404body.jpg'
  let buttonBody = '../img/sp404body.jpg'
  useEffect(() => {
    const init = () => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000)
      camera.position.set(0, 0, 20)

      if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ alpha: true })
        rendererRef.current.setSize(520, 720)
        if (mountRef.current) {
          mountRef.current.appendChild(rendererRef.current.domElement)
        }
      }
      rendererRef.current.localClippingEnabled = true
      scene.background = null
      const bodyTextureLoader = new THREE.TextureLoader()
      const bodyGeometry = new THREE.BoxGeometry(12, 20, 1)
      // const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 })
      const bodyMaterial = new THREE.MeshStandardMaterial({
        map: bodyTextureLoader.load(samplerBody),
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      scene.add(body)

      const screenGeometry = new THREE.PlaneGeometry(6, 3)
      screenGeometry.computeBoundingBox()

      const screenShaderMaterial = new THREE.ShaderMaterial({
        blending: THREE.NoBlending,
        side: THREE.DoubleSide,
        uniforms: CRT_UNIFORMS,
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
      })

      const screen = new THREE.Mesh(screenGeometry, screenShaderMaterial)
      screen.position.set(0, 5, 0.6)

      scene.add(screen)

      const screenWidth = 6
      const leftBoundary = -screenWidth / 2
      const rightBoundary = screenWidth / 2
      const screenCenterLeftX = 0.3
      const screenCenterRightX = -0.3
      const clippingPlanes = [
        new THREE.Plane(
          new THREE.Vector3(1, 0, 0),
          -(screenCenterLeftX - screenWidth / 2),
        ),
        new THREE.Plane(
          new THREE.Vector3(-1, 0, 0),
          screenCenterRightX + screenWidth / 2,
        ),
      ]
      function createTextMesh(
        text,
        letterData,
        spacing = 0.1,
        pointSize = 0.1,
      ) {
        const points = []
        let xOffset = 0

        for (let char of text.toUpperCase()) {
          const data = letterData[char]
          if (data) {
            for (let i = 0; i < data.length; i++) {
              for (let j = 0; j < data[i].length; j++) {
                if (data[i][j] === 1) {
                  // 翻轉Y軸
                  const flippedY = data.length - 1 - i
                  points.push(
                    new THREE.Vector3(
                      j * spacing + xOffset,
                      flippedY * spacing,
                      0,
                    ),
                  )
                }
              }
            }
            xOffset += (data[0].length + 1) * spacing
          }
        }

        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        geometry.computeBoundingBox() // 計算文字的邊界盒
        const material = new THREE.PointsMaterial({
          size: pointSize,
          color: 0x000000,
          sizeAttenuation: false, // 保持點的大小固定，不會隨距離改變
          clippingPlanes: clippingPlanes,
          clipShadows: true,
        })

        const textMesh = new THREE.Points(geometry, material)

        return textMesh
      }

      // 文字網格
      const textMesh = createTextMesh('HUGO - DOUGOT', letterData, 0.1, 4)
      textMesh.position.set(rightBoundary, 4.8, 0.6)
      scene.add(textMesh)

      const buttonGroup = new THREE.Group()
      const buttonGeometry = new THREE.BoxGeometry(2, 1, 1.5)
      // const buttonMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
      const buttonBodyTextureLoader = new THREE.TextureLoader()
      const buttonMaterial = new THREE.MeshStandardMaterial({
        map: bodyTextureLoader.load(buttonBodyTextureLoader),
      })
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const button = new THREE.Mesh(buttonGeometry, buttonMaterial)
          button.rotation.x = Math.PI / 2
          button.position.set(-3 + i * 2.5, -3 + j * 2.5, 0.6)
          buttonGroup.add(button)
        }
      }
      buttonGroup.position.set(-0.75, -4.5)
      scene.add(buttonGroup)

      //旋鈕
      const knobGroup = new THREE.Group()
      const knobGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.2, 32)
      const knobMaterial = new THREE.MeshStandardMaterial({ color: 0x888888 })

      // 橢圓背景
      const shape = new THREE.Shape()
      const width = 8,
        height = 1,
        radius = 0.5

      // 左上
      shape.moveTo(-width / 2 + radius, height / 2)
      // 上邊
      shape.lineTo(width / 2 - radius, height / 2)
      // 右上
      shape.quadraticCurveTo(
        width / 2,
        height / 2,
        width / 2,
        height / 2 - radius,
      )
      // 右邊
      shape.lineTo(width / 2, -height / 2 + radius)
      // 右下
      shape.quadraticCurveTo(
        width / 2,
        -height / 2,
        width / 2 - radius,
        -height / 2,
      )
      // 下邊
      shape.lineTo(-width / 2 + radius, -height / 2)
      // 左下
      shape.quadraticCurveTo(
        -width / 2,
        -height / 2,
        -width / 2,
        -height / 2 + radius,
      )
      // 左邊
      shape.lineTo(-width / 2, height / 2 - radius)
      // 左上
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
      knobGroup.add(base)

      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const knob = new THREE.Mesh(knobGeometry, knobMaterial)
          knob.rotation.x = Math.PI / 2
          knob.position.set(-4.5 + i * 2, 4, 1)
          knobGroup.add(knob)
        }
      }

      knobGroup.position.set(1.5, 4)
      scene.add(knobGroup)

      const playButtonGroup = new THREE.Group()

      const playButtonGeometry = new THREE.BoxGeometry(1.5, 1, 1)
      const playButtonMaterial = new THREE.MeshStandardMaterial({
        color: 0xff55dd,
      })
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const playButton = new THREE.Mesh(
            playButtonGeometry,
            playButtonMaterial,
          )
          playButton.rotation.x = Math.PI / 2
          playButton.position.set(-4.5 + i * 2, 4, 1)
          playButtonGroup.add(playButton)
        }
      }
      playButtonGroup.position.set(1.5, -2)
      scene.add(playButtonGroup)

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
      directionalLight.position.set(0, 10, 20)
      directionalLight.castShadow = true
      scene.add(directionalLight)
      let speed = 0.04
      const animate = () => {
        requestAnimationFrame(animate)
        textMesh.position.x -= 0.02

        // 當文字完全移出左邊界時，重新放置到右邊界
        const textWidth =
          textMesh.geometry.boundingBox.max.x -
          textMesh.geometry.boundingBox.min.x
        if (textMesh.position.x + textWidth < leftBoundary) {
          textMesh.position.x = rightBoundary
        }

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
