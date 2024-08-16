import React from 'react'
import dynamic from 'next/dynamic'

const NoiseScene2 = dynamic(() => import('@/component/noise2'), {
  ssr: false, // 禁用伺服器端渲染，只在客戶端運行
})
const Sampler = dynamic(() => import('@/component/sampler'), {
  ssr: false, // 禁用伺服器端渲染，只在客戶端運行
})
export default function NoisePage() {
  return (
    <>
      <div className="relative">
        <NoiseScene2 />
        <div className="absolute right-0 top-0">
          <Sampler />
        </div>
      </div>
    </>
  )
}
