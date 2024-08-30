import React from 'react'
import dynamic from 'next/dynamic'

const NoiseScene = dynamic(() => import('@/components/noise2'), {
  ssr: false, // 禁用伺服器端渲染，只在客戶端運行
})
export default function NoisePage() {
  return <NoiseScene />
}
