import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NoiseShaderExample = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      const response = await fetch('../assets/noise.glsl')
      const noiseGLSL = await response.text()

      const scene = new THREE.Scene()

      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 0, 10)

      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      const geometry = new THREE.PlaneGeometry(10, 10, 256, 256)
      // const material = new THREE.ShaderMaterial({
      //   vertexShader: `
      //     varying vec2 vUv;
      //     void main() {
      //       vUv = uv;
      //       gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      //     }
      //   `,
      //   fragmentShader: `
      //     varying vec2 vUv;
      //     uniform float time;
      //     ${noiseGLSL}
      //     void main() {
      //       vec3 color = vec3(cnoise(vec3(vUv * 10.0, time)));
      //       gl_FragColor = vec4(color, 1.0);
      //     }
      //   `,
      //   uniforms: {
      //     time: { value: 1.0 },
      //   },
      // })
      const material = new THREE.ShaderMaterial({
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
    ${noiseGLSL}  // 假设这里是你引入的 noise.glsl 文件内容

    void main() {
      vec3 period = vec3(10.0);  // 定义噪声的周期性
      float noiseValue = pnoise(vec3(vUv * 10.0, time), period);

      // 映射 noiseValue 到橘色和黑色之间
      vec3 color = mix(vec3(0.0, 0.0, 0.0), vec3(1.0, 0.5, 0.0), noiseValue);

      gl_FragColor = vec4(color, 1.0);
    }
        `,
        uniforms: {
          time: { value: 1.0 },
        },
      })

      const plane = new THREE.Mesh(geometry, material)
      scene.add(plane)

      const animate = () => {
        requestAnimationFrame(animate)
        material.uniforms.time.value += 0.01
        renderer.render(scene, camera)
      }

      animate()

      const onWindowResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
      }

      window.addEventListener('resize', onWindowResize)

      return () => {
        window.removeEventListener('resize', onWindowResize)
        if (mountRef.current) {
          mountRef.current.removeChild(renderer.domElement)
        }
      }
    }

    init()
  }, [])

  return <div ref={mountRef} />
}

export default NoiseShaderExample
