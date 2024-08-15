import * as THREE from 'https://esm.sh/three'
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js'

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Sets the color of the background.
renderer.setClearColor(0xfefefe)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

// Sets orbit control to move the camera around.
const orbit = new OrbitControls(camera, renderer.domElement)

// Camera positioning.
camera.position.set(6, 8, 14)
// Has to be done everytime we update the camera position.
orbit.update()
const boxGeometry = new THREE.BoxGeometry() //立方體 參數 xyz 默認 1 1 1
const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 }) //有一些自帶材質的寫法
const box = new THREE.Mesh(boxGeometry, boxMaterial) //包含物體跟材質  放在網格上
scene.add(box)
box.castShadow = true

const planeGeometry = new THREE.PlaneGeometry(30, 30) //平面的幾何 只有 x y 軸
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
}) //doubleside兩面都有
const plane = new THREE.Mesh(planeGeometry, planeMaterial)
scene.add(plane)
plane.rotation.x = -0.5 * Math.PI
plane.receiveShadow = true
// Creates a 12 by 12 grid helper.
const gridHelper = new THREE.GridHelper(12, 12)
scene.add(gridHelper)
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50) /// 4 is the radius of the sphere 球
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
}) //還沒有加光源的物件  MeshLambertMaterial霧面沒加光源的
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
scene.add(sphere)
sphere.position.set(-10, 10, 0)
sphere.castShadow = true

const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)
const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)
spotLight.position.set(-100, 100, 0)
spotLight.castShadow = true
spotLight.andle = 0.2

const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)

spotLight.intensity = 2
spotLight.distance = 200 // 設置光的影響範圍
// Creates an axes helper with an axis length of 4.
const axesHelper = new THREE.AxesHelper(4)
scene.add(axesHelper)
let step = 0
let speed = 0.01
function animate(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000

  step += speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)

window.addEventListener('resize', function () {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})
