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
    uScanLineOpacity: { value: new THREE.Vector2(0.5, 0.5) },
    uBaseColor: { value: new THREE.Color(0.1, 0.1, 0.1).convertSRGBToLinear() },
    uColor: { value: new THREE.Color(0.0, 0.0, 0.0).convertSRGBToLinear() },
    uVignetteOpacity: { value: 1 },
    uBrightness: { value: 2.5 },
    uVignetteRoundness: { value: 1 },
  }

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
      scene.background = null

      const bodyTextureLoader = new THREE.TextureLoader()
      const bodyGeometry = new THREE.BoxGeometry(12, 20, 1)
      const bodyMaterial = new THREE.MeshStandardMaterial({
        map: bodyTextureLoader.load('../img/sp404body.jpg'),
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      scene.add(body)

      const screenGeometry = new THREE.PlaneGeometry(6, 3)
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
        const material = new THREE.PointsMaterial({
          size: pointSize,
          color: 0x000000,
        })
        const textMesh = new THREE.Points(geometry, material)

        return textMesh
      }

      // 文字網格
      const textMesh = createTextMesh('HUGO - DOUGOT', letterData, 0.2, 0.2)
      textMesh.position.set(-5, 4.5, 0.6)
      scene.add(textMesh)

      const ambientLight = new THREE.AmbientLight(0xffffff, 1.5)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2)
      directionalLight.position.set(0, 10, 20)
      directionalLight.castShadow = true
      scene.add(directionalLight)

      const animate = () => {
        requestAnimationFrame(animate)
        rendererRef.current.render(scene, camera)
      }

      animate()

      function onWindowResize() {
        const containerWidth = window.innerWidth

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
