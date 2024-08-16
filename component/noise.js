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
      //       const material = new THREE.ShaderMaterial({
      //         vertexShader: `
      //           varying vec2 vUv;
      //           void main() {
      //             vUv = uv;
      //             gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      //           }
      //         `,
      //         //     fragmentShader: `
      //         //     varying vec2 vUv;
      //         // uniform float time;
      //         // ${noiseGLSL}  // 假设这里是你引入的 noise.glsl 文件内容

      //         // void main() {
      //         //   vec3 period = vec3(25.0);  // 定义噪声的周期性
      //         //   float noiseValue = pnoise(vec3(vUv * 10.0, time), period);

      //         //   // 映射 noiseValue 到橘色和黑色之间
      //         //   vec3 color = mix(vec3(1.0, 0.2, 0.0), vec3(0.0, 0.0, 0.0), noiseValue);

      //         //   gl_FragColor = vec4(color, 1.0);
      //         // }
      //         //     `
      //         fragmentShader: `
      //   varying vec2 vUv;
      //   uniform float time;
      //   ${noiseGLSL}  // 引入 noise.glsl 文件内容
      //   vec2 st = vUv;
      // float random(vec2 st) {
      //             return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      //           }
      //   // 生成多个噪声层
      //   float fbm(vec3 pos) {
      //     float value = 0.0;
      //     float amplitude = 0.5;
      //     float frequency = 1.0;
      //     for (int i = 0; i < 5; i++) { // 5 层噪声
      //       value += amplitude * pnoise(pos * frequency, vec3(10.0));
      //       frequency *= 0.5;  // 增加频率
      //       amplitude *= 1.0;  // 减小振幅
      //     }
      //     return value;
      //   }

      //   void main() {

      //     vec3 pos = vec3(vUv * 8.0, time);

      //     // 使用 fBm 来生成更复杂的噪声
      //     float noiseValue = fbm(pos);

      //     // 映射到橘色和黑色之间
      //     vec3 color = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 1.0, 1.0), noiseValue);

      //      // 增加白色噪点层
      //     float whiteNoise = pnoise(pos * 50.0, vec3(10.0));  // 高频噪声
      //     vec3 whiteNoiseColor = vec3(1.0) * step(0.95, whiteNoise); // 白色噪点，阈值控制密度

      //     // 将白色噪点叠加到基底颜色上
      //     vec3 finalColor = color + whiteNoiseColor;
      //  float whiteNoise = random(st + time) * 0.3;
      //             finalColor += vec3(whiteNoise);
      //     gl_FragColor = vec4(finalColor, 1.0);

      //   }
      // `,

      //         //noiseValue 為0 顏色是黑色 1為橘色
      //         //mix 將 noiseValue 映射到黑色 (vec3(0.0, 0.0, 0.0)) 和橘色 (vec3(1.0, 0.5, 0.0))
      //         //vec3 period = vec3(10.0); 調整噪聲週期性
      //         //gl_FragColor = vec4(color, 1.0);
      //         uniforms: {
      //           time: { value: 0.5 },
      //         },
      //       })

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
    ${noiseGLSL}  // 引入 noise.glsl 文件内容
    
    // 随机函数
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }

    // 生成多个噪声层的函数 (fBm)
    float fbm(vec3 pos) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < 5; i++) { // 5 层噪声
        value += amplitude * pnoise(pos * frequency, vec3(10.0));
        frequency *= 1.0;  // 增加频率
        amplitude *= 1.0;  // 减小振幅
      }
      return value;
    }

    void main() {
      vec2 st = vUv;
      vec3 pos = vec3(vUv * 8.0, time);

      // 使用 fBm 来生成更复杂的噪声
      float noiseValue = fbm(pos);

      // 映射到橘色和黑色之间
      vec3 color = mix(vec3(0.5, 0.0, 0.0), vec3(1.0, 0.0, 0.0), noiseValue);

      // 增加白色噪点层
      float whiteNoise = random(st + time) * 0.3;
      vec3 whiteNoiseColor = vec3(whiteNoise);

      // 将白色噪点叠加到基底颜色上
      vec3 finalColor = color + whiteNoiseColor;

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
        uniforms: {
          time: { value: 0.5 },
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
