// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

// const AudioVisualizer = () => {
//   const mountRef = useRef(null);

//   useEffect(() => {
//     let scene, camera, renderer, controls, textMesh, noiseMaterial, planeMesh;

//     function init() {
//       // 創建場景
//       scene = new THREE.Scene();

//       // 創建相機
//       camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//       camera.position.z = 50;

//       // 創建渲染器
//       renderer = new THREE.WebGLRenderer();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       mountRef.current.appendChild(renderer.domElement);

//       // 加入軌道控制
//       controls = new OrbitControls(camera, renderer.domElement);

//       // 創建平面幾何體
//       const planeGeometry = new THREE.PlaneGeometry(100, 100, 256, 256);
      
//       // 創建雜訊材質
//       const vertexShader = `
//         varying vec2 vUv;
//         void main() {
//           vUv = uv;
//           gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//         }
//       `;

//       const fragmentShader = `
//         varying vec2 vUv;
//         uniform float time;

//         float random(vec2 st) {
//           return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
//         }

//         float noise(vec2 st) {
//           vec2 i = floor(st);
//           vec2 f = fract(st);

//           float a = random(i);
//           float b = random(i + vec2(1.0, 0.0));
//           float c = random(i + vec2(0.0, 1.0));
//           float d = random(i + vec2(1.0, 1.0));

//           vec2 u = f * f * (3.0 - 2.0 * f);

//           return mix(a, b, u.x) +
//                   (c - a) * u.y * (1.0 - u.x) +
//                   (d - b) * u.x * u.y;
//         }

//         void main() {
//           vec2 st = vUv * 3.0;
//           float n = noise(st + time * 0.1);
//           gl_FragColor = vec4(vec3(n), 1.0);
//         }
//       `;

//       noiseMaterial = new THREE.ShaderMaterial({
//         vertexShader,
//         fragmentShader,
//         uniforms: {
//           time: { value: 1.0 },
//         }
//       });

//       planeMesh = new THREE.Mesh(planeGeometry, noiseMaterial);
//       scene.add(planeMesh);

//       // 加載字體並創建文字
//       const loader = new FontLoader();
//       loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
//         const textGeometry = new TextGeometry('HUGO', {
//           font: font,
//           size: 5,
//           height: 1,
//         });
//         const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
//         textMesh = new THREE.Mesh(textGeometry, textMaterial);
//         textMesh.position.set(-15, 0, 0);
//         scene.add(textMesh);
//       });

//       // 自動調整視窗大小
//       window.addEventListener('resize', onWindowResize);
//     }

//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     }

//     function animate() {
//       requestAnimationFrame(animate);

//       // 動態更新雜訊效果
//       noiseMaterial.uniforms.time.value += 0.05;

//       renderer.render(scene, camera);
//     }

//     // 初始化並開始動畫
//     init();
//     animate();

//     return () => {
//       // 清理資源
//       mountRef.current.removeChild(renderer.domElement);
//       window.removeEventListener('resize', onWindowResize);
//     };
//   }, []);

//   return <div ref={mountRef} />;
// };

// export default AudioVisualizer;
// import React, { useEffect, useRef } from 'react'
// import * as THREE from 'three'
// import { OrbitControls } from 'three'
// import * as dat from 'dat.gui'

// const SphereScene = () => {
//   const mountRef = useRef(null)

//   useEffect(() => {
//     let scene, camera, renderer, controls, sphere, gui, box, plane

//     function init() {
//       // 创建场景
//       scene = new THREE.Scene()

//       // 创建相机
//       camera = new THREE.PerspectiveCamera(
//         75,
//         window.innerWidth / window.innerHeight,
//         0.1,
//         1000,
//       )
//       camera.position.set(-10, 30, 30)

//       // 创建渲染器
//       renderer = new THREE.WebGLRenderer()
//       renderer.setSize(window.innerWidth, window.innerHeight)
//       renderer.shadowMap.enabled = true
//       if (mountRef.current) {
//         mountRef.current.appendChild(renderer.domElement)
//       }

//       // 加入轨道控制
//       controls = new OrbitControls(camera, renderer.domElement)
//       controls.update()

//       // 添加坐标轴辅助器
//       const axesHelper = new THREE.AxesHelper(5)
//       scene.add(axesHelper)

//       // 创建立方体
//       const boxGeometry = new THREE.BoxGeometry()
//       const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
//       box = new THREE.Mesh(boxGeometry, boxMaterial)
//       scene.add(box)

//       // 创建平面
//       const planeGeometry = new THREE.PlaneGeometry(30, 30)
//       const planeMaterial = new THREE.MeshStandardMaterial({
//         color: 0xffffff,
//         side: THREE.DoubleSide,
//       })
//       plane = new THREE.Mesh(planeGeometry, planeMaterial)
//       plane.rotation.x = -0.5 * Math.PI
//       plane.receiveShadow = true
//       scene.add(plane)

//       // 创建球体
//       const sphereGeometry = new THREE.SphereGeometry(4, 50, 50)
//       const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff })
//       sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
//       sphere.position.set(-10, 10, 0)
//       scene.add(sphere)

//       // 添加光源
//       const ambientLight = new THREE.AmbientLight(0x333333)
//       scene.add(ambientLight)

//       const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
//       directionalLight.position.set(-30, 50, 0)
//       scene.add(directionalLight)

//       const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
//       scene.add(dLightHelper)

//       // 创建 GUI 控制器
//       gui = new dat.GUI()
//       const options = {
//         sphereColor: '#ffea00',
//         wireframe: false,
//       }
//       gui.addColor(options, 'sphereColor').onChange(function (e) {
//         sphere.material.color.set(e)
//       })

//       gui.add(options, 'wireframe').onChange(function (e) {
//         sphere.material.wireframe = e
//       })

//       // 监听窗口大小变化
//       window.addEventListener('resize', onWindowResize)
//     }

//     function onWindowResize() {
//       camera.aspect = window.innerWidth / window.innerHeight
//       camera.updateProjectionMatrix()
//       renderer.setSize(window.innerWidth, window.innerHeight)
//     }

//     function animate(time) {
//       requestAnimationFrame(animate)

//       // 立方体旋转
//       box.rotation.x = time / 1000
//       box.rotation.y = time / 1000

//       // 球体上下移动
//       let step = (time / 1000) * 0.5
//       sphere.position.y = 10 * Math.abs(Math.sin(step))

//       renderer.render(scene, camera)
//     }

//     // 初始化并开始动画
//     init()
//     animate()

//     // 清理资源
//     return () => {
//       if (mountRef.current) {
//         mountRef.current.removeChild(renderer.domElement)
//       }
//       gui.destroy()
//       window.removeEventListener('resize', onWindowResize)
//     }
//   }, [])

//   return <div ref={mountRef} />
// }

// export default SphereScene

import React from 'react'
import ThreeScene from './aaa'
export default function index() {
  return (
    <ThreeScene/>
  )
}
