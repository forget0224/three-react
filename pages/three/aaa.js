// pages/index.js
import dynamic from 'next/dynamic'

const ThreeScene = dynamic(() => import('@/component/ThreeScene'), {
  ssr: false, // 禁用伺服器端渲染，只在客戶端運行
})

export default function Home() {
  return (
    <div>
      <h1>3D Scene with Three.js in Next.js</h1>
      <ThreeScene />
    </div>
  )
}
