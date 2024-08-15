// import * as THREE from 'three'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js' //滑鼠點擊可以控制
// import * as dat from 'dat.gui'
import * as THREE from 'https://esm.sh/three'
import { OrbitControls } from 'https://esm.sh/three/examples/jsm/controls/OrbitControls.js' //滑鼠點擊可以控制
import * as dat from 'https://esm.sh/dat.gui'
import { GLTFLoader } from 'https://esm.sh/three/examples/jsm/loaders/GLTFLoader.js'

const moaiUrl = new URL('./assets/moai_statue.glb', import.meta.url)

const renderer = new THREE.WebGLRenderer()
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
//40-80都可以 fieldview
//near far 0.1,1000
/*PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
fov — 摄像机视锥体垂直视野角度
aspect — 摄像机视锥体长宽比 通常是使用画布的宽/画布的高。默认值是1（正方形画布）
near — 摄像机视锥体近端面
far — 摄像机视锥体远端面*/
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
)

const orbit = new OrbitControls(camera, renderer.domElement)
const axesHelper = new THREE.AxesHelper(5)
orbit.update()
scene.add(axesHelper)
// camera.position.z=5;  //scene.add() 的时候，物体将会被添加到 (0,0,0) 坐标。但将使得摄像机和立方体彼此在一起。为了防止这种情况的发生，我们只需要将摄像机稍微向外移动一些即可
// camera.position.y=2; //才看到的三條軸
camera.position.set(-10, 30, 30) //x y z

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

const gridHelper = new THREE.GridHelper(30)

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

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
// scene.add(directionalLight)
// directionalLight.position.set(-30, 50, 0)
// directionalLight.castShadow = true
// directionalLight.shadow.camera.bottom = -12 //陰影相機的底邊界(光源陰影的底邊界) 可以控制陰影的覆蓋範圍

// const dLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(dLightHelper)

// //四條橘線是在說這個範圍的陰影是可以被渲染的
// const dLightShadowHelper = new THREE.CameraHelper(
//   directionalLight.shadow.camera,
// )
// scene.add(dLightShadowHelper)

const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)
spotLight.position.set(-100, 100, 0)
spotLight.castShadow = true
spotLight.angle = 0.2
spotLight.decay = 0 //太遠的話光會衰減  用這個的話表示衰減0??
const sLightHelper = new THREE.SpotLightHelper(spotLight)
scene.add(sLightHelper)
spotLight.intensity = 2
spotLight.distance = 200

// scene.fog = new THREE.Fog(0xffffff, 0, 200)  //線性霧從起始距離到中止距離線性淡化，顏色、近處near 開始距離、遠處far 結束距離
scene.fog = new THREE.FogExp2(0xcccccc, 0.01) //指數霧透過距離指數增加霧的密度，更真實，顏色、密度 density
//scene.fog = new RangeFog(color, near, far, density)//範圍霧 距離在一定範圍內增加霧的密度，超出範圍後霧的密度不再變化  顏色、near、far、density

// renderer.setClearColor(0xffea00) //bgcolor
const textureLoader = new THREE.TextureLoader() //texture紋理  看起來2d
// scene.background = textureLoader.load('/img/stars.png')
const cubeTextureLoader = new THREE.CubeTextureLoader() //場景是一個立方體
let stars = './img/stars2.png'
let nebula = './img/nebula2.png'

//因為是立方體 圖片尺寸要是正方形 且一樣 不然會報錯 GL_INVALID_VALUE: Each cubemap face must have equal width and height
//順序右、左、上、下、前、後
scene.background = cubeTextureLoader.load([
  nebula,
  nebula,
  nebula,
  nebula,
  nebula,
  nebula,
])

const box2Geometry = new THREE.BoxGeometry(4, 4, 4)
const box2Material = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  // map: textureLoader.load(stars),    --> 可以直接寫成 box2.material,map=textureLoader.load(stars)
})
const box2MultiMaterial = [
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(nebula) }),
  new THREE.MeshBasicMaterial({ map: textureLoader.load(stars) }),
]
// const box2 = new THREE.Mesh(box2Geometry, box2Material)
const box2 = new THREE.Mesh(box2Geometry, box2MultiMaterial)
scene.add(box2)
box2.position.set(0, 15, 10)

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10) // 後面兩個widthSegments heightSegments  要創建遊戲或是動畫
const plane2Material = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
})

const plane2 = new THREE.Mesh(plane2Geometry, plane2Material)
scene.add(plane2)
plane2.position.set(10, 10, 15)

