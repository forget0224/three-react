import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const OldTVShaderExample = () => {
  const mountRef = useRef(null)
  const rendererRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 0, 5)

      if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer({ antialias: true })
        rendererRef.current.setPixelRatio(window.devicePixelRatio)
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
        if (mountRef.current) {
          mountRef.current.appendChild(rendererRef.current.domElement)
        }
      }

      const bgGeometry = new THREE.PlaneGeometry(
        window.innerWidth / 100,
        window.innerHeight / 100,
      )

      const bgMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          uniform float time;

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          float noise(vec2 st) {
            return random(st * time);
          }

          void main() {
            vec2 st = vUv;

            // 靜態噪點效果
            float staticNoise = random(st + time);

            // 模擬橫向掃描線效果
            float scanline = smoothstep(0.0, 0.1, sin(st.y * 300.0 + time * 10.0));

            // 模擬RGB扭曲效果
            vec3 colorShift = vec3(
              random(st + vec2(0.0, time * 0.1)), 
              random(st + vec2(1.0, time * 0.1)), 
              random(st + vec2(2.0, time * 0.1))
            );

            // 讓RGB色分離效果更明顯
            vec3 finalColor = mix(vec3(staticNoise), colorShift, scanline * 0.3);

            // 隨機的亮度抖動效果
            finalColor += vec3(0.1 * random(st * time * 10.0));

            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
        uniforms: {
          time: { value: 1.0 },
        },
      })

      const plane = new THREE.Mesh(bgGeometry, bgMaterial)
      scene.add(plane)

      const animate = () => {
        requestAnimationFrame(animate)
        bgMaterial.uniforms.time.value += 0.05
        rendererRef.current.render(scene, camera)
      }

      animate()

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        rendererRef.current.setSize(window.innerWidth, window.innerHeight)
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

export default OldTVShaderExample
