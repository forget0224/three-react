import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
const FlowingWaterShaderExample = () => {
  const mountRef = useRef(null)
  const rendererRef = useRef(null) // 使用 ref 存储渲染器实例

  useEffect(() => {
    const init = async () => {
      const response = await fetch('../assets/noise.glsl')
      const noiseGLSL = await response.text()

      // 创建场景和相机
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 0, 5)

      // 如果渲染器实例不存在，则创建渲染器
      if (!rendererRef.current) {
        rendererRef.current = new THREE.WebGLRenderer()
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
          ${noiseGLSL}  // 引入 noise.glsl 文件内容

          float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
          }

          float fbm(vec3 pos) {
            float value = 0.0;
            float amplitude = 0.5;
            float frequency = 1.0;
            for (int i = 0; i < 5; i++) {
              value += amplitude * pnoise(pos * frequency, vec3(10.0));
              frequency *= 2.0;
              amplitude *= 0.5;
            }
            return value;
          }

          void main() {
            vec2 st = vUv;
            vec3 pos = vec3(vUv * 8.0, time);

            float noiseValue = fbm(pos);
            vec3 redColor = mix(vec3(1.0, 0.5, 0.5), vec3(1.0, 1.0, 1.0), noiseValue);
            float redNoise = random(st + time) * 0.3;
            vec3 redNoiseColor = vec3(redNoise) * vec3(1.0, 1.0, 1.0);
            vec3 baseColor = vec3(1.0, 0.0, 0.0);
            vec3 finalColor = baseColor + redColor + redNoiseColor;

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
        bgMaterial.uniforms.time.value += 0.01
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

export default FlowingWaterShaderExample