/*plane2.geometry.attributes.position.array 是一個包含所有頂點位置的數組。這些頂點位置是以 x, y, z 的順序存儲的。換句話說，array[0] 是第一個頂點的 x 坐標，array[1] 是第一個頂點的 y 坐標，array[2] 是第一個頂點的 z 坐標。    [x,y,z,x,y,z....]  
隨機改變第一個頂點的位置 每次刷新都不一樣  如果你對其他頂點也進行類似操作，可以創建一個更加複雜和不規則的形狀。*/
plane2.geometry.attributes.position.array[0] -= 10 * Math.random()
plane2.geometry.attributes.position.array[1] -= 10 * Math.random()
plane2.geometry.attributes.position.array[2] -= 10 * Math.random()
const lastPointZ = plane2.geometry.attributes.position.array.length - 1
plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random()

const vShader = `
varying vec3 vNormal;

void main() {
  vNormal = normalize(normalMatrix * normal);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`

// 片段着色器
const fShader = `
varying vec3 vNormal;

void main() {
  gl_FragColor = vec4(0.5 ,0.5,1.0, 1.0);
}
`
const sphere2Geometry = new THREE.SphereGeometry(4)
const sphere2Material = new THREE.ShaderMaterial({
  // vertexShader: vShader,
  // fragmentShader: fShader,
  vertexShader: document.getElementById('vertexShader').textContent,
  fragmentShader: document.getElementById('fragmentShader').textContent,
})
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material)
scene.add(sphere2)
sphere2.position.set(-5, 10, 10)

const assetLoader = new GLTFLoader()
assetLoader.load(
  moaiUrl.href,
  function (gltf) {
    const model = gltf.scene
    scene.add(model)
    model.position.set(-12, 4, 10)
  },
  undefined,
  function (error) {
    console.error(error)
  },
)

const gui = new dat.GUI()
//要甚麼屬性在這裡加
const options = {
  sphereColor: '#ffea00',
  wireframe: false,
  speed: 0.01,
  angle: 0.2,
  penumbra: 0, //光暈 blur
  intensity: 1, //強度
}
gui.addColor(options, 'sphereColor').onChange(function (e) {
  sphere.material.color.set(e)
})

gui.add(options, 'wireframe').onChange(function (e) {
  sphere.material.wireframe = e
})

gui.add(options, 'speed', 0, 0.01)
gui.add(options, 'angle', 0, 1)
gui.add(options, 'penumbra', 0, 1)
gui.add(options, 'intensity', 0, 1)

let step = 0

const mousePosition = new THREE.Vector2() //vector 創建二維向量 用來存儲鼠標的 x 和 y 位置
window.addEventListener('mouseover', function (e) {
  mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1 //鼠標在窗口中的 x 軸位置，並將其轉換為一個範圍在 -1 到 1 之間的值。這是因為 Three.js 的 Raycaster 期望的是以範圍 [-1, 1] 表示的歸一化設備坐標 (NDC)。
  mousePosition.y = -(e.clientY / window.innerHeight) * 2 + 1 //注意 y 軸的計算中有一個負號，是因為屏幕坐標系與 Three.js 的坐標系在 y 軸上是相反的。
})

const rayCaster = new THREE.Raycaster()
const sphereId = sphere.id //3js 有自動給他很多屬性
box2.name = 'thebox'

function animate(time) {
  box.rotation.x = time / 1000
  box.rotation.y = time / 1000

  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))

  spotLight.angle = options.angle
  spotLight.penumbra = options.penumbra
  spotLight.intensity = options.intensity
  sLightHelper.update()

  rayCaster.setFromCamera(mousePosition, camera) //這行使用 Raycaster 生成一條從相機出發、經過鼠標位置的射線。這條射線可以用來檢測射線和場景中物體的交互
  const intersects = rayCaster.intersectObjects(scene.children) //這行代碼使用 Raycaster 來檢測射線和場景中的物體（scene.children）是否發生了碰撞。intersectObjects 方法返回一個包含所有相交物體信息的數組。
  // console.log(intersects)

  //selecting object to do something
  for (let i = 0; i < intersects.length; i++) {
    if (intersects[i].object.id === sphereId) {
      intersects[i].object.material.color.set(0xff0000)
    }

    if (intersects[i].object.name === 'thebox') {
      intersects[i].object.rotation.x = time / 1000
      intersects[i].object.rotation.y = time / 1000
    }
  }

  plane2.geometry.attributes.position.array[0] = 10 * Math.random()
  plane2.geometry.attributes.position.array[1] = 10 * Math.random()
  plane2.geometry.attributes.position.array[2] = 10 * Math.random()
  plane2.geometry.attributes.position.array[lastPointZ] = 10 * Math.random()
  plane2.geometry.attributes.position.needsUpdate = true
  renderer.render(scene, camera)
}

renderer.setAnimationLoop(animate)
window.addEventListener('resize',function(){

  camera.aspect=window.innerWidth/window.innerHeight    //aspect 是相機視椎體的長寬比（aspect ratio）
  camera.updateProjectionMatrix() //改變了相機的 aspect 屬性後，需要調用這個方法來讓相機的投影矩陣反映出最新的改變
  renderer.setSize(window.innerWidth,window.innerHeight)//更新了渲染器的大小，使其與瀏覽器窗口的大小匹配。
}
)