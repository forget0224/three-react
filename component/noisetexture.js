import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const NoiseShaderExample = () => {
  const mountRef = useRef(null)

  useEffect(() => {
    const init = async () => {
      // 獲取噪聲着色器代碼
      const response = await fetch('/assets/noise.glsl')
      const noiseGLSL = await response.text()

      // 初始化場景
      const scene = new THREE.Scene()

      // 初始化相機
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000,
      )
      camera.position.set(0, 0, 10)

      // 初始化渲染器
      const renderer = new THREE.WebGLRenderer()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (mountRef.current) {
        mountRef.current.appendChild(renderer.domElement)
      }

      // 加載紋理
      const textureLoader = new THREE.TextureLoader()
      const texture = textureLoader.load('/img/noisetexture2.jpg')

      // 創建平面幾何體
      const geometry = new THREE.PlaneGeometry(10, 10, 256, 256)

      // 創建著色器材質
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
          uniform sampler2D myTexture;
          ${noiseGLSL}  // 这里是你引入的 noise.glsl 文件内容
      
          void main() {
            vec3 period = vec3(25.0);  // 定义噪声的周期性
            float noiseValue = pnoise(vec3(vUv * 10.0, time), period);
      
            // 映射 noiseValue 到橘色和黑色之间
            vec3 color = mix(vec3(1.0, 0.4, 0.0), vec3(1.0,1.0, 1.0), noiseValue);
            
            // 取样纹理颜色
            vec4 texColor = texture2D(myTexture, vUv);
      
            // 将纹理颜色与噪声颜色混合
            vec3 finalColor = mix(color, texColor.rgb, 0.5);
      
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
        uniforms: {
          time: { value: 0.5 },
          myTexture: { value: texture },
        },
      })

      // 創建平面網格
      const plane = new THREE.Mesh(geometry, material)
      scene.add(plane)

      // 動畫函數
      const animate = () => {
        requestAnimationFrame(animate)
        material.uniforms.time.value += 0.01
        renderer.render(scene, camera)
      }

      animate()

      // 處理窗口大小變化
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
